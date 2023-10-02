import { IconCalendar, IconShoppingBag, IconHeart, IconChartPie2 } from '@tabler/icons-react';
import { SidebarSoloLink } from './SidebarSoloLink';
import { SideBarDropdownLink } from './SideBarDropdownLink';

type SideBarProps = {
  closeDrawer: () => void;
};

export function SideBar({ closeDrawer }: SideBarProps) {
  return (
    <div>
      <SidebarSoloLink
        icon={<IconCalendar size="1rem" />}
        color="teal"
        label="Meal Planner"
        link="/"
        closeDrawer={closeDrawer}
      />
      <SidebarSoloLink
        icon={<IconShoppingBag size="1rem" />}
        color="teal"
        label="Shopping List"
        link="/"
        closeDrawer={closeDrawer}
      />
      <SidebarSoloLink
        icon={<IconHeart size="1rem" />}
        color="teal"
        label="Favorites"
        link="/"
        closeDrawer={closeDrawer}
      />
      <SidebarSoloLink
        icon={<IconChartPie2 size="1rem" />}
        color="teal"
        label="Diet & Nutrition Preferences"
        link="/nutrition-preferences"
        closeDrawer={closeDrawer}
      />
      <SideBarDropdownLink closeDrawer={closeDrawer} />
    </div>
  );
}
