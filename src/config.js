// Runtime config. Values come from .env (VITE_* is the Vite convention).
// Fill these in .env, then restart `npm run dev` for changes to apply.

export const CHAT_API_URL =
  import.meta.env.VITE_CHAT_API_URL || 'http://localhost:8000/chat';

export const GA_ID = import.meta.env.VITE_GA_ID || '';

// Single source of truth for outbound links, so Navbar, Footer, Hero and
// Contact never drift out of sync with each other.
export const LINKEDIN_URL = 'https://www.linkedin.com/in/yash-patel-network';
export const GITHUB_URL = 'https://github.com/Yash22062002';
export const EMAIL = 'patel.yashm@northeastern.edu';

// BASE_URL aware asset path, matches the project convention of never using
// a leading slash directly (see vite.config.js base setting).
export const RESUME_URL = `${import.meta.env.BASE_URL}resume/Yash_Patel_Resume.pdf`;
