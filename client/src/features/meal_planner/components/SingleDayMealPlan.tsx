import { Box, Flex, Text, Title } from '@mantine/core';

type SingleDayMealPlanProps = {
  day: string;
  calories: number | null;
};

export function SingleDayMealPlan({ day, calories }: SingleDayMealPlanProps) {
  const today =
    day ===
    new Date().toLocaleDateString(undefined, { weekday: 'long', day: '2-digit', month: 'long' });
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
