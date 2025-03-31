import { Request, Response } from 'express';
import { logger } from '../utils/logger';

export const listNetworks = async (req: Request, res: Response) => {
  try {
    const { organizationId } = req.params;
    // TODO: Implémenter l'appel à l'API Meraki
    const networks = [];
    res.json(networks);
  } catch (error) {
    logger.error('Erreur lors de la récupération des réseaux:', error);
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};