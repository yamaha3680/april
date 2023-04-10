import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {FC, useCallback} from 'react';
import {Photo} from '../../types/photo';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootNavigationParams} from '../../navigationStack/navigationTypes';

type PhotoComponentProps = Pick<Photo, 'id' | 'title'> &
  Pick<NativeStackNavigationProp<RootNavigationParams>, 'navigate'>;

export const PhotoComponent: FC<PhotoComponentProps> = ({
  id,
  title,
  navigate,
}) => {
  const navCallback = useCallback(() => {
    navigate('PhotoDetails', {id: id});
  }, [id, navigate]);

  return (
    <TouchableOpacity style={styles.container} onPress={navCallback}>
      <Text style={styles.id}>{id}</Text>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,

    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,

    paddingHorizontal: 16,

    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#6e6e6e',
    borderRadius: 8,
  },
  id: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    flex: 1,
    color: 'black',
    fontSize: 16,
  },
});
