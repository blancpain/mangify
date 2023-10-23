import { Container, Flex, Title } from '@mantine/core';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // NOTE: needed when using chartjs w/ react

type PieChartProps = {
  calories: number | null;
  title: string;
  protein: number | null;
  carbs: number | null;
  fats: number | null;
};

export function PieChart({ title, calories, protein, carbs, fats }: PieChartProps) {
  return (
    <Flex direction="column" gap="md" align="center">
      <Title order={2}>{title}</Title>
      <Container>
        <Pie
          options={{
            responsive: true,
            elements: {
              arc: {
                borderColor: 'rgba(0,0,0,0)',
              },
            },
            plugins: {
              tooltip: {
                enabled: true,
              },
              legend: {
                position: 'bottom',
                display: true,
                labels: {
                  padding: 10,
                  textAlign: 'center',
                  font: {
                    weight: 'bold',
                    family: 'Arial',
                    size: 14,
                  },
                },
              },
            },
          }}
          data={{
            labels: ['Protein', 'Carbs', 'Fats'],
            datasets: [
              {
                data: [protein, carbs, fats],
                backgroundColor: ['#bc5090', '#003f5c', '#ffa600'],
                hoverOffset: 0,
              },
            ],
          }}
        />
      </Container>
      {calories && <Title order={3}>Calories: {calories}</Title>}
    </Flex>
  );
}
