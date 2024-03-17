import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import PluginCritical from 'rollup-plugin-critical';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    PluginCritical({
      criticalUrl: 'http://localhost:5173', // Adjust this to your local dev URL
      criticalBase: 'dist',
      criticalPages: [
        { uri: '', template: 'index' }
      ],
      criticalConfig: {
        // Configuration options for the critical generator
      },
  }),
],
})
