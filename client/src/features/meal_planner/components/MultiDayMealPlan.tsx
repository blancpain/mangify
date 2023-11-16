import {
  Loader,
  Box,
  Title,
  SimpleGrid,
  Space,
  Flex,
  ActionIcon,
  Center,
  Text,
} from '@mantine/core';
import { DateTime } from 'luxon';
import { nanoid } from '@reduxjs/toolkit';
import { motion } from 'framer-motion';
import { IconEye, IconMoodSad, IconReload, IconSalad, IconX } from '@tabler/icons-react';
import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import {
  useGenerateMultiDayMealPlanMutation,
  useGenerateSingleDayMealPlanMutation,
  useGetMealsQuery,
} from '@/features/api';
import { useAppDispatch } from '@/hooks';
import { setMeals, setSingleDayDate, setCalendar } from '@/stores';
import { Meal } from './Meal';
import { MealPlanHeader } from './MealPlanHeader';
import {
  capitalizeFirstLetterOfArray,
  extractSingleMealType,
  generateDateArray,
  isTheSameDate,
} from '@/utils';

type MultiDayMealPlanProps = {
  weekRange: [string, string];
};

export function MultiDayMealPlan({ weekRange }: MultiDayMealPlanProps) {
  const [
    generateMeals,
    { isLoading, isSuccess: isSuccessMealFetching, data: fetchedMultiDayMeals },
  ] = useGenerateMultiDayMealPlanMutation();
  const [generateSingleDayMeals] = useGenerateSingleDayMealPlanMutation();
  const dispatch = useAppDispatch();
  const { data: userMeals, isLoading: areMealsLoading, isSuccess } = useGetMealsQuery();

  useEffect(() => {
    if (isSuccess && userMeals) {
      dispatch(setMeals(userMeals));
    }
  }, [dispatch, isSuccess, userMeals]);

  if (isLoading || areMealsLoading) {
    return (
      <Center sx={{ minHeight: '100%' }}>
        <Loader color="teal" size="xl" variant="dots" />
      </Center>
    );
  }

  const convertedStartOfWeekISO = DateTime.fromISO(weekRange[0]).toISO();
  const convertedEndOfWeekISO = DateTime.fromISO(weekRange[1]).toISO();

  // dates for UI
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

  const currentDateRange = generateDateArray(
    DateTime.fromISO(convertedStartOfWeekISO!).toJSDate(),
    DateTime.fromISO(convertedEndOfWeekISO!).toJSDate(),
  );

  const allMealsForEachDay = currentDateRange.map((date) => {
    // NOTE: this is a workaround for the fact that the API returns mealTypes as an array of strings; we sort alphabetically breakfast > main course > snack
    const mealsForDate =
      userMeals
        ?.filter(isTheSameDate(date))
        .map((meal) => ({
          ...meal,
          mealTypes: meal.mealTypes
            ? extractSingleMealType(capitalizeFirstLetterOfArray(meal.mealTypes))
            : 'Main course',
        }))
        .sort((a, b) => a.mealTypes.localeCompare(b.mealTypes)) || null;
    return { date, mealsForDate };
  });

  const handleGeneration = async () => {
    try {
      if (!convertedStartOfWeekISO || !convertedEndOfWeekISO) return;
      const meals = await generateMeals({
        weekStart: convertedStartOfWeekISO,
        weekEnd: convertedEndOfWeekISO,
      }).unwrap();
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

  const singleDayMealsGeneration = async (e: React.MouseEvent) => {
    const mealDate = e.currentTarget.getAttribute('data-meal-date');
    if (!mealDate) return;
    try {
      const convertedMealDate = DateTime.fromISO(mealDate).toISO();
      if (!convertedMealDate) return;
      const meals = await generateSingleDayMeals({ date: convertedMealDate }).unwrap();
      dispatch(setMeals(meals));
    } catch (error: unknown) {
      notifications.show({
        id: 'generate-meals-error',
        icon: <IconX size="1rem" />,
        title: 'Something went wrong, please try again.',
        color: 'red',
        message: '',
        autoClose: 5000,
      });
    }
  };

  const goToMeal = (e: React.MouseEvent) => {
    const { id } = e.currentTarget as HTMLButtonElement;
    const mealDate = new Date(id);
    dispatch(setSingleDayDate(mealDate.toISOString()));
    dispatch(setCalendar());
  };

  const allMealsCards = allMealsForEachDay?.sort().map((obj) => (
    <Box
      key={nanoid()}
      sx={{
        border: '1px solid #C1C2C5',
        borderRadius: '20px',
        boxShadow:
          'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
      }}
      p={20}
      m={5}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <Title order={3} mb={30}>
        {obj.date.toLocaleDateString(undefined, {
          day: '2-digit',
          month: 'long',
          weekday: 'long',
        })}
      </Title>
      {obj.mealsForDate && obj.mealsForDate.length ? (
        obj.mealsForDate.map((meal) => (
          <div key={nanoid()}>
            <Meal
              image={meal.image}
              label={meal.title ? meal.title : ''}
              description={meal.mealTypes}
              directions={meal.directions ? meal.directions : []}
              nutritionProfile={meal.fullNutritionProfile ? meal.fullNutritionProfile : null}
              ingredients={meal.ingredients ? meal.ingredients : null}
            />
            <Space h="lg" />
          </div>
        ))
      ) : (
        <Center h="100%">
          <IconSalad size={50} />
        </Center>
      )}
      <Flex sx={{ justifyContent: 'space-between' }} mt="auto" id={obj.date.toISOString()}>
        <ActionIcon
          variant="subtle"
          color="teal"
          radius="xl"
          component="button"
          data-meal-date={obj.date.toISOString()}
          onClick={singleDayMealsGeneration}
          id="single-day-regenerate"
        >
          <IconReload />
        </ActionIcon>
        <ActionIcon
          variant="subtle"
          color="teal"
          radius="xl"
          id={obj.date.toISOString()}
          onClick={(e) => goToMeal(e)}
        >
          <IconEye />
        </ActionIcon>
      </Flex>
    </Box>
  ));

  // if the request has gone through but no meals were found
  if (isSuccessMealFetching && !fetchedMultiDayMeals) {
    return (
      <Box mt={30}>
        <MealPlanHeader
          handleGeneration={handleGeneration}
          date={`${startOfWeek} - ${endOfWeek}`}
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
    <Box mt={30} mb={30}>
      <MealPlanHeader handleGeneration={handleGeneration} date={`${startOfWeek} - ${endOfWeek}`} />
      <SimpleGrid
        cols={2}
        spacing="xl"
        breakpoints={[
          { minWidth: '120rem', cols: 4, spacing: 'md' },
          { minWidth: '100rem', cols: 3, spacing: 'md' },
          { minWidth: '76rem', cols: 2, spacing: 'xs' },
          { maxWidth: '68rem', cols: 1, spacing: 'xs' },
        ]}
      >
        {allMealsCards}
      </SimpleGrid>
    </Box>
  );
}
