import { Flex, Title, Button } from '@mantine/core';
import { IconReload } from '@tabler/icons-react';

type MealPlanHeaderProps = {
  handleGeneration: () => void;
  date: string;
};
export function MealPlanHeader({ handleGeneration, date }: MealPlanHeaderProps) {
  return (
    <Flex
      mb={30}
      align={{ base: 'center', md: 'start' }}
      justify="space-between"
      direction={{ base: 'column', md: 'row' }}
    >
      <Title order={2} mb="md" align="center">
        {date}
      </Title>
      <Button
        id="generate-meals"
        leftIcon={<IconReload />}
        onClick={handleGeneration}
        color="teal"
        size="md"
      >
        Generate
      </Button>
    </Flex>
  );
}
