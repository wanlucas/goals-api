
import express from 'express';
import GoalController from '../controller/GoalController';

const router = express.Router();

router.get('/', GoalController.findAll);
// router.get('/:id', GoalController.findById);
router.get('branch/:branchId', GoalController.findByBranchId);
router.post('/bulk', GoalController.bulkCreate);
router.post('/', GoalController.create);

export default router;
