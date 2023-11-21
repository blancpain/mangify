import { NavLink, useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  // Divider,
  Anchor,
  Stack,
  Container,
  Box,
  Title,
  // Flex,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { loginSchema, TLoginSchema } from '@/types';
// import { GoogleButton, FacebookButton } from '@/components/Buttons';
import { useLoginMutation } from '@/features/api';
import { isFetchBaseQueryError, isErrorWithMessage } from '@/utils';
import { useAppDispatch } from '@/hooks';
import { setUser } from '@/stores';

// NOTE: social login is not implemented yet hence the commented code; planned for future release

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

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
    setGenericError('');
    try {
      const userData = await login(data).unwrap();
      dispatch(setUser(userData));
      navigate('/', { replace: true });
      reset();
      notifications.show({
        id: 'login',
        icon: <IconCheck size="1rem" />,
        title: 'Login successful!',
        color: 'teal',
        message: '',
        autoClose: 3000,
      });
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
        gap: '1rem',
      }}
      component="main"
    >
      <Title>Sign in</Title>
      <Container p="xl" m="xl">
        <Paper
          radius="md"
          p="xl"
          withBorder
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        >
          {/* <Text size="xl" weight={500} align="center" pb={30}> */}
          {/*   Sign in with */}
          {/* </Text> */}

          {/* <Flex mb="md" mt="md" gap="lg"> */}
          {/*   <GoogleButton radius="xl" disabled> */}
          {/*     Google */}
          {/*   </GoogleButton> */}
          {/*   <FacebookButton radius="xl" disabled> */}
          {/*     Facebook */}
          {/*   </FacebookButton> */}
          {/* </Flex> */}

          {/* <Divider label="Or continue with email" labelPosition="center" my="lg" /> */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextInput
                    id="email"
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
                    id="password"
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
              <Button type="submit" radius="xl" id="login-button" disabled={isSubmitting}>
                Login
              </Button>
            </Group>
          </form>
          {genericError !== '' ? (
            <Text color="red" size="md" mt={10} id="form-error">{`${genericError}`}</Text>
          ) : (
            ''
          )}
        </Paper>
      </Container>
    </Box>
  );
}
