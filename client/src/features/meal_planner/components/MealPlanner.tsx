import { useAppSelector } from '@/hooks';
import { selectCalendar, selectUser } from '@/stores';
import { SingleDayMealPlan } from './SingleDayMealPlan';
import { MultiDayMealPlan } from './MultiDayMealPlan';
import { CalendarControls } from './CalendarControls';

export function MealPlanner() {
  const { day, singleDayDate, weekRange } = useAppSelector(selectCalendar);
  const { profile } = useAppSelector(selectUser);

  return (
    <>
      <CalendarControls />
      {day && (
        <SingleDayMealPlan
          day={singleDayDate || new Date().toISOString()}
          userCalories={profile.calories}
          userProtein={profile.protein}
          userFats={profile.fats}
          userCarbs={profile.carbs}
        />
      )}
      {day === false && <MultiDayMealPlan weekRange={weekRange} />}
    </>
  );
}
