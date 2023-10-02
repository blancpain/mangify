import { IconCalendar, IconShoppingBag, IconHeart, IconChartPie2 } from '@tabler/icons-react';
import { SidebarSoloLink } from './SidebarSoloLink';
import { SideBarDropdownLink } from './SideBarDropdownLink';

export function SideBar() {
  return (
    <div>
      <SidebarSoloLink
        icon={<IconCalendar size="1rem" />}
        color="teal"
        label="Meal Planner"
        link="/"
      />
      <SidebarSoloLink
        icon={<IconShoppingBag size="1rem" />}
        color="teal"
        label="Shopping List"
        link="/"
      />
      <SidebarSoloLink icon={<IconHeart size="1rem" />} color="teal" label="Favorites" link="/" />
      <SidebarSoloLink
        icon={<IconChartPie2 size="1rem" />}
        color="teal"
        label="Diet & Nutrition Preferences"
        link="/nutrition-preferences"
      />
      <SideBarDropdownLink />
    </div>
  );
}
