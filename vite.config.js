import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
   allowedHosts: ['localhost','fd08-47-15-81-61.ngrok-free.app' ],
    port: 3000, // Optional: specify dev server port
    open: true, // Optional: automatically open browser
  },
  build: {
    outDir: 'dist', // Optional: specify output directory
  },
});
