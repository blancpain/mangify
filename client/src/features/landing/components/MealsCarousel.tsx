import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme, rem, Container, Stack, Title } from '@mantine/core';
import { ShowCaseRecipe } from '@shared/types';
import { nanoid } from '@reduxjs/toolkit';
import { Meal } from './Meal';

type Props = {
  recipes: ShowCaseRecipe[];
};

export function MealsCarousel({ recipes }: Props) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = recipes.map((recipe) => (
    <Carousel.Slide key={nanoid()}>
      <Meal recipe={recipe} />
    </Carousel.Slide>
  ));

  return (
    <Container size="lg" pt={30} pb={30}>
      <Stack>
        <Title
          align="center"
          pb={40}
          sx={() => ({
            '@media (max-width: 40em)': {
              fontSize: rem(20),
            },
          })}
        >
          Your sample meals are ready, check them out below...
        </Title>
        <Carousel
          slideSize="50%"
          breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: rem(2) }]}
          slideGap="xl"
          align={recipes.length === 1 ? 'center' : 'start'}
          slidesToScroll={mobile ? 1 : 2}
        >
          {slides}
        </Carousel>
      </Stack>
    </Container>
  );
}
