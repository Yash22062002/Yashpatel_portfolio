import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
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
  width: min(340px, calc(100vw - 3rem));
  height: 440px;
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
  max-width: 85%;
  padding: 0.6rem 0.8rem;
  border-radius: 10px;
  font-size: 0.9rem;
  line-height: 1.45;
  align-self: ${({ role }) => (role === 'user' ? 'flex-end' : 'flex-start')};
  background: ${({ role, theme }) =>
    role === 'user' ? theme.colors.accentA : theme.colors.surfaceAlt};
  color: ${({ role }) => (role === 'user' ? '#05100E' : 'inherit')};
`;

const InputRow = styled.form`
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  color: inherit;
  padding: 0.8rem;
  font-size: 0.9rem;
  outline: none;
`;

const Send = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.accentA};
  font-family: ${({ theme }) => theme.font.mono};
  padding: 0 1rem;
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
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

      if (!res.ok) throw new Error('Request failed');

      const data = await res.json();
      setMessages([...nextMessages, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content: 'Something went wrong reaching the assistant. Please try again shortly.',
        },
      ]);
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
            {messages.map((m, i) => (
              <MessageBubble key={i} role={m.role}>
                {m.content}
              </MessageBubble>
            ))}
            {loading && <MessageBubble role="assistant">Thinking</MessageBubble>}
          </Messages>
          <InputRow onSubmit={sendMessage}>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question"
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
