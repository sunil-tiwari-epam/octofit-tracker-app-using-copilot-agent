import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/users - Get all users
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Users endpoint', data: [] });
});

// GET /api/users/:id - Get user by ID
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: 'User by ID', id: req.params.id });
});

// POST /api/users - Create a new user
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'User created', data: req.body });
});

// PUT /api/users/:id - Update user
router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: 'User updated', id: req.params.id, data: req.body });
});

export default router;
