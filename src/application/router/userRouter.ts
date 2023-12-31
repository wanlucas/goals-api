import express from 'express';
import UserController from '../controller/UserController';

const router = express.Router();

router.get('/:id', UserController.findById);

export default router;