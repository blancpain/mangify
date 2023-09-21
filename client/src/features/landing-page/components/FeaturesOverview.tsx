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
import { IconFlame, IconChecklist, IconShoppingCart } from '@tabler/icons-react';

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
    title: 'Multiple meal filters',
    description: 'Advanced filters to suit your particular eating habits and preferences',
  },
  {
    icon: IconShoppingCart,
    title: 'Grocery list',
    description: 'Automatically generate a grocery list based on planned meals',
  },
  {
    icon: IconFlame,
    title: 'Some other shit',
    description:
      'With new :focus-visible selector focus ring will appear only when user navigates with keyboard',
  },
  {
    icon: IconFlame,
    title: 'Flexible',
    description:
      'Customize colors, spacing, shadows, fonts and many other settings with global theme object',
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
    <Container size="lg" pt={50} pb={40}>
      <Grid
        gutter={80}
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
            Sign up today to explore all the benefits of mangify
          </Title>
          <Text c="dimmed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt dolore repellendus porro
            excepturi corrupti temporibus aliquam consectetur animi quam, recusandae quaerat natus
            dolorem aperiam expedita libero eveniet unde consequatur sed.
          </Text>

          <Stack>
            <Button variant="filled" color="green" size="lg" radius="md" mt="xl">
              Sign-up
            </Button>
            <span>
              Already have an account? <a href="#">Log in here</a>
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
