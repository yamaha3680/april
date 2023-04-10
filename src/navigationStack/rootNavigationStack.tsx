import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {BottomTabs} from './bottomNavigationStack';
import {RootNavigationParams} from './navigationTypes';
import {PhotoDetails} from '../screens/photoDetails';

const RootNavigationStack = createNativeStackNavigator<RootNavigationParams>();

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
