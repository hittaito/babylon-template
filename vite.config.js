import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  build: {
    outDir: '../dist',
  },
  optimizeDeps: {
    exclude: ['@babylonjs/havok'],
  },
});
