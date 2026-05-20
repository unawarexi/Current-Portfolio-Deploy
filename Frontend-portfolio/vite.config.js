import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': fileURLToPath(new URL('./src/app/components', import.meta.url)),
      '@store':       fileURLToPath(new URL('./src/store', import.meta.url)),
      '@utils':       fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@core':        fileURLToPath(new URL('./src/core', import.meta.url)),
      '@landing':     fileURLToPath(new URL('./src/app/landing', import.meta.url)),
      '@layout':      fileURLToPath(new URL('./src/layout', import.meta.url)),
      '@hooks':       fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@context':     fileURLToPath(new URL('./src/context', import.meta.url)),
      '@assets':      fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@app':         fileURLToPath(new URL('./src/app', import.meta.url)),
    },
    
  },
});

