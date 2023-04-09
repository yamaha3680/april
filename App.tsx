import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {RootNavigation} from './src/navigationStack/rootNavigationStack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar />
          <RootNavigation />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
