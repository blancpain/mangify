import { nanoid } from '@reduxjs/toolkit';
import { Box, Button, Flex, Text, Title } from '@mantine/core';
import { useGenerateSingleDayMealPlanMutation } from '@/features/api';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectUser, setMeals } from '@/stores';
import { isTheSameDate } from '@/utils';

type SingleDayMealPlanProps = {
  day: string;
  calories: number | null;
};

export function SingleDayMealPlan({ day, calories }: SingleDayMealPlanProps) {
  const [generateMeals] = useGenerateSingleDayMealPlanMutation();
  const dispatch = useAppDispatch();
  const { meals: userMeals } = useAppSelector(selectUser);

  // NOTE: we need the current date in Date format for some of the functions below
  const currentDate = new Date(day);

  // NOTE: the 2 lines below we use for the UI
  const convertedDay = new Date(day).toLocaleDateString(undefined, {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });
  const isToday =
    convertedDay ===
    new Date().toLocaleDateString(undefined, { weekday: 'long', day: '2-digit', month: 'long' });

  const handleGeneration = async () => {
    try {
      const meals = await generateMeals({ date: currentDate }).unwrap();
      dispatch(setMeals(meals));
    } catch (error: unknown) {
      // TODO: add notification here
      console.log(error);
    }
  };

  const allMeals = userMeals?.filter(isTheSameDate(currentDate)).map((meal) => (
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

  const totalMealCalories = userMeals
    ?.reduce((a, b) => a + Number(b.fullNutritionProfile?.calories), 0)
    .toFixed(0);
  const totalMealProtein = userMeals
    ?.reduce((a, b) => a + Number(b.fullNutritionProfile?.protein), 0)
    .toFixed(0);

  const totalMealCarbs = userMeals
    ?.reduce((a, b) => a + Number(b.fullNutritionProfile?.carbs), 0)
    .toFixed(0);
  const totalMealFats = userMeals
    ?.reduce((a, b) => a + Number(b.fullNutritionProfile?.fats), 0)
    .toFixed(0);

  return (
    <Box mt="md">
      <Title order={2} mb="md">
        {isToday ? 'Today' : convertedDay}
      </Title>
      <Flex align="center" justify="space-between">
        <Title order={3}>Meals</Title>
        {calories && <Text fw={900}>{calories} calories</Text>}
      </Flex>
      <Button onClick={handleGeneration}>Generate meal</Button>
      <Title>Meals</Title>
      {allMeals}
      <p>Macros</p>
      Calories: {totalMealCalories} Protein: {totalMealProtein} Carbs: {totalMealCarbs} Fats:{' '}
      {totalMealFats}{' '}
    </Box>
  );
}
