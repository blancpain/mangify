import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './root';

export default function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
    },
  ]);

  return <RouterProvider router={router} />;
}
