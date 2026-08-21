import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// If you deploy to GitHub Pages at https://<user>.github.io/<repo>/
// uncomment the base line below and set it to "/<repo-name>/".
export default defineConfig({
  plugins: [react()],
  base: '/butter-and-bloom/',
});
