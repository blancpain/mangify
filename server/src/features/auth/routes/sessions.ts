import express, { RequestHandler } from 'express';
import { sessionController } from '../controllers/sessionController';
import { isAuthenticated } from '@/middleware';

const sessionRouter = express.Router();

sessionRouter.post('/login', sessionController.login as RequestHandler);
sessionRouter.get('/logout', isAuthenticated, sessionController.logout);
sessionRouter.get('/auth-check', sessionController.authCheck);
sessionRouter.get('/refresh-session', sessionController.refreshSession);

export { sessionRouter };
