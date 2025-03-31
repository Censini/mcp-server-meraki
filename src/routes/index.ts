import { Express } from 'express';
import { organizationsRouter } from './organizations';
import { networksRouter } from './networks';
import { devicesRouter } from './devices';

export const setupRoutes = (app: Express) => {
  app.use('/api/organizations', organizationsRouter);
  app.use('/api/networks', networksRouter);
  app.use('/api/devices', devicesRouter);
};