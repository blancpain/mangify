import { useState } from 'react';
import { Group } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

//! move to overall components?
//! below should take a prop day vs week and show the corresponding calendar view...

export type DateRange = 'day' | 'week';

interface CalendarProps {
  range: DateRange;
}

export function Calendar({ range }: CalendarProps) {
  const [valueRange, setValueRange] = useState<[Date | null, Date | null]>([null, null]);
  const [valueDay, setValueDay] = useState<Date | null>(null);

  return range === 'week' ? (
    <Group position="center">
      <DatePicker type="range" value={valueRange} onChange={setValueRange} />
    </Group>
  ) : (
    <Group position="center">
      <DatePicker value={valueDay} onChange={setValueDay} />
    </Group>
  );
}
