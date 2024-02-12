import express, { Request, Response } from 'express';
import { getAllConnections } from '../services/connection';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const connections = await getAllConnections();
  res.send(connections);
});

router.get('/:conn_id', async (req: Request, res: Response) => {
  const { conn_id } = req.params;
  res.send(`connection ${conn_id}`);
});

export default router;
