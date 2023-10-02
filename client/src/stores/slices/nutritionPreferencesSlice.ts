/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { NutritionPreferences, NutritionProfile } from '@/types';

const initialState: NutritionPreferences = {
  diet: '',
  cuisines: [''],
  intolerances: [''],
  nutritionProfile: null,
};

const nutritionPreferencesSlice = createSlice({
  name: 'nutrition-preferences',
  initialState,
  reducers: {
    setDiet: (state, action: PayloadAction<string>) => {
      state.diet = action.payload;
    },
    setCuisines: (state, action: PayloadAction<string[]>) => {
      state.cuisines = action.payload;
    },
    setIntolerances: (state, action: PayloadAction<string[]>) => {
      state.intolerances = action.payload;
    },
    setNutritionProfile: (state, action: PayloadAction<NutritionProfile>) => {
      state.nutritionProfile = action.payload;
    },
  },
});

export const { setDiet, setCuisines, setIntolerances, setNutritionProfile } =
  nutritionPreferencesSlice.actions;

export const selectNutritionPreferences = (state: RootState) => state.nutritionPreferences;

export const nutritionPreferencesReducer = nutritionPreferencesSlice.reducer;
