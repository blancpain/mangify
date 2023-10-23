import { max, min } from 'date-fns';
import { nanoid } from '@reduxjs/toolkit';
import { motion } from 'framer-motion';
import { Box, Title, SimpleGrid, Space, Flex, ActionIcon, Center } from '@mantine/core';
import { IconClick, IconReload, IconSalad } from '@tabler/icons-react';
import { useGenerateMultiDayMealPlanMutation } from '@/features/api';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectUser, setMeals, setSingleDayDate, setCalendar } from '@/stores';
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

  const currentDateRange = generateDateArray(convertedStartOfWeek, convertedEndOfWeek);

  const allMealsForEachDay = currentDateRange.map((date) => {
    const mealsForDate = userMeals?.filter(isTheSameDate(date)) || null;
    return { date, mealsForDate };
  });

  // NOTE: for personal reference, we can also use reduce with the same result - see below

  // const allMealsForEachDay = currentDateRange.reduce(
  //   (acc: { date: Date; mealsForDate: MealRecipe[] | null }[], date) => {
  //     const mealsForDate = userMeals?.filter(isTheSameDate(date)) || null;
  //     return [...acc, { date, mealsForDate }];
  //   },
  //   [],
  // );

  // TODO: error handling
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

  const goToMeal = (e: React.MouseEvent) => {
    const { id } = e.currentTarget as HTMLButtonElement;
    const mealDate = new Date(id);
    dispatch(setSingleDayDate(mealDate.toISOString()));
    dispatch(setCalendar());
  };

  const allMealsCards = allMealsForEachDay?.map((obj) => (
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
      initial={{ opacity: 0, translateX: -100 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3 }}
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
              description={
                meal.mealTypes
                  ? extractSingleMealType(capitalizeFirstLetterOfArray(meal.mealTypes))
                  : ''
              }
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
        <ActionIcon variant="subtle" color="teal" radius="xl">
          <IconReload />
        </ActionIcon>
        <ActionIcon
          variant="subtle"
          color="teal"
          radius="xl"
          id={obj.date.toISOString()}
          onClick={(e) => goToMeal(e)}
        >
          <IconClick />
        </ActionIcon>
      </Flex>
    </Box>
  ));

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
