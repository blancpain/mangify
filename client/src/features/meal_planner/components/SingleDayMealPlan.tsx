import { Box, Flex, Text, Title } from '@mantine/core';
import { NutritionMacros } from '@/types';

type SingleDayMealPlanProps = {
  day: string;
  calories: number;
  macros: NutritionMacros;
};

export function SingleDayMealPlan({ day, calories, macros }: SingleDayMealPlanProps) {
  const today =
    day ===
    new Date().toLocaleDateString(undefined, { weekday: 'long', day: '2-digit', month: 'long' });

  console.log(macros);

  return (
    <Box mt="md">
      <Title order={2} mb="md">
        {today ? 'Today' : day}
      </Title>
      <Flex align="center" justify="space-between">
        <Title order={3}>Meals</Title>
        {calories && <Text fw={900}>{calories} calories</Text>}
      </Flex>
      <p>Meals below...</p>
    </Box>
  );
}
