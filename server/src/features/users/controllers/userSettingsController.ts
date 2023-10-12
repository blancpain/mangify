import {
  SexSchema,
  GoalSchema,
  ActivitySchema,
  AgeSchema,
  HeightSchema,
  WeightSchema,
  DietSchema,
  NumberOfMealsSchema,
  CuisinesSchema,
  IntolerancesSchema,
  CaloriesSchema,
  ProteinSchema,
  CarbsSchema,
  FatsSchema,
} from '@shared/types';
import { NextFunction, Request, Response } from 'express';
import { userSettingsService } from '../services/userSettingsService';
import { processUpdate } from '@/utils';

const updateSex = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await processUpdate(req, res, next, SexSchema, userSettingsService.updateSex);
};

const updateGoal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await processUpdate(req, res, next, GoalSchema, userSettingsService.updateGoal);
};

const updateActivity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await processUpdate(req, res, next, ActivitySchema, userSettingsService.updateActivity);
};

const updateAge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await processUpdate(req, res, next, AgeSchema, userSettingsService.updateAge);
};

const updateHeight = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await processUpdate(req, res, next, HeightSchema, userSettingsService.updateHeight);
};

const updateWeight = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await processUpdate(req, res, next, WeightSchema, userSettingsService.updateWeight);
};

const updateCalories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await processUpdate(req, res, next, CaloriesSchema, userSettingsService.updateCalories);
};

const updateProtein = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await processUpdate(req, res, next, ProteinSchema, userSettingsService.updateProtein);
};

const updateCarbs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await processUpdate(req, res, next, CarbsSchema, userSettingsService.updateCarbs);
};

const updateFats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await processUpdate(req, res, next, FatsSchema, userSettingsService.updateFats);
};

const updateDiet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await processUpdate(req, res, next, DietSchema, userSettingsService.updateDiet);
};

const updateNumberOfMeals = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  await processUpdate(req, res, next, NumberOfMealsSchema, userSettingsService.updateNumberOfMeals);
};

const updateCuisines = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await processUpdate(req, res, next, CuisinesSchema, userSettingsService.updateCuisines);
};

const updateIntolerances = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  await processUpdate(req, res, next, IntolerancesSchema, userSettingsService.updateIntolerances);
};

export const userSettingsController = {
  updateSex,
  updateGoal,
  updateActivity,
  updateAge,
  updateWeight,
  updateHeight,
  updateDiet,
  updateNumberOfMeals,
  updateCuisines,
  updateIntolerances,
  updateCalories,
  updateFats,
  updateCarbs,
  updateProtein,
};
