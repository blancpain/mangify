import express, { RequestHandler } from 'express';
import { mealGeneratorController } from '../controllers/mealGeneratorController';

const mealGeneratorShowcaseRouter = express.Router();

mealGeneratorShowcaseRouter.get('/', mealGeneratorController.getRecipes as RequestHandler);

export { mealGeneratorShowcaseRouter };
