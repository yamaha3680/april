import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ListOfPhotos} from '../screens/listOfPhotosScreen';
import {BottomTabsParams} from './navigationTypes';

const BottomTabNavigator = createBottomTabNavigator<BottomTabsParams>();

export const BottomTabs = () => {
  return (
    <BottomTabNavigator.Navigator>
      <BottomTabNavigator.Screen name="Photos" component={ListOfPhotos} />
      <BottomTabNavigator.Screen name="Posts" component={ListOfPhotos} />
    </BottomTabNavigator.Navigator>
  );
};
