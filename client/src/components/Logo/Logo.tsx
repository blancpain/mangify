import { Button, Group, Title } from '@mantine/core';
import { IconSalad } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';

export function Logo() {
  return (
    <Group spacing={3}>
      <IconSalad color="teal" size={35} />
      <Button color="teal" component={NavLink} to="/" variant="transparent">
        <Title order={2} color="teal">
          mangify
        </Title>
      </Button>
    </Group>
  );
}
