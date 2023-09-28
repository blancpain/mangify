export type UserState = {
  name: string | null;
  email: string | null;
};

export type CalendarState = {
  day: boolean;
  weekRange: [string, string];
  dayRange: string;
};
