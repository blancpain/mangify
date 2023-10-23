import { NavLink } from 'react-router-dom';
import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Logo } from '@/components/Logo';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <Box component="header">
      <Header height={90} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Logo />
          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <Text component={NavLink} to="/" className={classes.link}>
              Home
            </Text>
            <Text component={NavLink} to="/" className={classes.link}>
              Learn
            </Text>
            <Text component={NavLink} to="/" className={classes.link}>
              About
            </Text>
          </Group>
          <Group className={classes.hiddenMobile}>
            <ThemeSwitcher />
            <Button variant="default" component={NavLink} to="/login">
              Log in
            </Button>
            <Button component={NavLink} to="/sign-up">
              Sign up
            </Button>
          </Group>
          <Group className={classes.hiddenDesktop}>
            <ThemeSwitcher />
            <Burger opened={drawerOpened} onClick={toggleDrawer} />
          </Group>
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Text component={NavLink} to="/" className={classes.link} onClick={closeDrawer}>
            Home
          </Text>
          <Text component={NavLink} to="/" className={classes.link} onClick={closeDrawer}>
            Learn
          </Text>
          <Text component={NavLink} to="/" className={classes.link} onClick={closeDrawer}>
            About
          </Text>

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default" component={NavLink} to="/login" onClick={closeDrawer}>
              Log in
            </Button>
            <Button component={NavLink} to="/sign-up" onClick={closeDrawer}>
              Sign up
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
