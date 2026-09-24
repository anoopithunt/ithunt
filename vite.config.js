import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { spawn } from 'node:child_process';
import net from 'node:net';

let backendProcess;
let backendStartup;

function autoBackendPlugin() {
  return {
    name: 'auto-backend-server',
    configureServer() {
      if (backendStartup) return;
      backendStartup = new Promise(resolve => {
        const socket = net.createConnection({ port: 3000, host: '127.0.0.1' });
        socket.once('connect', () => { socket.destroy(); resolve(); });
        socket.once('error', () => {
          socket.destroy();
          backendProcess = spawn('node', ['server/server.js'], { stdio: 'inherit', shell: true });
          backendProcess.once('exit', () => { backendProcess = undefined; });
          resolve();
        });
      });
    },
    closeBundle() {
      if (backendProcess && !backendProcess.killed) backendProcess.kill();
    }
  };
}

export default defineConfig(({ command }) => ({
  plugins: [vue(), ...(command === 'serve' ? [autoBackendPlugin()] : [])],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: {
    port: 5500,
    host: true,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        secure: false,
        configure: proxy => proxy.on('error', (error, req, res) => {
          if (res && !res.headersSent) {
            res.writeHead(503, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Backend server is unavailable.', error: error.code || 'ECONNREFUSED' }));
          }
        })
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('jspdf') || id.includes('pdfkit') || id.includes('html2canvas')) {
            return 'vendor-pdf';
          }
          if (id.includes('qrcode') || id.includes('dompurify')) {
            return 'vendor-tools';
          }
          if (id.includes('node_modules')) {
            return 'vendor-core';
          }
        }
      }
    }
  }
}));
