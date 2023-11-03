import { Button, Center, Flex, SimpleGrid, Table, Title } from '@mantine/core';
import { nanoid } from '@reduxjs/toolkit';
import { NavLink } from 'react-router-dom';
import { selectUser } from '@/stores';
import { useAppSelector } from '@/hooks';
import { PieChart } from '@/components';

export function NutritionProfile() {
  const { profile } = useAppSelector(selectUser);

  const dataForTable = [
    { user: profile.calories, name: 'Calories' },
    { user: profile.protein, name: 'Protein' },
    { user: profile.fats, name: 'Fats' },
    { user: profile.carbs, name: 'Carbs' },
  ];

  const tableRows = dataForTable.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.user}</td>
    </tr>
  ));
  return (
    <>
      {profile.calories && (
        <SimpleGrid
          cols={2}
          spacing="xl"
          breakpoints={[
            { maxWidth: '72rem', cols: 2, spacing: 'md' },
            { maxWidth: '70rem', cols: 1, spacing: 'sm' },
            { maxWidth: '36rem', cols: 1, spacing: 'sm' },
          ]}
        >
          <Table highlightOnHover>
            <thead>
              <tr>
                <th> </th>
                <th style={{ textAlign: 'center' }}>Totals</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>{tableRows}</tbody>
          </Table>

          <PieChart
            title="Your nutrition profile"
            calories={profile.calories}
            fats={profile.fats}
            protein={profile.protein}
            key={nanoid()}
            carbs={profile.carbs}
          />
        </SimpleGrid>
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
