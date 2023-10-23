import { DateTime } from 'luxon';
import { Group } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { setSingleDayDate, setWeekStart, setWeekEnd, selectCalendar } from '@/stores';

type CalendarProps = {
  day: boolean;
};

export function Calendar({ day }: CalendarProps) {
  const dispatch = useAppDispatch();
  const { singleDayDate, weekRange } = useAppSelector(selectCalendar);

  const convertedWeekStart = new Date(weekRange[0]);
  const convertedWeekEnd = new Date(weekRange[1]);

  const handleWeekChange = (val: [Date, Date]) => {
    dispatch(setWeekStart(val[0].toISOString()));
    if (val[1]) {
      dispatch(setWeekEnd(val[1].toISOString()));
    }
  };

  return day ? (
    <Group position="center">
      <DatePicker
        value={
          singleDayDate ? DateTime.fromISO(singleDayDate).toJSDate() : DateTime.now().toJSDate()
        }
        onChange={(val: Date) => dispatch(setSingleDayDate(DateTime.fromJSDate(val).toISO()))}
      />
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
