// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://vestu.elofirme.com.br',
  output: 'static',
  srcDir: './src',
  outDir: './dist',
  build: {
    format: 'directory'
  },
  vite: {
    ssr: {
      noExternal: ['@supabase/supabase-js']
    }
  }
});
