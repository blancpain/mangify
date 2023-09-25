import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Group,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { SideBarLinks } from './Sidebar';
import { UserMenu } from './UserMenu';
import { Logo } from '@/components/Logo';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export function Dashboard() {
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 150, lg: 250 }}>
          <Navbar.Section grow mt="xs">
            <SideBarLinks />
          </Navbar.Section>
          <Navbar.Section>
            <UserMenu />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 70, md: 70 }} p="md">
          <Group sx={{ height: '100%' }} position="apart">
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="md" mr="xl" />
            </MediaQuery>
            <Logo />
            <ThemeSwitcher />
          </Group>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
}
