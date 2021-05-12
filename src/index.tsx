import 'reflect-metadata';
import 'react-native-get-random-values';

import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { AppearanceProvider } from 'react-native-appearance';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
// import { enableScreens } from 'react-native-screens';

import { registerRootComponent } from 'expo';
import * as SplashScreen from 'expo-splash-screen';

import { configureStore } from 'store';

import Root from 'container/Root';

SplashScreen.preventAutoHideAsync().catch(() => {});

// enableScreens();

const { store, persistor } = configureStore({});

const App = () => (
  <>

    {/* eslint-disable-next-line react/style-prop-object */}
    <AppearanceProvider>
      <Provider store={ store }>
        <SafeAreaProvider initialMetrics={ initialWindowMetrics }>
          <PersistGate loading={ null } persistor={ persistor }>
            { bootstrap => (bootstrap ? <Root /> : null) }
          </PersistGate>
        </SafeAreaProvider>
      </Provider>
    </AppearanceProvider>
  </>
);

registerRootComponent(App);
