/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { UserState, ActivityLevel, Sex, Goal } from '@/types';

// TODO: add user profile below, update server accordingly - USE THE SAME SETTINGS ACROSS THE BOARD

const initialState: UserState = {
  user: {
    name: null,
    email: null,
  },
  profile: {
    diet: undefined,
    sex: undefined,
    activityLevel: undefined,
    goal: undefined,
    age: undefined,
    height: undefined,
    weight: undefined,
    intolerances: [''],
    favoriteCuisines: [''],
    mealsPerDay: undefined,
    recipesToAvoid: [''],
    meals: [''],
    shoppingList: [''],
    favoriteRecipes: [''],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // TODO: payload needs to change and below setUser needs to set profile as well......
    setUser: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
    },
    logout: (state) => {
      state.user.name = null;
      state.user.email = null;
    },
    setActivityLevel: (state, action: PayloadAction<ActivityLevel>) => {
      state.profile.activityLevel = action.payload;
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
  },
});

export const { setUser, logout, setActivityLevel, setAge, setHeight, setSex, setWeight, setGoal } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const userReducer = userSlice.reducer;
