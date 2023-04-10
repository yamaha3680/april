import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

export type BottomTabsParams = {
  Photos: undefined;
  Liked: undefined;
};

export type RootNavigationParams = {
  Home: BottomTabNavigationProp<BottomTabsParams>;
  PhotoDetails: {id: number};
};
