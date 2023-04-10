import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../store';
import {getPhotosThunk, selectPhotos} from '../../store/slices/photos';
import {useSelector} from 'react-redux';
import {Photo} from '../../types/photo';
import {ClearSVG} from '../../components/svg/Clear';
import {ViewPhotoList} from '../../components/ViewPhotoList';
import normalize from 'react-native-normalize';

export const PhotosScreen = () => {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const {navigate} = useNavigation();

  const [sortString, setSortString] = useState('');

  const {data, status, error} = useSelector(selectPhotos);

  const sortedData = useMemo(() => {
    return data.filter(item => item.title.includes(sortString));
  }, [data, sortString]);

  useEffect(() => {
    dispatch(getPhotosThunk());
  }, [dispatch, isFocused]);

  const keyExtractor = useCallback((item: Photo) => {
    return `photos-${item.id}`;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={sortString}
          onChangeText={setSortString}
        />
        {sortString !== '' && (
          <TouchableOpacity onPress={() => setSortString('')}>
            <ClearSVG height={normalize(20)} width={normalize(20)} />
          </TouchableOpacity>
        )}
      </View>
      <ViewPhotoList
        error={error}
        status={status}
        navigate={navigate}
        keyExtractor={keyExtractor}
        data={sortedData}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: normalize(20),

    paddingTop: normalize(40),
    paddingHorizontal: normalize(20),
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    height: normalize(40),

    paddingHorizontal: normalize(12),

    backgroundColor: '#e5e4e4',
    borderRadius: normalize(8),
  },
  input: {
    flex: 1,

    fontSize: normalize(16),
    color: 'black',
  },
});
