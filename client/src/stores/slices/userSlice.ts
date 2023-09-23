import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { UserState } from '@/types';

const initialState: UserState = {
  name: null,
  email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string; email: string }>) => {
      // eslint-disable-next-line no-param-reassign
      state.name = action.payload.name;
      // eslint-disable-next-line no-param-reassign
      state.email = action.payload.email;
    },
    logout: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.name = null;
      // eslint-disable-next-line no-param-reassign
      state.email = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const userReducer = userSlice.reducer;
