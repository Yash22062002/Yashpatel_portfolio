// Runtime config. Values come from .env (VITE_* is the Vite convention).
// Fill these in .env, then restart `npm run dev` for changes to apply.

export const CHAT_API_URL =
  import.meta.env.VITE_CHAT_API_URL || 'http://localhost:8000/chat';

export const GA_ID = import.meta.env.VITE_GA_ID || '';
