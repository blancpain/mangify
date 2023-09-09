import { Group, Title } from '@mantine/core';
import { IconSalad } from '@tabler/icons-react';

export function Logo() {
  return (
    <Group spacing={3}>
      <IconSalad color="green" size={35} />
      <Title order={1} color="green">
        mangify
      </Title>
    </Group>
  );
}