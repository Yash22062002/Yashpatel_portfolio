import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { CHAT_API_URL } from '../config.js';

const Bubble = styled.button`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 100;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.accentA};
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surfaceAlt};
`;

const BubbleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Greeting = styled.div`
  position: fixed;
  bottom: 6.75rem;
  right: 1.5rem;
  z-index: 100;
  max-width: 230px;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid #ffffff;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition: opacity 0.5s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    right: 30px;
    width: 16px;
    height: 16px;
    background: ${({ theme }) => theme.colors.surface};
    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    transform: rotate(45deg);
  }
`;

const Panel = styled.div`
  position: fixed;
  bottom: 6rem;
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
  content: 'Hi! I am Jarvis, Yash\u2019s GenAI chatbot. How may I help you today?',
};

const GREETING_TEXT = 'Hi! I am Jarvis (Yash\u2019s GenAI Chatbot), how may I help you today?';
const GREETING_SHOW_DELAY_MS = 800;
const GREETING_VISIBLE_MS = 4000;

export default function FloatingChatWidget() {
  const [open, setOpen] = useState(false);
  const [autoGreeting, setAutoGreeting] = useState(false);
  const [hoverGreeting, setHoverGreeting] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);
  const hoverHideTimeout = useRef(null);

  // Visible if either the automatic on-load timer or a hover is keeping it
  // up, but never while the chat panel itself is open.
  const greetingVisible = (autoGreeting || hoverGreeting) && !open;

  // Auto pop the greeting bubble shortly after the page loads, then hide
  // it again on its own, the same pattern a lot of live chat widgets use.
  useEffect(() => {
    const showTimer = setTimeout(() => setAutoGreeting(true), GREETING_SHOW_DELAY_MS);
    const hideTimer = setTimeout(
      () => setAutoGreeting(false),
      GREETING_SHOW_DELAY_MS + GREETING_VISIBLE_MS,
    );
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

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

  useEffect(() => {
    return () => {
      if (hoverHideTimeout.current) clearTimeout(hoverHideTimeout.current);
    };
  }, []);

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  }

  function openChat() {
    setOpen(true);
    setAutoGreeting(false);
    setHoverGreeting(false);
    if (hoverHideTimeout.current) {
      clearTimeout(hoverHideTimeout.current);
      hoverHideTimeout.current = null;
    }
  }

  // Hovering the button (or the bubble itself, so moving toward it to read
  // or click doesn't make it vanish) keeps the greeting up. Leaving starts
  // a short delay before it fades, rather than disappearing instantly.
  function handleGreetingAreaEnter() {
    if (open) return;
    if (hoverHideTimeout.current) {
      clearTimeout(hoverHideTimeout.current);
      hoverHideTimeout.current = null;
    }
    setHoverGreeting(true);
  }

  function handleGreetingAreaLeave() {
    hoverHideTimeout.current = setTimeout(() => {
      setHoverGreeting(false);
    }, 1000);
  }

  async function sendMessage(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: 'user', content: text }];
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
      <Greeting
        $visible={greetingVisible}
        onClick={openChat}
        onMouseEnter={handleGreetingAreaEnter}
        onMouseLeave={handleGreetingAreaLeave}
      >
        {GREETING_TEXT}
      </Greeting>

      {open && (
        <Panel>
          <Header>Jarvis</Header>
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
              placeholder="Write a message..."
              rows={1}
            />
            <Send type="submit">Send</Send>
          </InputRow>
        </Panel>
      )}

      <Bubble
        onClick={() => (open ? setOpen(false) : openChat())}
        onMouseEnter={handleGreetingAreaEnter}
        onMouseLeave={handleGreetingAreaLeave}
        aria-label="Toggle chat with Jarvis"
      >
        <BubbleImage
          src={`${import.meta.env.BASE_URL}jarvis-icon.png`}
          alt="Jarvis"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </Bubble>
    </>
  );
}
