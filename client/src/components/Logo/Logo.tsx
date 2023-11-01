import { Group, Title } from '@mantine/core';
import { IconSalad } from '@tabler/icons-react';

export function Logo() {
  return (
    <Group spacing={3}>
      <IconSalad color="teal" size={35} />
      <Title order={1} color="teal">
        mangify
      </Title>
    </Group>
  );
}
