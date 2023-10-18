/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { CalendarState } from '@/types';
import { getEndOfPeriod, getStartOfPeriod } from '@/utils';

// NOTE: we store the dates as strings to avoid redux non-serializable error as Dates are inherently mutable
// and this goes against redux philosophy

const initialState: CalendarState = {
  day: true,
  weekRange: [new Date().toISOString(), getEndOfPeriod(new Date())],
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
    decrementDay: (state) => {
      const currentDay = new Date(state.dayRange);
      const prevDay = currentDay.setDate(currentDay.getDate() - 1);
      state.dayRange = new Date(prevDay).toISOString();
    },
    incrementWeek: (state) => {
      const currentWeekStart = new Date(state.weekRange[0]);
      const nextWeek = getEndOfPeriod(currentWeekStart);
      state.weekRange[0] = nextWeek;
      const endOfNextWeek = getEndOfPeriod(new Date(nextWeek));
      state.weekRange[1] = endOfNextWeek;
    },
    decrementWeek: (state) => {
      const currentWeekStart = new Date(state.weekRange[0]);
      const prevWeek = getStartOfPeriod(currentWeekStart);
      state.weekRange[0] = prevWeek;
      const endOfPrevWeek = getEndOfPeriod(new Date(prevWeek));
      state.weekRange[1] = endOfPrevWeek;
    },
  },
});

export const {
  setCalendar,
  setDayRange,
  setWeekStart,
  setWeekEnd,
  incrementDay,
  decrementDay,
  incrementWeek,
  decrementWeek,
} = calendarSlice.actions;

export const selectCalendar = (state: RootState) => state.calendar;

export const calendarReducer = calendarSlice.reducer;
