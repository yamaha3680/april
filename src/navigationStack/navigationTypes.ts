import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

export type BottomTabsParams = {
  Photos: undefined;
  Posts: undefined;
};

export type RootNavigationParams = {
  Home: BottomTabNavigationProp<BottomTabsParams>;
  PhotoDetails: {id: number};
};
