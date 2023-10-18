import { max, min } from 'date-fns';
import { nanoid } from '@reduxjs/toolkit';
import { Box, Button } from '@mantine/core';
import { useGenerateMultiDayMealPlanMutation } from '@/features/api';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectUser, setMeals } from '@/stores';

type MultiDayMealPlanProps = {
  weekRange: [string, string];
  calories: number | null;
};

export function MultiDayMealPlan({ weekRange, calories }: MultiDayMealPlanProps) {
  const [generateMeals] = useGenerateMultiDayMealPlanMutation();
  const dispatch = useAppDispatch();
  const { meals: userMeals } = useAppSelector(selectUser);

  const convertedStartOfWeek = min([new Date(weekRange[0]), new Date(weekRange[1])]);
  const convertedEndOfWeek = max([new Date(weekRange[0]), new Date(weekRange[1])]);

  const startOfWeek = new Date(weekRange[0]).toLocaleDateString(undefined, {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });

  const endOfWeek = new Date(weekRange[1]).toLocaleDateString(undefined, {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });

  const handleGeneration = async () => {
    try {
      const meals = await generateMeals({
        weekStart: convertedStartOfWeek,
        weekEnd: convertedEndOfWeek,
      }).unwrap();
      dispatch(setMeals(meals));
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const allMeals = userMeals?.map((meal) => (
    <Box key={nanoid()} bg="blue">
      <p>{meal.title}</p>
      <p>{meal.id}</p>
      <a href={meal.fullRecipeURL ?? ''}>Click here</a>
      <p>{meal.date ? new Date(meal.date).toLocaleString() : new Date().toISOString()}</p>
      <p>Meal type: ${meal.mealTypes}</p>
      <p>Calories: {meal.fullNutritionProfile?.calories}</p>
      <p>Protein: {meal.fullNutritionProfile?.protein}</p>
      <p>Fats: {meal.fullNutritionProfile?.fats}</p>
      <p>Carbs: {meal.fullNutritionProfile?.carbs}</p>
    </Box>
  ));

  return (
    <>
      <p>Week start: {startOfWeek} </p>
      <p>Week end: {endOfWeek} </p>
      <p>Calories: {calories}</p>
      <p>Meals</p>
      <Button onClick={handleGeneration}>Generate</Button>
      {allMeals && allMeals}
    </>
  );
}
