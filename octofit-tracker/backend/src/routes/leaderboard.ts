import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/leaderboard - Get leaderboard rankings
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Leaderboard endpoint', data: [] });
});

// GET /api/leaderboard/:teamId - Get team leaderboard
router.get('/:teamId', (req: Request, res: Response) => {
  res.json({ message: 'Team leaderboard', teamId: req.params.teamId });
});

export default router;
