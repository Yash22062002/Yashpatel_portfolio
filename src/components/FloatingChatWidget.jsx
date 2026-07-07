import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { CHAT_API_URL } from '../config.js';

const Bubble = styled.button`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 100;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.accentA};
  color: #05100E;
  font-family: ${({ theme }) => theme.font.mono};
  font-weight: 600;
  font-size: 0.75rem;
`;

const Panel = styled.div`
  position: fixed;
  bottom: 5.5rem;
  right: 1.5rem;
  z-index: 100;
  width: min(360px, calc(100vw - 3rem));
  height: 480px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  overflow: hidden;
`;

const Header = styled.div`
  padding: 0.9rem 1rem;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.85rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.accentA};
`;

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const MessageBubble = styled.div`
  max-width: 88%;
  padding: 0.6rem 0.8rem;
  border-radius: 10px;
  font-size: 0.9rem;
  line-height: 1.45;
  align-self: ${({ role }) => (role === 'user' ? 'flex-end' : 'flex-start')};
  background: ${({ role, theme }) =>
    role === 'user' ? theme.colors.accentA : theme.colors.surfaceAlt};
  color: ${({ role }) => (role === 'user' ? '#05100E' : 'inherit')};
`;

const MarkdownBody = styled.div`
  p {
    margin: 0 0 0.5em;
  }
  p:last-child {
    margin-bottom: 0;
  }
  ul,
  ol {
    margin: 0.3em 0;
    padding-left: 1.2em;
  }
  li {
    margin-bottom: 0.2em;
  }
  strong {
    color: inherit;
  }
  code {
    background: rgba(255, 255, 255, 0.08);
    padding: 0.1em 0.35em;
    border-radius: 4px;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 0.85em;
  }
  a {
    color: ${({ theme }) => theme.colors.accentA};
    text-decoration: underline;
  }
`;

const TypingDots = styled.span`
  display: inline-flex;
  gap: 4px;
  padding: 0.2rem 0;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.3;
    animation: blink 1.2s infinite ease-in-out;
  }
  span:nth-child(2) {
    animation-delay: 0.2s;
  }
  span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes blink {
    0%,
    80%,
    100% {
      opacity: 0.25;
    }
    40% {
      opacity: 1;
    }
  }
`;

const InputRow = styled.form`
  display: flex;
  align-items: flex-end;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Input = styled.textarea`
  flex: 1;
  border: none;
  background: transparent;
  color: inherit;
  padding: 0.8rem;
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  resize: none;
  max-height: 100px;
`;

const Send = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.accentA};
  font-family: ${({ theme }) => theme.font.mono};
  padding: 0.8rem 1rem;
  cursor: pointer;
`;

const WELCOME = {
  role: 'assistant',
  content: "Ask me about Yash's projects, skills, or background.",
};

export default function FloatingChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  }, [input]);

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  }

  async function sendMessage(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: 'user', content: text }];
    // A placeholder assistant message that gets filled in as chunks stream in.
    setMessages([...nextMessages, { role: 'assistant', content: '' }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok || !res.body) throw new Error('Request failed');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split('\n\n');
        buffer = parts.pop();

        for (const part of parts) {
          if (!part.startsWith('data: ')) continue;
          let parsed;
          try {
            parsed = JSON.parse(part.slice(6));
          } catch {
            continue;
          }
          if (parsed.error) throw new Error(parsed.error);
          if (parsed.text) {
            assistantText += parsed.text;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: 'assistant', content: assistantText };
              return updated;
            });
          }
        }
      }
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Something went wrong reaching the assistant. Please try again shortly.',
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <Panel>
          <Header>Ask about Yash</Header>
          <Messages ref={scrollRef}>
            {messages.map((m, i) => {
              const isStreamingPlaceholder =
                m.role === 'assistant' && m.content === '' && loading && i === messages.length - 1;
              return (
                <MessageBubble key={i} role={m.role}>
                  {isStreamingPlaceholder ? (
                    <TypingDots>
                      <span />
                      <span />
                      <span />
                    </TypingDots>
                  ) : (
                    <MarkdownBody>
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </MarkdownBody>
                  )}
                </MessageBubble>
              );
            })}
          </Messages>
          <InputRow onSubmit={sendMessage}>
            <Input
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a question"
              rows={1}
            />
            <Send type="submit">Send</Send>
          </InputRow>
        </Panel>
      )}
      <Bubble onClick={() => setOpen((v) => !v)} aria-label="Toggle chat">
        {open ? 'Close' : 'Ask'}
      </Bubble>
    </>
  );
}
