import { useNavigate } from 'react-router-dom';
import { Menu, UnstyledButton, Group, Box, useMantineTheme, rem, Avatar } from '@mantine/core';
import {
  IconSettings,
  IconMessageCircle,
  IconLogout,
  IconChevronRight,
  IconChevronLeft,
  IconUser,
} from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { selectUser, logout } from '@/stores';
import { useLogoutMutation } from '@/features/api';

export function UserMenu() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { name: userName } = useAppSelector(selectUser);
  const [processLogout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await processLogout();
    dispatch(logout);
    // refresh the page
    navigate(0);
    navigate('/');
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
              <Avatar color="green" radius="xl">
                <IconUser size={rem(20)} />
              </Avatar>
              <Box sx={{ flex: 1 }}>{userName}</Box>

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
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>

        <Menu.Divider />

        <Menu.Item
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
