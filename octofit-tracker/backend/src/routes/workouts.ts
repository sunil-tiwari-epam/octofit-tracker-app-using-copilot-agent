import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/workouts - Get all workouts
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Workouts endpoint', data: [] });
});

// GET /api/workouts/:id - Get workout by ID
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Workout by ID', id: req.params.id });
});

// POST /api/workouts - Create a new workout suggestion
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Workout created', data: req.body });
});

// PUT /api/workouts/:id - Update workout
router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Workout updated', id: req.params.id, data: req.body });
});

export default router;
