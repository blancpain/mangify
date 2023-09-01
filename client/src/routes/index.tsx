import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './root';
import { Landing } from './landing';
import { SignUpRoute } from './sign-up';
import { LoginRoute } from './login';

export function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
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

  return <RouterProvider router={router} />;
}
