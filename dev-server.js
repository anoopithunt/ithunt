import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const server = await createServer({
    configFile: path.resolve(__dirname, 'vite.config.js'),
    root: __dirname,
    server: {
      port: 5500,
      host: true
    }
  });

  await server.listen();

  server.printUrls();
  console.log('⚡ IT HUNT Vue 3 + Vite server is active and ready!');
}

startServer().catch((err) => {
  console.error('Failed to start Vite server:', err);
  process.exit(1);
});
