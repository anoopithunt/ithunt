import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

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
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 5500,
      host: true,
      strictPort: false
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false
    }
  };
});
