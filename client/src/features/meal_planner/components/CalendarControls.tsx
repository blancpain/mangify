import { SegmentedControl, ActionIcon, Button, Flex, rem, Group, Modal } from '@mantine/core';
import { IconArrowBadgeLeft, IconArrowBadgeRight, IconCalendar } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  setCalendar,
  selectCalendar,
  incrementDay,
  decrementDay,
  incrementWeek,
  decrementWeek,
} from '@/stores';
import { Calendar } from './Calendar';

export function CalendarControls() {
  const [opened, { open, close }] = useDisclosure(false);
  const { day } = useAppSelector(selectCalendar);
  const dispatch = useAppDispatch();

  return (
    <Flex gap={30} justify="space-between">
      <SegmentedControl
        id="calendar-switch"
        onChange={() => dispatch(setCalendar())}
        value={day ? 'Day' : 'Week'}
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
  );
}
