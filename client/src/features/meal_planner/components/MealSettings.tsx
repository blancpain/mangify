import { Title, Select, Space, Flex } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectMealSettings, setNumberOfMeals } from '@/stores';

export function MealSettings() {
  const { numberOfMeals } = useAppSelector(selectMealSettings);
  const dispatch = useAppDispatch();

  return (
    <>
      <Title order={1}>Meal planner settings</Title>
      <Space h="xl" />
      <Space h="xl" />
      <Flex justify="space-between">
        <Title order={4}>Number of meals per day</Title>
        <Select
          value={numberOfMeals.toString()}
          onChange={(val) => dispatch(setNumberOfMeals(val as string))}
          data={[
            { value: '2', label: 'Two' },
            { value: '3', label: 'Three' },
            { value: '4', label: 'Four' },
          ]}
        />
      </Flex>
    </>
  );
}
