/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { CalendarState } from '@/types';

//* we store the dates as strings to avoid redux non-serializable error as Dates are inherently mutable
//* and this goes against redux toolkit philosophy

const initialState: CalendarState = {
  day: true,
  weekRange: [startOfWeek(Date.now()).toISOString(), endOfWeek(Date.now()).toISOString()],
  dayRange: new Date().toISOString(),
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCalendar: (state) => {
      state.day = !state.day;
    },
    setDayRange: (state, action: PayloadAction<string>) => {
      state.dayRange = action.payload;
    },
    setWeekStart: (state, action: PayloadAction<string>) => {
      state.weekRange[0] = action.payload;
    },
    setWeekEnd: (state, action: PayloadAction<string>) => {
      state.weekRange[1] = action.payload;
    },
    incrementDay: (state) => {
      const currentDay = new Date(state.dayRange);
      const nextDay = currentDay.setDate(currentDay.getDate() + 1);
      state.dayRange = new Date(nextDay).toISOString();
    },
  },
});

export const { setCalendar, setDayRange, setWeekStart, setWeekEnd, incrementDay } =
  calendarSlice.actions;

export const selectCalendar = (state: RootState) => state.calendar;

export const calendarReducer = calendarSlice.reducer;
