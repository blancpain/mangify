import { createStyles, Group, Text, rem, Box } from '@mantine/core';
import { nanoid } from '@reduxjs/toolkit';
import { NavLink } from 'react-router-dom';
import { Logo } from '@/components/Logo';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(135),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

interface FooterProps {
  links: { link: string; label: string }[];
}

export function Footer({ links }: FooterProps) {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Text component={NavLink} to={link.link} color="dimmed" key={nanoid()} size="sm">
      {link.label}
    </Text>
  ));

  return (
    <Box className={classes.footer} component="footer">
      <Box className={classes.inner}>
        <Logo />
        <Group className={classes.links}>{items}</Group>
      </Box>
    </Box>
  );
}
