/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: './',
  build: {
    outDir: 'build',
  },
  server: {
    watch: {
      usePolling: true,
    },
    hmr: true,
    host: true,
    strictPort: true,
    port: 5173,
  },
});
