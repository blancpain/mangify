import { Flex, ActionIcon } from '@mantine/core';
import { IconReload, IconX } from '@tabler/icons-react';
import { MealRecipe } from 'mangify-shared-types';
import { DateTime } from 'luxon';
import { notifications } from '@mantine/notifications';
import { motion } from 'framer-motion';
import { Meal } from './Meal';
import { useAppDispatch } from '@/hooks';
import { useRegenerateOneMealMutation } from '@/features/api';
import { setMeals } from '@/stores';

type MealRecipeWithSingleMealType = Omit<MealRecipe, 'mealTypes'> & {
  mealTypes: string;
};

type MealStackProps = {
  meal: MealRecipeWithSingleMealType;
};

export function MealStack({ meal }: MealStackProps) {
  const dispatch = useAppDispatch();
  const [regenerateMeal] = useRegenerateOneMealMutation();

  const handleRegeneration = async (e: React.MouseEvent) => {
    const id = e.currentTarget.getAttribute('data-id');
    const convertedDate = new Date(meal.date || new Date());
    const targetedMealDate = DateTime.fromJSDate(convertedDate).toISO();
    const mealType = meal.mealTypes;

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
    <Flex justify="space-between" gap={20} mb={30} align="flex-start">
      <Meal
        image={meal.image}
        label={meal.title ? meal.title : ''}
        description={meal.mealTypes}
        directions={meal.directions ? meal.directions : []}
        nutritionProfile={meal.fullNutritionProfile ? meal.fullNutritionProfile : null}
        ingredients={meal.ingredients ? meal.ingredients : null}
      />
      <motion.div whileTap={{ rotate: 720 }} transition={{ duration: 0.5 }}>
        <ActionIcon
          color="teal"
          size="xl"
          variant="transparent"
          id="regenerate-meal"
          data-id={meal.uniqueIdentifier}
          onClick={handleRegeneration}
        >
          <IconReload />
        </ActionIcon>
      </motion.div>
    </Flex>
  );
}
