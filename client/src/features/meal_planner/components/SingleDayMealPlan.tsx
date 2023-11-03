import { useEffect } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import { Box, Center, Flex, Grid, Loader, Table, Text, Title } from '@mantine/core';
import { IconMoodSad, IconSalad, IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useGenerateSingleDayMealPlanMutation, useGetMealsQuery } from '@/features/api';
import { useAppDispatch } from '@/hooks';
import { setMeals } from '@/stores';
import { capitalizeFirstLetterOfArray, extractSingleMealType, isTheSameDate } from '@/utils';
import { MealAccordion } from './MealAccordion';
import { PieChart } from '@/components';
import { MealPlanHeader } from './MealPlanHeader';

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
  const [
    generateMeals,
    { data: fetchedMeals, isLoading: isLoadingMealFetching, isSuccess: isSuccessMealFetching },
  ] = useGenerateSingleDayMealPlanMutation();
  const dispatch = useAppDispatch();
  const { data: userMeals, isSuccess, isLoading } = useGetMealsQuery();

  useEffect(() => {
    if (isSuccess && userMeals) {
      dispatch(setMeals(userMeals));
    }
  }, [dispatch, isSuccess, userMeals]);

  if (isLoading || isLoadingMealFetching) {
    return (
      <Center sx={{ height: '100%' }}>
        <Loader color="teal" size="xl" variant="dots" />
      </Center>
    );
  }

  // NOTE: we use Luxon to ensure timezone consistency across client and server
  const currentDate = DateTime.fromISO(day);
  const currentDateJs = currentDate.toJSDate();

  // NOTE: pretty date for the UI
  const convertedDate = new Date(day).toLocaleDateString(undefined, {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });

  const isToday =
    convertedDate ===
    new Date().toLocaleDateString(undefined, { weekday: 'long', day: '2-digit', month: 'long' });

  const handleGeneration = async () => {
    try {
      const mealDateToIso = currentDate.toISO();
      if (!mealDateToIso) return;
      const meals = await generateMeals({ date: mealDateToIso }).unwrap();
      dispatch(setMeals(meals));
    } catch (error: unknown) {
      notifications.show({
        id: 'generate-meals-error',
        icon: <IconX size="1rem" />,
        title: 'Something went wrong, please try again later.',
        color: 'red',
        message: '',
        autoClose: 5000,
      });
    }
  };

  const allMeals = userMeals
    ?.filter(isTheSameDate(currentDateJs))
    .map((meal) => ({
      ...meal,
      mealTypes: meal.mealTypes
        ? extractSingleMealType(capitalizeFirstLetterOfArray(meal.mealTypes))
        : 'Main course',
    }))
    .sort((a, b) => a.mealTypes.localeCompare(b.mealTypes))
    .map((meal) => <MealAccordion key={nanoid()} meal={meal} />);

  const totalMealCalories = userMeals
    ?.filter(isTheSameDate(currentDateJs))
    ?.reduce((a, b) => a + Number(b.fullNutritionProfile?.calories), 0)
    .toFixed(0);
  const totalMealProtein = userMeals
    ?.filter(isTheSameDate(currentDateJs))
    ?.reduce((a, b) => a + Number(b.fullNutritionProfile?.protein), 0)
    .toFixed(0);

  const totalMealCarbs = userMeals
    ?.filter(isTheSameDate(currentDateJs))
    ?.reduce((a, b) => a + Number(b.fullNutritionProfile?.carbs), 0)
    .toFixed(0);
  const totalMealFats = userMeals
    ?.filter(isTheSameDate(currentDateJs))
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

  if (isSuccessMealFetching && !fetchedMeals) {
    return (
      <Box mt={30}>
        <MealPlanHeader
          handleGeneration={handleGeneration}
          date={isToday ? 'Today' : convertedDate}
        />

        <Flex direction="column" align="center" justify="center" gap="md">
          <Title order={3}>No meals found</Title>
          <IconMoodSad size={150} />
          <Text size="sm" align="center">
            It looks like there are no meals that fit your criteria. Please try again or modify some
            of your diet preferences before re-generating
          </Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box mt={30}>
      <MealPlanHeader
        handleGeneration={handleGeneration}
        date={isToday ? 'Today' : convertedDate}
      />
      {!allMeals || (allMeals && allMeals.length === 0) ? (
        <Flex direction="column" align="center" justify="center" gap="md">
          <Title order={3}>You have no meals</Title>
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
