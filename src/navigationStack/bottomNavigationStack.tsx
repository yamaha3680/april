import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PhotosScreen} from '../screens/PhotosScreen';
import {BottomTabsParams} from './navigationTypes';
import {CameraSVG} from '../components/svg/Camera';
import {HeartSVG} from '../components/svg/Heart';
import {LikedPhotosScreen} from '../screens/LikedPhotosScreen';

const BottomTabNavigator = createBottomTabNavigator<BottomTabsParams>();

export const BottomTabs = () => {
  return (
    <BottomTabNavigator.Navigator>
      <BottomTabNavigator.Screen
        name="Photos"
        component={PhotosScreen}
        options={{
          tabBarIcon: ({color}) => <CameraSVG color={color} />,
        }}
      />
      <BottomTabNavigator.Screen
        name="Liked"
        component={LikedPhotosScreen}
        options={{
          tabBarIcon: ({color}) => <HeartSVG color={color} />,
        }}
      />
    </BottomTabNavigator.Navigator>
  );
};
