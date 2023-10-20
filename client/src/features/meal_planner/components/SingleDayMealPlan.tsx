import { nanoid } from '@reduxjs/toolkit';
import { Box, Button, Flex, Grid, Table, Text, Title } from '@mantine/core';
import { IconReload, IconSalad } from '@tabler/icons-react';
import { useGenerateSingleDayMealPlanMutation } from '@/features/api';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectUser, setMeals } from '@/stores';
import { isTheSameDate } from '@/utils';
import { MealAccordion } from './MealAccordion';
import { PieChart } from '@/components';

type SingleDayMealPlanProps = {
  day: string;
  userCalories: number | null;
  userProtein: number | null;
  userFats: number | null;
  userCarbs: number | null;
};

export function SingleDayMealPlan({
  day,
  userCalories,
  userProtein,
  userCarbs,
  userFats,
}: SingleDayMealPlanProps) {
  const [generateMeals] = useGenerateSingleDayMealPlanMutation();
  const dispatch = useAppDispatch();
  const { meals: userMeals } = useAppSelector(selectUser);

  // NOTE: we need the current date in Date format for some of the functions below
  const currentDate = new Date(day);

  // NOTE: pretty date for the UI
  const convertedDate = new Date(day).toLocaleDateString(undefined, {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });
  const isToday =
    convertedDate ===
    new Date().toLocaleDateString(undefined, { weekday: 'long', day: '2-digit', month: 'long' });

  // TODO: error handling
  const handleGeneration = async () => {
    try {
      const meals = await generateMeals({ date: currentDate }).unwrap();
      dispatch(setMeals(meals));
    } catch (error: unknown) {
      // TODO: add notification here
      console.log(error);
    }
  };

  const allMeals = userMeals
    ?.filter(isTheSameDate(currentDate))
    .map((meal) => <MealAccordion key={nanoid()} meal={meal} />);

  const totalMealCalories = userMeals
    ?.filter(isTheSameDate(currentDate))
    ?.reduce((a, b) => a + Number(b.fullNutritionProfile?.calories), 0)
    .toFixed(0);
  const totalMealProtein = userMeals
    ?.filter(isTheSameDate(currentDate))
    ?.reduce((a, b) => a + Number(b.fullNutritionProfile?.protein), 0)
    .toFixed(0);

  const totalMealCarbs = userMeals
    ?.filter(isTheSameDate(currentDate))
    ?.reduce((a, b) => a + Number(b.fullNutritionProfile?.carbs), 0)
    .toFixed(0);
  const totalMealFats = userMeals
    ?.filter(isTheSameDate(currentDate))
    ?.reduce((a, b) => a + Number(b.fullNutritionProfile?.fats), 0)
    .toFixed(0);

  const dataForTable = [
    { meal: totalMealCalories, user: userCalories, name: 'Calories' },
    { meal: totalMealProtein, user: userProtein, name: 'Protein' },
    { meal: totalMealFats, user: userFats, name: 'Fats' },
    { meal: totalMealCarbs, user: userCarbs, name: 'Carbs' },
  ];

  const tableRows = dataForTable.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.meal}</td>
      <td>{element.user}</td>
    </tr>
  ));

  // TODO: add loading state for when we are fetching meals
  // TODO: add error state for when we have no meals
  return (
    <Box mt={30}>
      <Flex mb={30} align="start" justify="space-between">
        <Title order={2} mb="md">
          {isToday ? 'Today' : convertedDate}
        </Title>
        <Button leftIcon={<IconReload />} onClick={handleGeneration} color="teal" size="lg">
          Generate
        </Button>
      </Flex>

      {allMeals && allMeals.length === 0 ? (
        <Flex direction="column" align="center" justify="center" gap="md">
          <Title order={3}>You have no meals for this day</Title>
          <IconSalad size={350} />
          <Text size="sm">Click the button above to generate some</Text>
        </Flex>
      ) : (
        <Grid gutter={40}>
          <Grid.Col md={8} lg={7}>
            {allMeals}
          </Grid.Col>
          <Grid.Col md={8} lg={5}>
            <PieChart
              title="Meal macros for today"
              calories={null}
              protein={Number(totalMealProtein)}
              fats={Number(totalMealFats)}
              carbs={Number(totalMealCarbs)}
            />
            <Table mb={40} highlightOnHover>
              <thead>
                <tr>
                  <th> </th>
                  <th style={{ textAlign: 'center' }}>Totals</th>
                  <th style={{ textAlign: 'center' }}>Your target</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: 'center' }}>{tableRows}</tbody>
            </Table>
          </Grid.Col>
        </Grid>
      )}
    </Box>
  );
}
