import { Box, NavLink as MantineNavLink, ThemeIcon } from '@mantine/core';
import { NavLink as ReactRouterNavLink } from 'react-router-dom';
import { IconSettings } from '@tabler/icons-react';

type SideBarDropdownLinkProps = {
  closeDrawer: () => void;
};

export function SideBarDropdownLink({ closeDrawer }: SideBarDropdownLinkProps) {
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
        <MantineNavLink
          label="Meal Settings"
          component={ReactRouterNavLink}
          to="/meal-settings"
          onClick={closeDrawer}
        />
        <MantineNavLink
          label="User Settings"
          component={ReactRouterNavLink}
          to="/user-settings"
          onClick={closeDrawer}
        />
      </MantineNavLink>
    </Box>
  );
}
