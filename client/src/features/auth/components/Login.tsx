import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { loginSchema, TLoginSchema } from '@shared/types';
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
  Anchor,
  Stack,
  Container,
  Box,
  Title,
} from '@mantine/core';
import { GoogleButton, FacebookButton } from '@/components/Buttons';
import { useLoginMutation } from '@/features/api';
import { isFetchBaseQueryError, isErrorWithMessage } from '@/utils';

// TODO Make sure that clicking "back" once logged in doesn't break the app,
// TODO in eatThisMuch once logged in clicking back just seems to refresh the page = nice feature, also the URL is "/"
// TODO logging in should direct user to user dashboard and this becomes the new "/" ...

//! FOR testing: emaiL: wesdasd@adasd.com // pass: ashdkjahskdjhaskj123

export function Login(props: PaperProps) {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const [genericError, setGenericError] = useState('');

  const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
    setGenericError('');
    try {
      await login(data).unwrap();

      // todo change below to user-dashboard
      navigate('/');
      reset();
    } catch (error: unknown) {
      if (isFetchBaseQueryError(error)) {
        if (
          error.data &&
          typeof error.data === 'object' &&
          'errors' in error.data &&
          error.data.errors &&
          typeof error.data.errors === 'object'
        ) {
          const allErrors = error.data.errors;

          if ('email' in allErrors && typeof allErrors.email === 'string') {
            setError('email', { type: 'custom', message: allErrors.email });
          } else if ('password' in allErrors && typeof allErrors.password === 'string') {
            setError('password', { type: 'custom', message: allErrors.password });
          }
        } else if (
          error.data &&
          typeof error.data === 'object' &&
          'errors' in error.data &&
          typeof error.data.errors === 'string'
        ) {
          setGenericError(error.data.errors);
        } else {
          setGenericError('Something went wrong. Please try again');
        }
      } else if (isErrorWithMessage(error)) {
        setGenericError(error.message);
      }
    }
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
      <Title>Welcome back</Title>
      <Container size="xs" p="xl">
        <Paper
          radius="md"
          p="xl"
          withBorder
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        >
          <Text size="xl" weight={500} align="center">
            Sign in with
          </Text>

          <Group grow mb="md" mt="md">
            <GoogleButton radius="xl">Google</GoogleButton>
            <FacebookButton radius="xl">Facebook</FacebookButton>
          </Group>

          <Divider label="Or continue with email" labelPosition="center" my="lg" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextInput
                    label="Email"
                    placeholder="example@google.com"
                    radius="md"
                    // eslint-disable-next-line react/jsx-props-no-spreading
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
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...field}
                  />
                )}
              />
              {errors.password && <Text color="red" size="xs">{`${errors.password.message}`}</Text>}
            </Stack>

            <Group position="apart" mt="xl">
              <Anchor component={NavLink} to="/sign-up" color="dimmed" size="xs">
                No account? Register
              </Anchor>
              <Button type="submit" radius="xl" disabled={isSubmitting}>
                Login
              </Button>
            </Group>
          </form>
          {genericError !== '' ? (
            <Text color="red" size="md" mt={10}>{`${genericError}`}</Text>
          ) : (
            ''
          )}
        </Paper>
      </Container>
    </Box>
  );
}
