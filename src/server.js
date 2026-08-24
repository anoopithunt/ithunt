import app from './app.js';
import config from './config/env.js';

const server = app.listen(config.port, config.host, () => {
  console.log(`
================================================================
  🚀 IT HUNT REST API Server running successfully!
  📍 Endpoint: http://${config.host === '0.0.0.0' ? 'localhost' : config.host}:${config.port}
  📖 Swagger Docs: http://localhost:${config.port}/api-docs
  🏥 Health Check: http://localhost:${config.port}/api/health
  ⚙️ Environment: ${config.nodeEnv}
================================================================
  `);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});

export default server;
