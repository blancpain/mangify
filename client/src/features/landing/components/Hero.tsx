import { HashLink } from 'react-router-hash-link';
import { createStyles, Overlay, Container, Title, Button, Text, rem } from '@mantine/core';
import { heroBG } from '@/assets';

const useStyles = createStyles((theme) => ({
  hero: {
    position: 'relative',
    backgroundImage: `url(${heroBG})`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    backgroundPosition: '55% 40%',

    [theme.fn.smallerThan('sm')]: {
      backgroundPosition: 'left',
      backgroundSize: 'cover',
    },
  },

  container: {
    height: rem(650),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: `calc(${theme.spacing.xl} * 6)`,
    zIndex: 1,
    position: 'relative',
    marginRight: 15,

    [theme.fn.smallerThan('sm')]: {
      height: rem(450),
      paddingBottom: `calc(${theme.spacing.xl} * 3)`,
      marginRight: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },

  title: {
    color: theme.white,
    fontSize: rem(60),
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(40),
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },
}));

//! Photo by <a href="https://unsplash.com/@louishansel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Louis Hansel</a> on <a href="https://unsplash.com/photos/phEaeqe555M?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
//! check https://mantine.dev/core/aspect-ratio/ for image

export function Hero() {
  const { classes } = useStyles();

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        <Title className={classes.title}>Plan. Shop. Cook. Eat.</Title>
        <Text className={classes.description} size="xl" mt="xl">
          Use this simple and free of charge meal planner to remove the hassle of constantly
          worrying about what to cook. This app can help you gain control of your life by suggesting
          easy, nutrutious meals that fit your needs and turning them into shopping lists and
          recipes.
        </Text>
        <Button
          color="green"
          size="xl"
          radius="xl"
          className={classes.control}
          component={HashLink}
          to="/#meal-generator"
          scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          Try it out!
        </Button>
      </Container>
    </div>
  );
}
