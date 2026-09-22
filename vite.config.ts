import { fileURLToPath, URL } from 'node:url';
import devtools from 'solid-devtools/vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [devtools(), solidPlugin()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [projectRoot],
      },
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
