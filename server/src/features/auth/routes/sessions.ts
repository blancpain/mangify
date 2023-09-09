import express, { RequestHandler } from 'express';
import { sessionController } from '../controllers/sessionController';
import { isAuthenticated } from '@/middleware';

const sessionRouter = express.Router();

sessionRouter.post('/login', sessionController.login as RequestHandler);
sessionRouter.get('/logout', isAuthenticated, sessionController.logout);

export { sessionRouter };
