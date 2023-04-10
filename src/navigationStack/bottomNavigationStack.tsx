import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ListOfPhotos} from '../screens/listOfPhotosScreen';
import {BottomTabsParams} from './navigationTypes';
import {CameraSVG} from '../components/svg/camera';
import {FileSVG} from '../components/svg/file';

const BottomTabNavigator = createBottomTabNavigator<BottomTabsParams>();

export const BottomTabs = () => {
  return (
    <BottomTabNavigator.Navigator>
      <BottomTabNavigator.Screen
        name="Photos"
        component={ListOfPhotos}
        options={{
          tabBarIcon: ({color}) => <CameraSVG color={color} />,
        }}
      />
      <BottomTabNavigator.Screen
        name="Posts"
        component={ListOfPhotos}
        options={{
          tabBarIcon: ({color}) => <FileSVG color={color} />,
        }}
      />
    </BottomTabNavigator.Navigator>
  );
};
