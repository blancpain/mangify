/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { MealSettings } from '@/types';

const initialState: MealSettings = {
  numberOfMeals: 3,
};

const mealSettingsSlice = createSlice({
  name: 'meal-settings',
  initialState,
  reducers: {
    setNumberOfMeals: (state, action: PayloadAction<string>) => {
      state.numberOfMeals = Number(action.payload);
    },
  },
});

export const { setNumberOfMeals } = mealSettingsSlice.actions;

export const selectMealSettings = (state: RootState) => state.mealSettings;

export const mealSettingsReducer = mealSettingsSlice.reducer;
