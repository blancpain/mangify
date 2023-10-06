import express, { RequestHandler } from 'express';
import { mealsController } from '../controllers/mealsController';
// import { isAuthenticated } from '@/middleware';

const mealsRouter = express.Router();
//! enable auth again after testing
mealsRouter.get('/', mealsController.getMeals as RequestHandler);
mealsRouter.get('/single', mealsController.getMeal as RequestHandler);

export { mealsRouter };
