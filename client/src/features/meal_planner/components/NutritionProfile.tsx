import { Box, Title } from '@mantine/core';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // NOTE: needed when using chartjs w/ react
import { selectUser } from '@/stores';
import { useAppSelector } from '@/hooks';

export function NutritionProfile() {
  const { profile } = useAppSelector(selectUser);

  return (
    <>
      {profile.calories && (
        <>
          <Title order={1} mb={20}>
            Nutrition Profile
          </Title>
          <Title order={2} mb={20}>
            Daily calories: {profile.calories}
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
                    data: [profile.protein, profile.carbs, profile.fats],
                    backgroundColor: ['rgb(213, 45, 183)', 'rgb(96, 80, 220)', 'rgb(255, 107, 69)'],
                    hoverOffset: 0,
                  },
                ],
              }}
            />
          </Box>
        </>
      )}
      {!profile.calories && <Title>Please fill out your profile - click here...</Title>}
    </>
  );
}
