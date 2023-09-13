import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { signUpSchema, TSignUpSchema } from '@shared/types';
import { NavLink } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Box,
  Title,
  Container,
} from '@mantine/core';
import { GoogleButton, FacebookButton } from '@/components/Buttons';

export function SignUp(props: PaperProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  //! if reg not successful we stay at the same page and show error
  //! if it is succesful we navigate to Dashboard - use Navigate React Router?
  //! Make sure that clicking "back" once logged in doesn't break the app,
  //! in eatThisMuch once logged in clicking back just seems to refresh the page = nice feature, also the URL is "/"
  const onSubmit: SubmitHandler<TSignUpSchema> = async (data) => {
    console.log(data);

    // just for mocking purposes, add server stuff later
    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
  };

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
      <Title>Create your mangify account</Title>
      <Container size="xs" p="xl">
        <Paper radius="md" p="xl" withBorder {...props}>
          <Text size="xl" weight={500} align="center">
            Sign in with
          </Text>

          <Group grow mb="md" mt="md">
            <GoogleButton radius="xl">Google</GoogleButton>
            <FacebookButton radius="xl">Facebook</FacebookButton>
          </Group>

          <Divider label="Or register with email" labelPosition="center" my="lg" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextInput label="Name" placeholder="Your name" radius="md" {...field} />
                )}
              />
              {errors.name && <Text color="red" size="xs">{`${errors.name.message}`}</Text>}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextInput
                    label="Email"
                    placeholder="example@google.com"
                    radius="md"
                    {...field}
                  />
                )}
              />
              {errors.email && <Text color="red" size="xs">{`${errors.email.message}`}</Text>}
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    radius="md"
                    {...field}
                  />
                )}
              />
              {errors.password && <Text color="red" size="xs">{`${errors.password.message}`}</Text>}
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    label="Confirm password"
                    placeholder="Confirm your password"
                    radius="md"
                    {...field}
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text color="red" size="xs">{`${errors.confirmPassword.message}`}</Text>
              )}

              <Checkbox label="I accept the terms and conditions" />
            </Stack>

            <Group position="apart" mt="xl">
              <Anchor component={NavLink} to="/login" color="dimmed" size="xs">
                Already have an account? Login
              </Anchor>
              <Button type="submit" radius="xl" disabled={isSubmitting}>
                Register
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
