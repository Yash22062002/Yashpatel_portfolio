import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// If your GitHub Pages URL is https://<username>.github.io/<repo-name>/,
// set base to '/<repo-name>/'. If you attach a custom domain later
// (a CNAME file in public/, same pattern Arun used), change base back to '/'.
export default defineConfig({
  plugins: [react()],
  base: '/Dashboard_frontend/',
});
