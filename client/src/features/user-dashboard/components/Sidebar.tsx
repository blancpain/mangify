import {
  IconCalendar,
  IconShoppingBag,
  IconHeart,
  IconSettings,
  IconChartPie2,
} from '@tabler/icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  link: string;
}

function SideBarLinks({ icon, color, label, link }: MainLinkProps) {
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
  {
    icon: <IconCalendar size="1rem" />,
    color: 'teal',
    label: 'Meal Planner',
    link: '/',
  },
  { icon: <IconShoppingBag size="1rem" />, link: '', color: 'teal', label: 'Shopping List' },
  { icon: <IconHeart size="1rem" />, link: '', color: 'teal', label: 'Favorites' },
  {
    icon: <IconChartPie2 size="1rem" />,
    link: '',
    color: 'teal',
    label: 'Diet & Nutrition Preferences',
  },
  { icon: <IconSettings size="1rem" />, link: '/meal-settings', color: 'teal', label: 'Settings' },
];

export function SideBar() {
  const links = linkData.map((item) => (
    <SideBarLinks
      icon={item.icon}
      link={item.link}
      label={item.label}
      color={item.color}
      key={nanoid()}
    />
  ));
  return <div>{links}</div>;
}
