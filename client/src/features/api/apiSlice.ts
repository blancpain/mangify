import { createApi } from '@reduxjs/toolkit/query/react';
import {
  ActivityLevel,
  Diet,
  FullUserForClient,
  Goal,
  MealRecipe,
  NonSensitiveUser,
  Sex,
  ShowCaseRecipe,
  TActivitySchema,
  TAgeSchema,
  TCaloriesSchema,
  TCarbsSchema,
  TCuisinesSchema,
  TDietSchema,
  TFatsSchema,
  TGoalSchema,
  THeightSchema,
  TIntolerancesSchema,
  TLoginSchema,
  TMealGeneratorLandingSchema,
  TNumberOfMealsSchema,
  TProteinSchema,
  TSexSchema,
  TSignUpSchema,
  TWeightSchema,
  TSingleMealDate,
} from '@shared/types';
import { baseQueryWithReauth } from '@/lib';

export const mangifyApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    generateShowcaseMeals: build.mutation<ShowCaseRecipe[], TMealGeneratorLandingSchema>({
      query: ({ numberOfMeals, diet }) => ({
        url: `/meal-generator-showcase/?numberOfMeals=${numberOfMeals}&type=${diet}`,
        method: 'GET',
      }),
    }),
    generateSingleDayMealPlan: build.mutation<MealRecipe[], TSingleMealDate>({
      query: (date) => ({
        url: `/meals/single`,
        method: 'POST',
        body: date,
      }),
    }),
    registerUser: build.mutation<NonSensitiveUser, TSignUpSchema>({
      query: ({ ...user }) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),
    login: build.mutation<FullUserForClient, TLoginSchema>({
      query: ({ ...user }) => ({
        url: '/session/login',
        method: 'POST',
        body: user,
      }),
    }),
    authCheck: build.mutation<FullUserForClient, void>({
      query: () => ({
        url: `/session/auth-check`,
        method: 'GET',
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => '/session/logout',
    }),
    setSex: build.mutation<Sex, TSexSchema>({
      query: (userSex) => ({
        url: '/user/sex',
        method: 'POST',
        body: userSex,
      }),
    }),
    setAge: build.mutation<number, TAgeSchema>({
      query: (userAge) => ({
        url: '/user/age',
        method: 'POST',
        body: userAge,
      }),
    }),
    setWeight: build.mutation<number, TWeightSchema>({
      query: (userWeight) => ({
        url: '/user/weight',
        method: 'POST',
        body: userWeight,
      }),
    }),
    setHeight: build.mutation<number, THeightSchema>({
      query: (userHeight) => ({
        url: '/user/height',
        method: 'POST',
        body: userHeight,
      }),
    }),
    setGoal: build.mutation<Goal, TGoalSchema>({
      query: (userGoal) => ({
        url: '/user/goal',
        method: 'POST',
        body: userGoal,
      }),
    }),
    setActivityLevel: build.mutation<ActivityLevel, TActivitySchema>({
      query: (userActivityLevel) => ({
        url: '/user/activity-level',
        method: 'POST',
        body: userActivityLevel,
      }),
    }),
    setIntolerances: build.mutation<string[], TIntolerancesSchema>({
      query: (userIntolerances) => ({
        url: '/user/intolerances',
        method: 'POST',
        body: userIntolerances,
      }),
    }),
    setCuisines: build.mutation<string[], TCuisinesSchema>({
      query: (userCuisines) => ({
        url: '/user/cuisines',
        method: 'POST',
        body: userCuisines,
      }),
    }),
    setDiet: build.mutation<Diet, TDietSchema>({
      query: (userDiet) => ({
        url: '/user/diet',
        method: 'POST',
        body: userDiet,
      }),
    }),
    setNumberOfMeals: build.mutation<number, TNumberOfMealsSchema>({
      query: (userNumberOfMeals) => ({
        url: '/user/number-of-meals',
        method: 'POST',
        body: userNumberOfMeals,
      }),
    }),
    setCalories: build.mutation<number, TCaloriesSchema>({
      query: (userCalories) => ({
        url: '/user/calories',
        method: 'POST',
        body: userCalories,
      }),
    }),
    setProtein: build.mutation<number, TProteinSchema>({
      query: (userProtein) => ({
        url: '/user/protein',
        method: 'POST',
        body: userProtein,
      }),
    }),
    setCarbs: build.mutation<number, TCarbsSchema>({
      query: (userCarbs) => ({
        url: '/user/carbs',
        method: 'POST',
        body: userCarbs,
      }),
    }),
    setFats: build.mutation<number, TFatsSchema>({
      query: (userFats) => ({
        url: '/user/fats',
        method: 'POST',
        body: userFats,
      }),
    }),
    // TODO: add setMeals, favorite and unliked recipes
  }),
});

export const {
  useGenerateShowcaseMealsMutation,
  useRegisterUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useAuthCheckMutation,
  useSetAgeMutation,
  useSetSexMutation,
  useSetDietMutation,
  useSetGoalMutation,
  useSetHeightMutation,
  useSetWeightMutation,
  useSetCuisinesMutation,
  useSetIntolerancesMutation,
  useSetActivityLevelMutation,
  useSetNumberOfMealsMutation,
  useSetFatsMutation,
  useSetCarbsMutation,
  useSetProteinMutation,
  useSetCaloriesMutation,
  useGenerateSingleDayMealPlanMutation,
} = mangifyApi;
