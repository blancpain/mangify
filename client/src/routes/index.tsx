import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './root';

export function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
    },
  ]);

  return <RouterProvider router={router} />;
}
