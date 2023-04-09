import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import React from 'react';

type rootNavigationParams = {
  ListOfPhotos: undefined;
  PhotoDetails: {id: number};
};

const RootNavigationStack = createNativeStackNavigator<rootNavigationParams>();

const ListOfPhotos = () => {
  console.log('LIST');
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'red'}}>Home Screen</Text>
    </View>
  );
};
const PhotoDetails = () => {
  console.log('Details');
  return <Text>photoDetails</Text>;
};

export const RootNavigation = () => {
  return (
    <RootNavigationStack.Navigator initialRouteName="ListOfPhotos">
      <RootNavigationStack.Screen
        name="ListOfPhotos"
        component={ListOfPhotos}
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
