import express from 'express';
import UserController from '../controller/UserController';

const router = express.Router();

router.get('/:id', UserController.findOne);
router.post('/', UserController.create);

export default router;