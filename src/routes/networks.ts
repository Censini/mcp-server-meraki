import express from 'express';
import { listNetworks } from '../controllers/networks';

export const networksRouter = express.Router();

networksRouter.get('/:organizationId', listNetworks);