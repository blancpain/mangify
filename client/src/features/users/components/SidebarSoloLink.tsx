import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { NavLink } from 'react-router-dom';

type MainLinkProps = {
  icon: React.ReactNode;
  color: string;
  label: string;
  link: string;
  closeDrawer: () => void;
};

export function SidebarSoloLink({ icon, color, label, link, closeDrawer }: MainLinkProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
      component={NavLink}
      to={link}
      onClick={closeDrawer}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}
