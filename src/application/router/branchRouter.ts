
import express from 'express';
import BranchController from '../controller/BranchController';

const router = express.Router();

router.get('/', BranchController.findAll);
router.get('/:id', BranchController.findById);
router.post('/', BranchController.create);
router.delete('/:id', BranchController.remove);

export default router;
