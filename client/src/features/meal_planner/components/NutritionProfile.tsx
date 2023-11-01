import { Button, Center, Flex, Title } from '@mantine/core';
import { nanoid } from '@reduxjs/toolkit';
import { NavLink } from 'react-router-dom';
import { selectUser } from '@/stores';
import { useAppSelector } from '@/hooks';
import { PieChart } from '@/components';

export function NutritionProfile() {
  const { profile } = useAppSelector(selectUser);

  return (
    <>
      {profile.calories && (
        <PieChart
          title="Your nutrition profile"
          calories={profile.calories}
          fats={profile.fats}
          protein={profile.protein}
          key={nanoid()}
          carbs={profile.carbs}
        />
      )}
      {!profile.calories && (
        <Center h="50vh">
          <Flex direction="column" gap={40} align="center">
            <Title align="center"> Please complete your profile to see your macros </Title>
            <Button w="50%" color="teal" variant="filled" component={NavLink} to="/user-settings">
              Click here
            </Button>
          </Flex>
        </Center>
      )}
    </>
  );
}
