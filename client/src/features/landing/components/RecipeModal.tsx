import { ShowCaseRecipe } from '@shared/types';
import { Modal, Button, Group, createStyles, List, Grid, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { nanoid } from '@reduxjs/toolkit';

const useStyles = createStyles(() => ({
  seeRecipeBtn: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
}));

type Props = { recipe: ShowCaseRecipe };

export function RecipeModal({ recipe }: Props) {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const recipeSteps = recipe.steps
    ? recipe.steps.map((step) => <li key={nanoid()}>{step}</li>)
    : '';
  const ingredients = recipe.extendedIngredients?.map((ingredient) => {
    const firstLetter = ingredient.charAt(0).toUpperCase();
    const restOfWord = ingredient.slice(1).toLowerCase();
    const fullIngredientName = firstLetter + restOfWord;
    return <List.Item key={nanoid()}>{fullIngredientName}</List.Item>;
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="auto"
        title={
          <Text size="xl" weight={900} pl={20}>
            {recipe.title}
          </Text>
        }
      >
        <Grid pl={20} pr={20}>
          <Grid.Col md={5} lg={6}>
            <h5>Ingredients:</h5>
            <List>{ingredients}</List>
          </Grid.Col>
          <Grid.Col md={5} lg={6}>
            <h5>Cooking instructions:</h5>
            <ol style={{ padding: '0px' }}>{recipeSteps}</ol>
          </Grid.Col>
        </Grid>
      </Modal>
      <Group position="center">
        <Button variant="white" color="dark" onClick={open} className={classes.seeRecipeBtn}>
          See recipe
        </Button>
      </Group>
    </>
  );
}
