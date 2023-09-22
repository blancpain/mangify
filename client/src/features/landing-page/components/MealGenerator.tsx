import { zodResolver } from '@hookform/resolvers/zod';
import { createStyles, rem, Select, Flex, Button, Text, Title } from '@mantine/core';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  MealGeneratorLandingSchema,
  ShowCaseRecipe,
  TMealGeneratorLandingSchema,
} from '@shared/types';
import { useState } from 'react';
import { MealsCarousel } from './MealsCarousel';
import { FeaturesOverview } from './FeaturesOverview';
import { useGenerateShowcaseMealsMutation } from '@/features/api';
import { isFetchBaseQueryError, isErrorWithMessage } from '@/utils';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: rem(94),
    paddingTop: rem(30),
    width: '350px',

    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.lg,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    fontWeight: 900,
    zIndex: 1,

    [theme.fn.smallerThan('sm')]: {
      fontSize: theme.fontSizes.xs,
      fontWeight: 300,
    },
  },
}));

type RecipesList = null | ShowCaseRecipe[];
type LocalError = null | string;

export function MealGenerator() {
  const [recipes, setRecipes] = useState<RecipesList>(null);
  const [genericError, setGenericError] = useState<LocalError>(null);
  const [generateMeals] = useGenerateShowcaseMealsMutation();
  const { classes } = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TMealGeneratorLandingSchema>({
    defaultValues: {
      numberOfMeals: '',
      diet: '',
    },
    resolver: zodResolver(MealGeneratorLandingSchema),
  });

  const onSubmit: SubmitHandler<TMealGeneratorLandingSchema> = async (userInput) => {
    setGenericError(null);
    setRecipes(null);
    try {
      const fetchedRecipes = await generateMeals(userInput).unwrap();
      setRecipes(fetchedRecipes);
    } catch (error: unknown) {
      if (isFetchBaseQueryError(error)) {
        if (
          error.data &&
          typeof error.data === 'object' &&
          'errors' in error.data &&
          typeof error.data.errors === 'string'
        ) {
          setGenericError(error.data.errors);
        } else {
          setGenericError('Something went wrong. Please try again.');
        }
      } else if (isErrorWithMessage(error)) {
        setGenericError(error.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={50} justify="center" align="center" p={50}>
          <Controller
            name="numberOfMeals"
            control={control}
            render={({ field }) => (
              <Select
                mt="md"
                withinPortal
                data={['1', '2', '3', '4', '5']}
                placeholder="Select"
                label="Meals"
                classNames={classes}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...field}
              />
            )}
          />
          <Controller
            name="diet"
            control={control}
            render={({ field }) => (
              <Select
                mt="md"
                withinPortal
                data={['vegetarian', 'keto', 'vegan']}
                placeholder="Pick one or leave empty for any diet"
                label="Diet"
                classNames={classes}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...field}
              />
            )}
          />
        </Flex>
        <Flex justify="center" p={10} mb={10} pt={0}>
          <Button color="green" size="xl" radius="xl" type="submit" id="meal-generator">
            Generate
          </Button>
        </Flex>
      </form>
      {errors.numberOfMeals && (
        <Text color="red" align="center">{`${errors.numberOfMeals.message}`}</Text>
      )}
      {genericError && <Text color="red" align="center">{`${genericError}`}</Text>}
      {recipes && (
        <>
          <MealsCarousel recipes={recipes} />
          <Title align="center" pt={40} fw={900}>
            Want to see more?
          </Title>
          <FeaturesOverview />
        </>
      )}
    </>
  );
}
