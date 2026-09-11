import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { spawn } from 'node:child_process';
import net from 'node:net';

/**
 * Automatically launch Node.js backend server if not already running on port 3000
 */
function autoBackendPlugin() {
  return {
    name: 'auto-backend-server',
    configureServer() {
      const socket = net.createConnection({ port: 3000, host: '127.0.0.1' });
      socket.on('connect', () => {
        socket.destroy();
      });
      socket.on('error', () => {
        console.log('\n⚡ [Vite] Backend on port 3000 not detected. Starting Node.js API server automatically...');
        const child = spawn('node', ['server/server.js'], {
          stdio: 'inherit',
          shell: true
        });
        child.unref();
      });
    }
  };
}

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';

  return {
    plugins: [
      vue({
        template: {
          compilerOptions: {
            nodeTransforms: isDev ? [
              (node, context) => {
                if (node.type === 1 && node.loc && node.loc.start) {
                  const file = context.filename || '';
                  const line = node.loc.start.line;
                  let relPath = file;
                  if (file.includes('/src/')) {
                    relPath = 'src/' + file.split('/src/')[1];
                  } else if (file.includes('\\src\\')) {
                    relPath = 'src/' + file.split('\\src\\')[1].replace(/\\/g, '/');
                  }
                  
                  if (relPath && node.tag && !node.tag.includes('-')) {
                    node.props.push(
                      {
                        type: 6,
                        name: 'data-v-file',
                        value: { type: 2, content: relPath }
                      },
                      {
                        type: 6,
                        name: 'data-v-line',
                        value: { type: 2, content: String(line) }
                      }
                    );
                  }
                }
              }
            ] : []
          }
        }
      }),
      autoBackendPlugin()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 5500,
      host: true,
      strictPort: false,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3000',
          changeOrigin: true,
          secure: false,
          configure: (proxy) => {
            proxy.on('error', (err, req, res) => {
              if (res && !res.headersSent && typeof res.writeHead === 'function') {
                res.writeHead(503, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                  success: false,
                  message: 'Backend server is initializing or unreachable.',
                  error: err.code || err.message
                }));
              }
            });
          }
        }
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false
    }
  };
});
