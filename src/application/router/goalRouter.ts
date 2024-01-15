
import express from 'express';
import GoalController from '../controller/GoalController';

const router = express.Router();

router.get('/', GoalController.findAll);
router.get('/branch/:branchId', GoalController.findByBranchId);
router.post('/bulk', GoalController.bulkCreate);
router.post('/', GoalController.create);
router.delete('/bulk', GoalController.bulkDelete);

export default router;
