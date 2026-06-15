import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/teams - Get all teams
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Teams endpoint', data: [] });
});

// GET /api/teams/:id - Get team by ID
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Team by ID', id: req.params.id });
});

// POST /api/teams - Create a new team
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Team created', data: req.body });
});

// PUT /api/teams/:id - Update team
router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Team updated', id: req.params.id, data: req.body });
});

export default router;
