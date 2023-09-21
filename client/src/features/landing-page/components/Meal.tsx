import { createStyles, Paper, Text, Title, rem, Box } from '@mantine/core';
import { ShowCaseRecipe } from '@shared/types';
import { RecipeModal } from './RecipeModal';

//! TODO figure out how to squeeze the food title in if a long title + image stuff - check mantine aspect ratio...
//! make sure we use a default image if no img provided
//! maybe also have general fallbacks in case stuff is null/missing....

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
    lineHeight: 1.2,
    fontSize: rem(25),
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
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

interface MealProps {
  recipe: ShowCaseRecipe;
}

export function Meal({ recipe }: MealProps) {
  const { classes } = useStyles();

  return (
    <Box>
      <div>
        <Text className={classes.dishType} size="xs">
          {recipe.dishType}
        </Text>
        <Title order={3} className={classes.title}>
          {recipe.title}
        </Title>
      </div>
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
