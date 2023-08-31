import { zodResolver } from '@hookform/resolvers/zod';
import { createStyles, rem, Select, Flex, Button, Text, Title } from '@mantine/core';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { MealGeneratorLandingSchema, TMealGeneratorLandingSchema } from '@shared/types';
import { useState } from 'react';
import { MealsCarousel } from './MealsCarousel';
import { FeaturesOverview } from './FeaturesOverview';

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

export function MealGenerator() {
  //! below state just for testing purposes
  const [showCarousel, setShowCarousel] = useState(false);
  const { classes } = useStyles();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TMealGeneratorLandingSchema>({
    defaultValues: {
      meals: '',
      diet: '',
    },
    resolver: zodResolver(MealGeneratorLandingSchema),
  });

  const onSubmit: SubmitHandler<TMealGeneratorLandingSchema> = (data) => {
    console.log(data);
    setShowCarousel(true);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={50} justify="center" align="center" p={50}>
          <Controller
            name="meals"
            control={control}
            render={({ field }) => (
              <Select
                mt="md"
                withinPortal
                data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                placeholder="Select"
                label="Meals"
                classNames={classes}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...field}
              />
            )}
          />
          {errors.meals && <Text color="red">{`${errors.meals.message}`}</Text>}
          <Controller
            name="diet"
            control={control}
            render={({ field }) => (
              <Select
                mt="md"
                withinPortal
                data={['vegetarian', 'meat', 'vegan']}
                placeholder="Pick one"
                label="Diet"
                classNames={classes}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...field}
              />
            )}
          />
        </Flex>
        <Flex justify="center" p={10} mb={10} pt={0}>
          <Button color="green" size="xl" radius="xl" type="submit">
            Generate
          </Button>
        </Flex>
      </form>
      {showCarousel && (
        <>
          <MealsCarousel />
          <Title align="center" pt={50} fw={900}>
            Want to see more?
          </Title>
          <FeaturesOverview />
        </>
      )}
    </>
  );
}
