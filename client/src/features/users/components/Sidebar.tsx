import {
  IconCalendar,
  IconShoppingBag,
  IconHeart,
  IconSettings,
  IconChartPie2,
} from '@tabler/icons-react';
import { SidebarSoloLink } from './SidebarSoloLinks';

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
      <SidebarSoloLink
        icon={<IconSettings size="1rem" />}
        color="teal"
        label="Settings"
        link="/meal-settings"
      />
    </div>
  );
}
