import {
  createStyles,
  Title,
  SimpleGrid,
  Text,
  Button,
  ThemeIcon,
  Grid,
  Col,
  rem,
  Stack,
  Container,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { IconChecklist, IconShoppingCart, IconChartPie3, IconChartBar } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(36),
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}));

const features = [
  {
    icon: IconChecklist,
    title: 'Personalized meal plans',
    description:
      'Create your own daily or weekly meal plan. Apply advanced meal searching filters to suit your particular eating habits and preferences',
  },
  {
    icon: IconShoppingCart,
    title: 'Shopping list',
    description:
      'Generate shopping lists for your meals on the fly and never forget an ingredient again',
  },
  {
    icon: IconChartBar,
    title: 'Meal statistics',
    description:
      'Get a detailed overview for each meal, including calories, macronutrients, full ingredient amounts and more',
  },
  {
    icon: IconChartPie3,
    title: 'Personal macros',
    description:
      'Generate a personalised nutrition profile based on your goals, activity level and more',
  },
];

export function FeaturesOverview() {
  const { classes } = useStyles();

  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'green', to: 'cyan' }}
      >
        <feature.icon size={rem(26)} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <Container pt={50} pb={40}>
      <Grid
        sx={() => ({
          '@media (max-width: 40em)': {
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 0,
          },
        })}
      >
        <Col span={12} md={5}>
          <Title className={classes.title} order={2}>
            Sign up today to take advantage of all the benefits of mangify
          </Title>
          <Text c="dimmed">
            Becoming a member of mangify is <u>completely free</u> and only takes a few minutes.
            What are you waiting for? Sign up now!
          </Text>

          <Stack>
            <Button
              variant="filled"
              color="teal"
              size="lg"
              radius="md"
              mt="xl"
              component={NavLink}
              to="/sign-up"
            >
              Sign-up
            </Button>
            <span>
              Already have an account? <NavLink to="/login">Log in here</NavLink>
            </span>
          </Stack>
        </Col>
        <Col span={12} md={7}>
          <SimpleGrid cols={2} spacing={30} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
            {items}
          </SimpleGrid>
        </Col>
      </Grid>
    </Container>
  );
}
