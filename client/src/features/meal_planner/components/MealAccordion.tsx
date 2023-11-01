import { Text, Accordion, Title, Flex, ActionIcon } from '@mantine/core';
import { IconReload, IconX } from '@tabler/icons-react';
import { MealRecipe } from '@shared/types';
import { nanoid } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import { notifications } from '@mantine/notifications';
import { Meal } from './Meal';
import { capitalizeFirstLetterOfArray, extractSingleMealType } from '@/utils';
import { useAppDispatch } from '@/hooks';
import { useRegenerateOneMealMutation } from '@/features/api';
import { setMeals } from '@/stores';

type MealAccordionProps = {
  meal: MealRecipe;
};

export function MealAccordion({ meal }: MealAccordionProps) {
  const dispatch = useAppDispatch();
  const [regenerateMeal] = useRegenerateOneMealMutation();

  // TODO: error handling
  const handleRegeneration = async (e: React.MouseEvent) => {
    const { id } = e.currentTarget as HTMLButtonElement;
    const convertedDate = new Date(meal.date || new Date());
    const targetedMealDate = DateTime.fromJSDate(convertedDate).toISO();
    const mealType = meal.mealTypes
      ? extractSingleMealType(capitalizeFirstLetterOfArray(meal.mealTypes))
      : 'Main Course';

    if (!id || !targetedMealDate || !mealType) return;
    const mealData = { date: targetedMealDate, mealType, uniqueIdentifier: id };

    try {
      const updatedMeals = await regenerateMeal(mealData).unwrap();
      dispatch(setMeals(updatedMeals));
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

  return (
    <Accordion chevronPosition="right" variant="default">
      <Accordion.Item value={nanoid()} key={nanoid()}>
        <Accordion.Control>
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
        </Accordion.Control>
        <Accordion.Panel>
          <Flex justify="space-between">
            <Flex direction="column">
              <Title order={3} mb={10}>
                Nutrients
              </Title>
              <Text size="md">Calories: {meal.fullNutritionProfile?.calories}</Text>
              <Text size="md">Protein: {meal.fullNutritionProfile?.protein} g</Text>
              <Text size="md">Fats: {meal.fullNutritionProfile?.fats} g</Text>
              <Text size="md">Carbs: {meal.fullNutritionProfile?.carbs} g</Text>
            </Flex>
            <ActionIcon
              color="teal"
              size="xl"
              variant="subtle"
              id={meal.uniqueIdentifier || ''}
              onClick={handleRegeneration}
            >
              <IconReload />
            </ActionIcon>
          </Flex>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
