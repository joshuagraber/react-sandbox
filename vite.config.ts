import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    // React, of course
    react(), 
    // Tells vite to use path aliasing defined in tsconfig.json
    tsConfigPaths()
  ],
  build: {
    outDir: 'dist'
  },
  server: {
    port: 3000
  }
});
