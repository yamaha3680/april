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
import {StatusOfRequestEnum} from '../../types/statusOfRequestEnum';
import {ClearSVG} from '../../components/svg/clear';
import {EmptyTitle} from '../../components/emptyTitle';
import {ViewPhotoList} from '../../components/viewPhotoList';

export const Photos = () => {
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
            <ClearSVG height={20} width={20} />
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
    gap: 20,

    paddingTop: 20,
    paddingHorizontal: 20,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 12,

    backgroundColor: '#e5e4e4',
    borderRadius: 8,
  },
  input: {
    flex: 1,

    fontSize: 16,
    color: 'black',
  },
});
