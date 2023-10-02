import { Group } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { setDayRange, setWeekStart, setWeekEnd, selectCalendar } from '@/stores';

type CalendarProps = {
  day: boolean;
};

export function Calendar({ day }: CalendarProps) {
  const dispatch = useAppDispatch();
  const { dayRange, weekRange } = useAppSelector(selectCalendar);

  const convertedDayRange = new Date(dayRange);
  const convertedWeekStart = new Date(weekRange[0]);
  const convertedWeekEnd = new Date(weekRange[1]);

  const handleWeekChange = (val: [Date, Date]) => {
    dispatch(setWeekStart(val[0].toISOString()));
    if (val[1]) {
      dispatch(setWeekEnd(val[1].toISOString()));
    }
  };
  const handleDayChange = (val: Date) => {
    dispatch(setDayRange(val.toISOString()));
  };

  return day ? (
    <Group position="center">
      <DatePicker value={convertedDayRange} onChange={(val: Date) => handleDayChange(val)} />
    </Group>
  ) : (
    <Group position="center">
      <DatePicker
        type="range"
        defaultValue={[convertedWeekStart, convertedWeekEnd]}
        onChange={(val) => handleWeekChange(val as [Date, Date])}
      />
    </Group>
  );
}
