import express, { RequestHandler } from 'express';
import { sessionController } from '../controllers/sessionController';

const sessionRouter = express.Router();

sessionRouter.post('/', sessionController.login as RequestHandler);

export { sessionRouter };
