import express from 'express';
import dotenv from 'dotenv';
import { setupRoutes } from './routes';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Configuration des routes
setupRoutes(app);

app.listen(port, () => {
  logger.info(`Serveur MCP Meraki démarré sur le port ${port}`);
});