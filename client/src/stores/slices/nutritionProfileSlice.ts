/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { NutritionProfile } from '@/types';

const initialState: NutritionProfile = {
  calories: null,
  macros: null,
};

const nutritionProfileSlice = createSlice({
  name: 'nutrition-profile',
  initialState,
  reducers: {
    setNutritionProfile: (state, action: PayloadAction<NutritionProfile>) => {
      state.calories = action.payload.calories;
      state.macros = action.payload.macros;
    },
  },
});

export const { setNutritionProfile } = nutritionProfileSlice.actions;

export const selectNutritionProfile = (state: RootState) => state.nutritionProfile;

export const nutritionProfileReducer = nutritionProfileSlice.reducer;
