import { Outlet } from 'react-router-dom';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

// ? consider separating routes and layouts...

export default function Root() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <>
      <h1>mangify</h1>
      <ActionIcon
        variant="transparent"
        color={dark ? 'yellow' : 'dark'}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <IconSun size="1.2rem" /> : <IconMoonStars size="1.2rem" />}
      </ActionIcon>
      <Outlet />
    </>
  );
}
