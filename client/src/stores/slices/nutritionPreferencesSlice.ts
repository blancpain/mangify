/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { NutritionProfile } from '@/types';

const initialState: NutritionProfile = {
  calories: null,
  macros: null,
};

const nutritionPreferencesSlice = createSlice({
  name: 'nutrition-preferences',
  initialState,
  reducers: {
    setNutritionProfile: (state, action: PayloadAction<NutritionProfile>) => {
      state = action.payload;
    },
  },
});

export const { setNutritionProfile } = nutritionPreferencesSlice.actions;

export const selectNutritionPreferences = (state: RootState) => state.nutritionPreferences;

export const nutritionPreferencesReducer = nutritionPreferencesSlice.reducer;
