import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text} from 'react-native';
import React from 'react';
import {BottomTabs} from './bottomNavigationStack';
import {RootNavigationParams} from './navigationTypes';

const RootNavigationStack = createNativeStackNavigator<RootNavigationParams>();

const PhotoDetails = () => {
  return <Text>photoDetails</Text>;
};

export const RootNavigation = () => {
  return (
    <RootNavigationStack.Navigator initialRouteName="Home">
      <RootNavigationStack.Screen
        name="Home"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
      <RootNavigationStack.Screen
        name="PhotoDetails"
        component={PhotoDetails}
      />
    </RootNavigationStack.Navigator>
  );
};
