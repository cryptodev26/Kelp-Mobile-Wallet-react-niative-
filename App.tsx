import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider } from './hooks/useAuth';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { MarketingProvider } from './hooks/useMarketing';
import { WalletProvider } from './hooks/useWallet';
import Navigation from './navigation';
import { default as CustomMapping } from './theme/custom-mapping.json';
import { default as CustomTheme } from './theme/custom-theme.json';

const queryClient = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AuthProvider>
        <MarketingProvider>
          <WalletProvider>
            <QueryClientProvider client={queryClient}>
              <IconRegistry icons={EvaIconsPack} />
              <RootSiblingParent>
                <ApplicationProvider
                  {...eva}
                  customMapping={CustomMapping}
                  theme={{ ...eva.dark, ...CustomTheme }}>
                  <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                  </SafeAreaProvider>
                </ApplicationProvider>
              </RootSiblingParent>
            </QueryClientProvider>
          </WalletProvider>
        </MarketingProvider>
      </AuthProvider>
    );
  }
}
