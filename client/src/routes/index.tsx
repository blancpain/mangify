import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAuthCheckMutation } from '@/features/api';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setUser, selectUser, logout } from '@/stores';

// public routes
import { PublicRoot, Landing, SignUpRoute, LoginRoute } from '@/routes/public';

// protected routes
import { DashboardLayout, MealPlannerRoute, MealSettingsRoute } from '@/routes/protected';

//! for testing: lili@gmail.com / kotkata123456

export function AppRoutes() {
  const [authCheck, { isLoading, isUninitialized }] = useAuthCheckMutation();
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
      element: <DashboardLayout />,
      children: [
        {
          element: <MealPlannerRoute />,
          index: true,
        },
        {
          element: <MealSettingsRoute />,
          path: 'meal-settings',
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

  return isLoading || isUninitialized ? (
    <> </>
  ) : (
    <RouterProvider router={name ? protectedRoutes : publicRoutes} />
  );
}
