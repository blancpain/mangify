import { useEffect } from 'react';
import { Box, Title } from '@mantine/core';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // NOTE: this is needed when using chartjs w/ react and useEffect
import { selectNutritionProfile, selectUser, setNutritionProfile } from '@/stores';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { calculateDailyIntake, calculateMacros, parseUserSettings } from '@/utils';

export function NutritionProfile() {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector(selectUser);

  useEffect(() => {
    const userNumbers = parseUserSettings(profile);

    if (userNumbers) {
      const totalCalories = calculateDailyIntake(userNumbers);
      if (totalCalories) {
        const userMacros = calculateMacros(userNumbers.weight, totalCalories);
        const finalNutritionProfile = {
          calories: Math.trunc(totalCalories),
          macros: userMacros,
        };
        dispatch(setNutritionProfile(finalNutritionProfile));
      }
    }
  }, [dispatch, profile]);

  const { calories, macros } = useAppSelector(selectNutritionProfile);

  return (
    <>
      <Title order={1} mb={20}>
        Nutrition Profile
      </Title>
      <Title order={2} mb={20}>
        Daily calories: {calories}
      </Title>
      <Box h={350}>
        <Pie
          options={{
            elements: {
              arc: {
                borderColor: '#E9ECEF',
              },
            },
            plugins: {
              legend: {
                labels: {
                  boxHeight: 10,
                  color: '#087F5B',
                },
              },
            },
          }}
          data={{
            labels: ['Protein', 'Carbs', 'Fats'],
            datasets: [
              {
                data: [macros?.protein, macros?.carbs, macros?.fats],
                backgroundColor: ['rgb(213, 45, 183)', 'rgb(96, 80, 220)', 'rgb(255, 107, 69)'],
                hoverOffset: 0,
              },
            ],
          }}
        />
      </Box>
    </>
  );
}
