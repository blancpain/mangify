import { IconCalendar, IconShoppingBag, IconMessages } from '@tabler/icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { nanoid } from '@reduxjs/toolkit';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
}

function SideBar({ icon, color, label }: MainLinkProps) {
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

const linkData = [
  { icon: <IconCalendar size="1rem" />, color: 'blue', label: 'Meal Planner' },
  { icon: <IconShoppingBag size="1rem" />, color: 'teal', label: 'Shopping List' },
  { icon: <IconMessages size="1rem" />, color: 'violet', label: 'Link 3 ...' },
];

export function SideBarLinks() {
  const links = linkData.map((link) => (
    <SideBar icon={link.icon} label={link.label} color={link.color} key={nanoid()} />
  ));
  return <div>{links}</div>;
}
