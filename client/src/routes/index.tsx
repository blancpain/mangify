import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAuthCheckMutation } from '@/features/api';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setUser, logout, selectUser } from '@/stores';

// public routes
import { PublicRoot } from './public/root';
import { Landing } from './public/landing';
import { SignUpRoute } from './public/sign-up';
import { LoginRoute } from './public/login';

// protected routes
import { PrivateRoot } from './protected/root';

// TODO Make sure that clicking "back" once logged in doesn't break the app!!!
// TODO in eatThisMuch once logged in clicking back just seems to refresh the page = nice feature, also the URL is "/"

//! consider moving below to a custom hook?
//! fix weird refresh issue...spinner while user is being fetched to show something else instead of flashing....

//! for testing:
//! lili@gmail.com / kotkata123456

export function AppRoutes() {
  const [authCheck, { isLoading }] = useAuthCheckMutation();
  const dispatch = useAppDispatch();
  const { name } = useAppSelector(selectUser);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const userData = await authCheck().unwrap();
        dispatch(setUser(userData));
      } catch (_err) {
        dispatch(logout());
      }
    };
    verifyUser();
  }, [authCheck, dispatch]);

  const protectedRoutes = createBrowserRouter([
    {
      path: '/',
      element: <PrivateRoot />,
      children: [
        {
          element: <p>Hello {name}!</p>,
          index: true,
        },
      ],
    },
  ]);

  const publicRoutes = createBrowserRouter([
    {
      path: '/',
      element: <PublicRoot />,
      children: [
        {
          element: <Landing />,
          index: true,
        },
        {
          element: <LoginRoute />,
          path: 'login',
        },
        {
          element: <SignUpRoute />,
          path: 'sign-up',
        },
      ],
    },
  ]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <RouterProvider router={name ? protectedRoutes : publicRoutes} />
  );
}
