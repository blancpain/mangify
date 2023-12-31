import * as React from 'react';
import { DateTime } from 'luxon';
import { useLocalStorage, useHotkeys } from '@mantine/hooks';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { Notifications } from '@mantine/notifications';
import { store } from '@/stores';

type AppProviderProps = {
  children: React.ReactNode;
};

// NOTE: we configure Luxon to use UTC to sync client and server dates
DateTime.local().setZone('utc');

export function AppProvider({ children }: AppProviderProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          breakpoints: {
            xs: '30em',
            sm: '48em',
            md: '64em',
            lg: '74em',
            xl: '90em',
          },
        }}
      >
        <Provider store={store}>{children}</Provider>
        <Notifications />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
