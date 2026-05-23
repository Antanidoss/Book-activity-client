import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined;
          }

          if (id.includes('@apollo/client') || id.includes('graphql')) {
            return 'apollo';
          }

          if (id.includes('antd') || id.includes('@ant-design') || id.includes('rc-')) {
            return 'antd';
          }

          if (id.includes('react-router') || id.includes('react-dom') || id.includes('react-redux')) {
            return 'react-vendor';
          }

          if (id.includes('@microsoft/signalr')) {
            return 'signalr';
          }

          return 'vendor';
        },
      },
    },
  },
});
