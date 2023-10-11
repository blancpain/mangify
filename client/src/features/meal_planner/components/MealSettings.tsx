import { Title, Select, Space, Flex } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectUser, setNumberOfMeals } from '@/stores';
import { useSetNumberOfMealsMutation } from '@/features/api';

export function MealSettings() {
  const { profile } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [setUserNumberOfMeals] = useSetNumberOfMealsMutation();

  const handleNumberOfMealsInput = async (val: string) => {
    dispatch(setNumberOfMeals(Number(val)));
    await setUserNumberOfMeals({ numberOfMeals: Number(val) });
  };

  return (
    <>
      <Title order={1}>Meal planner settings</Title>
      <Space h="xl" />
      <Space h="xl" />
      <Flex justify="space-between">
        <Title order={4}>Number of meals per day</Title>
        <Select
          value={profile.meals_per_day.toString()}
          onChange={handleNumberOfMealsInput}
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
