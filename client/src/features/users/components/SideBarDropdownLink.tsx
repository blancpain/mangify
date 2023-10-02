import { Box, NavLink as MantineNavLink, ThemeIcon } from '@mantine/core';
import { NavLink as ReactRouterNavLink } from 'react-router-dom';
import { IconSettings } from '@tabler/icons-react';

export function SideBarDropdownLink() {
  return (
    <Box w="100%">
      <MantineNavLink
        label="Settings"
        icon={
          <ThemeIcon color="teal" variant="light">
            <IconSettings size="1rem" />
          </ThemeIcon>
        }
        childrenOffset={28}
        defaultOpened
      >
        <MantineNavLink label="Meal Settings" component={ReactRouterNavLink} to="/meal-settings" />
        <MantineNavLink label="User Settings" component={ReactRouterNavLink} to="/user-settings" />
      </MantineNavLink>
    </Box>
  );
}
