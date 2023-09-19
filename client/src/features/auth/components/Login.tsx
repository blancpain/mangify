import { NavLink } from 'react-router-dom';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
  Container,
  Box,
  Title,
} from '@mantine/core';
import { GoogleButton, FacebookButton } from '@/components/Buttons';

//! Make sure that clicking "back" once logged in doesn't break the app,
//! in eatThisMuch once logged in clicking back just seems to refresh the page = nice feature, also the URL is "/"

export function Login(props: PaperProps) {
  return (
    <Box
      h="100vh"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '4rem',
        gap: '2rem',
      }}
      component="main"
    >
      <Title>Welcome back</Title>
      <Container size="xs" p="xl">
        <Paper radius="md" p="xl" withBorder {...props}>
          <Text size="xl" weight={500} align="center">
            Sign in with
          </Text>

          <Group grow mb="md" mt="md">
            <GoogleButton radius="xl">Google</GoogleButton>
            <FacebookButton radius="xl">Facebook</FacebookButton>
          </Group>

          <Divider label="Or continue with email" labelPosition="center" my="lg" />

          <form>
            <Stack>
              <TextInput required label="Email" placeholder="example@google.com" radius="md" />

              <PasswordInput required label="Password" placeholder="Your password" radius="md" />
            </Stack>

            <Group position="apart" mt="xl">
              <Anchor component={NavLink} to="/sign-up" color="dimmed" size="xs">
                Don't have an account? Register
              </Anchor>
              <Button type="submit" radius="xl">
                Login
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
