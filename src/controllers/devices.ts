import { Request, Response } from 'express';
import { logger } from '../utils/logger';

export const listDevices = async (req: Request, res: Response) => {
  try {
    const { networkId } = req.params;
    // TODO: Implémenter l'appel à l'API Meraki
    const devices = [];
    res.json(devices);
  } catch (error) {
    logger.error('Erreur lors de la récupération des équipements:', error);
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
};