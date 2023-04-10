import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Photos} from '../screens/photosScreen';
import {BottomTabsParams} from './navigationTypes';
import {CameraSVG} from '../components/svg/camera';
import {HeartSVG} from '../components/svg/heart';
import {LikedPhotos} from '../screens/likedPhotos';

const BottomTabNavigator = createBottomTabNavigator<BottomTabsParams>();

export const BottomTabs = () => {
  return (
    <BottomTabNavigator.Navigator>
      <BottomTabNavigator.Screen
        name="Photos"
        component={Photos}
        options={{
          tabBarIcon: ({color}) => <CameraSVG color={color} />,
        }}
      />
      <BottomTabNavigator.Screen
        name="Liked"
        component={LikedPhotos}
        options={{
          tabBarIcon: ({color}) => <HeartSVG color={color} />,
        }}
      />
    </BottomTabNavigator.Navigator>
  );
};
