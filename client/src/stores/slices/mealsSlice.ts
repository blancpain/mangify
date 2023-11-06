/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MealRecipe } from 'mangify-shared-types';
import type { RootState } from '../store';
import { MealsState } from '@/types';

const initialState: MealsState = {
  meals: null,
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    setMeals: (state, action: PayloadAction<MealRecipe[]>) => {
      state.meals = action.payload;
    },
  },
});

export const { setMeals } = mealsSlice.actions;

export const selectMeals = (state: RootState) => state.meals;

export const mealsReducer = mealsSlice.reducer;
