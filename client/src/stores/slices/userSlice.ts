/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { UserState, ActivityLevel, Sex, Goal } from '@/types';

const initialState: UserState = {
  name: null,
  email: null,
  settings: {
    activity: ActivityLevel.Moderate,
    sex: undefined,
    age: undefined,
    height: undefined,
    weight: undefined,
    goal: Goal.maintain,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.name = null;
      state.email = null;
    },
    setActivityLevel: (state, action: PayloadAction<ActivityLevel>) => {
      state.settings.activity = action.payload;
    },
    setSex: (state, action: PayloadAction<Sex>) => {
      state.settings.sex = action.payload;
    },
    setAge: (state, action: PayloadAction<number>) => {
      state.settings.age = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.settings.height = action.payload;
    },
    setWeight: (state, action: PayloadAction<number>) => {
      state.settings.weight = action.payload;
    },
    setGoal: (state, action: PayloadAction<Goal>) => {
      state.settings.goal = action.payload;
    },
  },
});

export const { setUser, logout, setActivityLevel, setAge, setHeight, setSex, setWeight, setGoal } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const userReducer = userSlice.reducer;
