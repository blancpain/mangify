import { Flex, Title, Button } from '@mantine/core';
import { IconReload } from '@tabler/icons-react';

type MealPlanHeaderProps = {
  handleGeneration: () => void;
  date: string;
};
export function MealPlanHeader({ handleGeneration, date }: MealPlanHeaderProps) {
  return (
    <Flex mb={30} align="start" justify="space-between">
      <Title order={2} mb="md">
        {date}
      </Title>
      <Button leftIcon={<IconReload />} onClick={handleGeneration} color="teal" size="lg">
        Generate
      </Button>
    </Flex>
  );
}
