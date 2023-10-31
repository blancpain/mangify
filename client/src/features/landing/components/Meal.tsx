import { createStyles, Text, Title, rem, Box, Paper, Flex } from '@mantine/core';
import { ShowCaseRecipe } from '@shared/types';
import { RecipeModal } from './RecipeModal';

// TODO:
// make sure we use a default image if no img provided
// maybe also have general fallbacks in case stuff is null/missing....

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(150),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.1,
    fontSize: rem(20),
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xl,
    maxHeight: '20px',
  },

  dishType: {
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },

  seeRecipeBtn: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
}));

type MealProps = {
  recipe: ShowCaseRecipe;
};

export function Meal({ recipe }: MealProps) {
  const { classes } = useStyles();

  return (
    <Box>
      <Flex direction="column" mb={40}>
        <Text className={classes.dishType} size="xs">
          {recipe.dishType ? recipe.dishType : 'Meal'}
        </Text>
        <Title className={classes.title}>{recipe.title}</Title>
      </Flex>
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        sx={{ backgroundImage: `url(${recipe.image})` }}
        className={classes.card}
      >
        <RecipeModal recipe={recipe} />
      </Paper>
    </Box>
  );
}
