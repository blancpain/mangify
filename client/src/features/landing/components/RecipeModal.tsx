import { ShowCaseRecipe } from '@shared/types';
import { Modal, Button, Group, createStyles, Title, List, Grid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

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
  const recipeSteps = recipe.steps?.map((step) => <li>{step}</li>);
  const ingredients = recipe.extendedIngredients?.map((ingredient) => {
    const firstLetter = ingredient.charAt(0).toUpperCase();
    const restOfWord = ingredient.slice(1).toLowerCase();
    const fullIngredientName = firstLetter + restOfWord;
    return <List.Item>{fullIngredientName}</List.Item>;
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        title={<Title order={3}>{recipe.title}</Title>}
      >
        <Grid gutter={40} pl={30} pr={30}>
          <Grid.Col span={6}>
            <h5>Ingredients:</h5>
            <List>{ingredients}</List>
          </Grid.Col>
          <Grid.Col span={6}>
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
