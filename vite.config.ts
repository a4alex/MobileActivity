import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/MobileActivity/', // GitHub Pages repository name
  plugins: [react()],
  optimizeDeps: {
    // No exclusions - allow Vite to optimize all dependencies
  },
});
