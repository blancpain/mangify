/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FullUserForClient, Sex, Goal, ActivityLevel, Diet } from '@shared/types';
import type { RootState } from '../store';

const initialState: FullUserForClient = {
  user: {
    name: null,
    email: null,
  },
  profile: {
    diet: null,
    sex: null,
    activity_level: null,
    goal: null,
    age: null,
    height: null,
    weight: null,
    intolerances: [],
    favorite_cuisines: [],
    meals_per_day: 3,
    // WARN: favorite recipes not in use yet
    favorite_recipes: [],
    calories: null,
    protein: null,
    carbs: null,
    fats: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<FullUserForClient>) => {
      state.user = action.payload.user;
      state.profile = action.payload.profile;
    },
    logout: (state) => {
      state.user.name = null;
      state.user.email = null;
      state.profile = initialState.profile;
      // state.meals = initialState.meals;
    },
    setActivityLevel: (state, action: PayloadAction<ActivityLevel>) => {
      state.profile.activity_level = action.payload;
    },
    setSex: (state, action: PayloadAction<Sex>) => {
      state.profile.sex = action.payload;
    },
    setAge: (state, action: PayloadAction<number>) => {
      state.profile.age = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.profile.height = action.payload;
    },
    setWeight: (state, action: PayloadAction<number>) => {
      state.profile.weight = action.payload;
    },
    setGoal: (state, action: PayloadAction<Goal>) => {
      state.profile.goal = action.payload;
    },
    setDiet: (state, action: PayloadAction<Diet>) => {
      state.profile.diet = action.payload;
    },
    setCuisines: (state, action: PayloadAction<string[]>) => {
      state.profile.favorite_cuisines = action.payload;
    },
    setIntolerances: (state, action: PayloadAction<string[]>) => {
      state.profile.intolerances = action.payload;
    },
    setNumberOfMeals: (state, action: PayloadAction<number>) => {
      state.profile.meals_per_day = action.payload;
    },
    setCalories: (state, action: PayloadAction<number>) => {
      state.profile.calories = action.payload;
    },
    setProtein: (state, action: PayloadAction<number>) => {
      state.profile.protein = action.payload;
    },
    setCarbs: (state, action: PayloadAction<number>) => {
      state.profile.carbs = action.payload;
    },
    setFats: (state, action: PayloadAction<number>) => {
      state.profile.fats = action.payload;
    },
  },
});

export const {
  setUser,
  setDiet,
  logout,
  setActivityLevel,
  setAge,
  setHeight,
  setSex,
  setWeight,
  setGoal,
  setIntolerances,
  setCuisines,
  setNumberOfMeals,
  setCalories,
  setProtein,
  setCarbs,
  setFats,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const userReducer = userSlice.reducer;
