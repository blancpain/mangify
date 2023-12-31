import { notifications } from '@mantine/notifications';
import { useNavigate, NavLink } from 'react-router-dom';
import { Menu, UnstyledButton, Group, Box, useMantineTheme, rem, Avatar } from '@mantine/core';
import {
  IconSettings,
  IconLogout,
  IconChevronRight,
  IconChevronLeft,
  IconUser,
  IconCheck,
} from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { selectUser, logout, setMeals } from '@/stores';
import { useLogoutMutation } from '@/features/api';

export function UserMenu() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { user } = useAppSelector(selectUser);
  const [processLogout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await processLogout();
    dispatch(logout());
    dispatch(setMeals([]));
    navigate('/', { replace: true });
    notifications.show({
      id: 'logout',
      loading: true,
      title: 'See you later!',
      message: '',
      autoClose: false,
      withCloseButton: false,
    });

    setTimeout(() => {
      notifications.update({
        id: 'logout',
        color: 'teal',
        title: 'Logout successful ',
        message: '',
        icon: <IconCheck size="1rem" />,
        autoClose: 2000,
      });
    }, 3000);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Box
          sx={{
            paddingTop: theme.spacing.sm,
            borderTop: `${rem(1)} solid ${
              theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
          }}
        >
          <UnstyledButton
            sx={{
              display: 'block',
              width: '100%',
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              },
            }}
          >
            <Group>
              <Avatar color="teal" radius="xl">
                <IconUser size={rem(20)} />
              </Avatar>
              <Box sx={{ flex: 1 }} id="user-name">
                {user.name}
              </Box>

              {theme.dir === 'ltr' ? (
                <IconChevronRight size={rem(20)} />
              ) : (
                <IconChevronLeft size={rem(20)} />
              )}
            </Group>
          </UnstyledButton>
        </Box>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>User</Menu.Label>
        <Menu.Item component={NavLink} to="/user-settings" icon={<IconSettings size={14} />}>
          Settings
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          id="logout"
          color="red"
          icon={<IconLogout size={14} />}
          component="button"
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
