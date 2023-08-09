
import express from 'express';
import TaskController from '../controller/TaskController';

const router = express.Router();

router.get('/:id', TaskController.findById);
router.post('/', TaskController.create);

export default router;
