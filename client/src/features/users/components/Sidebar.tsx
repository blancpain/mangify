import {
  IconCalendar,
  IconChartPie2,
  IconShoppingBag,
  // IconHeart,
  IconListCheck,
} from '@tabler/icons-react';
import { SidebarSoloLink } from './SidebarSoloLink';
import { SideBarDropdownLink } from './SideBarDropdownLink';

type SideBarProps = {
  closeDrawer: () => void;
};

// NOTE: favorites for future release
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
        link="/shopping-list"
        closeDrawer={closeDrawer}
      />
      {/* <SidebarSoloLink */}
      {/*   icon={<IconHeart size="1rem" />} */}
      {/*   color="teal" */}
      {/*   label="Favorites" */}
      {/*   link="/" */}
      {/*   closeDrawer={closeDrawer} */}
      {/* /> */}
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
