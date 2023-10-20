import { Text, Accordion, Title, Flex, ActionIcon } from '@mantine/core';
import { IconReload } from '@tabler/icons-react';
import { MealRecipe } from '@shared/types';
import { nanoid } from '@reduxjs/toolkit';
import { Meal } from './Meal';
import { capitalizeFirstLetterOfArray, extractSingleMealType } from '@/utils';

type MealAccordionProps = {
  meal: MealRecipe;
};

export function MealAccordion({ meal }: MealAccordionProps) {
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
            <ActionIcon color="teal" size="xl" variant="subtle">
              <IconReload />
            </ActionIcon>
          </Flex>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
