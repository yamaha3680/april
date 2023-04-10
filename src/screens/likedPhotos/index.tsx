import {useSelector} from 'react-redux';
import {getPhotosThunk, selectLikedPhotos} from '../../store/slices/photos';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ViewPhotoList} from '../../components/viewPhotoList';
import React, {useCallback, useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../store';
import {Photo} from '../../types/photo';

export const LikedPhotos = () => {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const {navigate} = useNavigation();

  const {data, error, status} = useSelector(selectLikedPhotos);

  useEffect(() => {
    dispatch(getPhotosThunk());
  }, [dispatch, isFocused]);

  const keyExtractor = useCallback((item: Photo) => {
    return `liked-photos-${item.id}`;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ViewPhotoList
        error={error}
        status={status}
        navigate={navigate}
        keyExtractor={keyExtractor}
        data={data}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,

    paddingTop: 20,
    paddingHorizontal: 20,
  },
});
