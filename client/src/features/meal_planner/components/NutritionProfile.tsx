import { Title } from '@mantine/core';
import { nanoid } from '@reduxjs/toolkit';
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
      {!profile.calories && <Title>Please fill out your profile - click here...</Title>}
    </>
  );
}
