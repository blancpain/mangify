import { useDisclosure } from '@mantine/hooks';
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
import { SideBar } from './Sidebar';
import { UserMenu } from './UserMenu';
import { Logo } from '@/components/Logo';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export function Dashboard() {
  const theme = useMantineTheme();

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

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
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!drawerOpened} width={{ sm: 300, lg: 350 }}>
          <Navbar.Section grow mt="xs">
            <SideBar closeDrawer={closeDrawer} />
          </Navbar.Section>
          <Navbar.Section>
            <UserMenu />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 70, md: 70 }} p={{ base: 5, md: 'md' }}>
          <Group sx={{ height: '100%' }} position="apart">
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger opened={drawerOpened} onClick={toggleDrawer} size="md" mr="xl" />
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
