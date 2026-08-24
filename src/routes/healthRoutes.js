import { Router } from 'express';
import config from '../config/env.js';

const router = Router();

router.get('/health', (req, res) => {
  return res.status(200).json({
    status: 'OK',
    app: config.orgName,
    tagline: 'Software Solutions & Tech Academy',
    director: config.orgLead,
    environment: config.nodeEnv,
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

export default router;
