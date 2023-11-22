import express from 'express';
import TaskController from '../controller/TaskController';

const router = express.Router();

router.get('/current', TaskController.findCurrent);
router.get('/:id', TaskController.findById);
router.post('/', TaskController.create);
router.put('/:id/done', TaskController.done);
router.put('/:id/undone', TaskController.undone);
router.put('/:id/register', TaskController.updateRecord);

export default router;
