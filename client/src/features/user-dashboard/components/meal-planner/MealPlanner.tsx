import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, SegmentedControl, ActionIcon, Button, Flex, rem } from '@mantine/core';
import { IconCalendar, IconArrowBadgeLeft, IconArrowBadgeRight } from '@tabler/icons-react';
import { Calendar } from './Calendar';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  setCalendar,
  selectCalendar,
  incrementDay,
  decrementDay,
  incrementWeek,
  decrementWeek,
} from '@/stores';

export function MealPlanner() {
  const [opened, { open, close }] = useDisclosure(false);
  const { day, dayRange, weekRange } = useAppSelector(selectCalendar);
  const dispatch = useAppDispatch();

  const convertedDay = new Date(dayRange).toDateString();
  const convertedStartOfWeek = new Date(weekRange[0]).toDateString();
  const convertedEndOfWeek = new Date(weekRange[1]).toDateString();

  return (
    <>
      <Flex gap={30} justify="space-between">
        <SegmentedControl
          onChange={() => dispatch(setCalendar())}
          data={[
            { label: 'Day', value: 'Day' },
            { label: 'Week', value: 'Week' },
          ]}
          color="teal"
          sx={{ border: '1px solid gray' }}
        />
        <Group position="center">
          <ActionIcon
            size="lg"
            onClick={() => (day ? dispatch(decrementDay()) : dispatch(decrementWeek()))}
          >
            <IconArrowBadgeLeft />
          </ActionIcon>
          <ActionIcon onClick={open} size="lg" variant="filled" color="teal" radius="md">
            <IconCalendar />
          </ActionIcon>
          <ActionIcon
            size="lg"
            onClick={() => (day ? dispatch(incrementDay()) : dispatch(incrementWeek()))}
          >
            <IconArrowBadgeRight />
          </ActionIcon>
        </Group>
        <Modal opened={opened} onClose={close} centered size="xs" withCloseButton={false}>
          <Calendar day={day} />
          <Flex justify="space-around" mt={10}>
            <Button onClick={close} variant="outline" color="teal" size="sm" w={rem(120)}>
              Cancel
            </Button>
            <Button onClick={close} variant="filled" color="teal" size="sm" w={rem(120)}>
              OK
            </Button>
          </Flex>
        </Modal>
      </Flex>
      <p>App</p>

      <p>Day: {convertedDay}</p>
      <p>Week start: {convertedStartOfWeek}</p>
      <p>Week end: {convertedEndOfWeek}</p>
    </>
  );
}
