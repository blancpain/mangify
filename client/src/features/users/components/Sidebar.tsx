import {
  IconCalendar,
  IconChartPie2,
  IconShoppingBag,
  // IconHeart,
  IconListCheck,
} from '@tabler/icons-react';
import { useReadLocalStorage } from 'usehooks-ts';
import { Avatar, Flex } from '@mantine/core';
import { SidebarSoloLink } from './SidebarSoloLink';
import { SideBarDropdownLink } from './SideBarDropdownLink';
import { ShoppingListItem } from '@/types';

type SideBarProps = {
  closeDrawer: () => void;
};

// NOTE: favorites for future release
export function SideBar({ closeDrawer }: SideBarProps) {
  const shoppingList = useReadLocalStorage<ShoppingListItem[]>('shoppingList');
  const numberOfItemsInShoppingList = shoppingList?.reduce(
    (acc, item) => acc + item.ingredients.length,
    0,
  );

  return (
    <div>
      <SidebarSoloLink
        icon={<IconCalendar size="1rem" />}
        color="teal"
        label="Meal Planner"
        link="/"
        closeDrawer={closeDrawer}
      />
      {/* <SidebarSoloLink */}
      {/*   icon={<IconHeart size="1rem" />} */}
      {/*   color="teal" */}
      {/*   label="Favorites" */}
      {/*   link="/" */}
      {/*   closeDrawer={closeDrawer} */}
      {/* /> */}
      <Flex align="center" justify="start" style={{ position: 'relative' }}>
        {numberOfItemsInShoppingList && numberOfItemsInShoppingList > 0 ? (
          <Avatar color="orange" radius="xl" size="sm" sx={{ position: 'absolute', left: 160 }}>
            {numberOfItemsInShoppingList || ''}
          </Avatar>
        ) : (
          ''
        )}
        <SidebarSoloLink
          icon={<IconShoppingBag size="1rem" />}
          color="teal"
          label="Shopping List"
          link="/shopping-list"
          closeDrawer={closeDrawer}
        />
      </Flex>
      <SidebarSoloLink
        icon={<IconListCheck size="1rem" />}
        color="teal"
        label="Diet Preferences"
        link="/diet-preferences"
        closeDrawer={closeDrawer}
      />
      <SidebarSoloLink
        icon={<IconChartPie2 size="1rem" />}
        color="teal"
        label="Nutrition Profile"
        link="/nutrition-profile"
        closeDrawer={closeDrawer}
      />
      <SideBarDropdownLink closeDrawer={closeDrawer} />
    </div>
  );
}
