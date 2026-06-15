import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/activities - Get all activities
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Activities endpoint', data: [] });
});

// GET /api/activities/:id - Get activity by ID
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Activity by ID', id: req.params.id });
});

// POST /api/activities - Log a new activity
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Activity logged', data: req.body });
});

// PUT /api/activities/:id - Update activity
router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Activity updated', id: req.params.id, data: req.body });
});

export default router;
