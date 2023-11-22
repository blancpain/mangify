import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme, rem, Container, Stack, Title } from '@mantine/core';
import { ShowCaseRecipe } from 'mangify-shared-types';
import { nanoid } from '@reduxjs/toolkit';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
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
    <Container pt={30} pb={30}>
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
          styles={{
            control: {
              marginTop: '35px',
              '&[data-inactive]': {
                opacity: 0,
                cursor: 'default',
              },
            },
          }}
          controlsOffset={mobile ? 5 : 20}
          breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: rem(2) }]}
          nextControlIcon={<IconArrowRight size={25} color="black" />}
          previousControlIcon={<IconArrowLeft size={25} color="black" />}
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
