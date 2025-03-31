import express from 'express';
import { listOrganizations } from '../controllers/organizations';

export const organizationsRouter = express.Router();

organizationsRouter.get('/', listOrganizations);