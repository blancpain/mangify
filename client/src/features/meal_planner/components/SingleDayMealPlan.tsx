import { Box, Button, Flex, Text, Title } from '@mantine/core';
import { useGenerateSingleDayMealPlanMutation } from '@/features/api';

type SingleDayMealPlanProps = {
  day: string;
  calories: number | null;
};

export function SingleDayMealPlan({ day, calories }: SingleDayMealPlanProps) {
  const [generateMeals] = useGenerateSingleDayMealPlanMutation();

  const isToday =
    day ===
    new Date().toLocaleDateString(undefined, { weekday: 'long', day: '2-digit', month: 'long' });

  const handleGeneration = async () => {
    try {
      const meals = await generateMeals().unwrap();
      console.log(meals.map((item) => item.fullRecipeURL));
      // dispatch(setUser(userData)); -> setMeals here...
    } catch (error: unknown) {
      // TODO: add toast effects here
      console.log(error);
    }
  };

  return (
    <Box mt="md">
      <Title order={2} mb="md">
        {isToday ? 'Today' : day}
      </Title>
      <Flex align="center" justify="space-between">
        <Title order={3}>Meals</Title>
        {calories && <Text fw={900}>{calories} calories</Text>}
      </Flex>
      <Button onClick={handleGeneration}>Generate meal</Button>
      <Title>Meal:</Title>
    </Box>
  );
}
