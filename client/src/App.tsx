import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes';

export function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
