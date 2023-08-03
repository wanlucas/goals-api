import express from 'express';
import UserController from '../controller/UserController';

const router = express.Router();

router.post('/sign-up', UserController.create);
router.post('/sign-in', UserController.login);

export default router;