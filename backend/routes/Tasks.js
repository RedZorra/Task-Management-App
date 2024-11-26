import express from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask} from '../controllers/taskController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

//CRUD -Routen
router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.get('/:id', authMiddleware, getTaskById);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

export default router;



