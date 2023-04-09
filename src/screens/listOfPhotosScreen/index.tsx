import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../store';
import {getPhotosThunk, selectPhotos} from '../../store/slices/photos';
import {useSelector} from 'react-redux';
import {Photo} from '../../types/photo';
import {PhotoComponent} from '../../components/photoComponent';

export const ListOfPhotos = () => {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const {navigate} = useNavigation();

  const {data} = useSelector(selectPhotos);

  useEffect(() => {
    dispatch(getPhotosThunk());
  }, [dispatch, isFocused]);

  const keyExtractor = useCallback((item: Photo) => {
    return `list-of-photos-${item.id}`;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatContainer}
        style={styles.flat}
        keyExtractor={keyExtractor}
        data={data}
        renderItem={item => (
          <PhotoComponent
            id={item.item.id}
            title={item.item.title}
            navigate={navigate}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  flat: {flex: 1, width: '100%'},
  flatContainer: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: 10,
    paddingHorizontal: 20,
  },
});
