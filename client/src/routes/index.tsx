import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAuth } from '@/hooks';

// public routes
import { PublicRoot, Landing, SignUpRoute, LoginRoute } from '@/routes/public';

// protected routes
import {
  DashboardLayout,
  MealPlannerRoute,
  MealSettingsRoute,
  NutritionSettingsRoute,
  UserSettingsRoute,
} from '@/routes/protected';

export function AppRoutes() {
  const { user, isLoading, isUninitialized } = useAuth();

  if (isLoading || isUninitialized) {
    return <> </>;
  }

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
        {
          element: <NutritionSettingsRoute />,
          path: 'nutrition-preferences',
        },
        {
          element: <UserSettingsRoute />,
          path: 'user-settings',
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

  const routesToRender = user ? protectedRoutes : publicRoutes;

  return <RouterProvider router={routesToRender} />;
}
