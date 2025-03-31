import express from 'express';
import { listDevices } from '../controllers/devices';

export const devicesRouter = express.Router();

devicesRouter.get('/:networkId', listDevices);