import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../store';
import {getPhotosThunk, selectPhotos} from '../../store/slices/photos';
import {useSelector} from 'react-redux';
import {Photo} from '../../types/photo';
import {PhotoComponent} from '../../components/photoComponent';
import {StatusOfRequestEnum} from '../../types/statusOfRequestEnum';
import {ClearSVG} from '../../components/svg/clear';
import {EmptyTitle} from '../../components/emptyTitle';

export const ListOfPhotos = () => {
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
    return `list-of-photos-${item.id}`;
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
      {sortedData.length === 0 && <EmptyTitle />}
      {status === StatusOfRequestEnum.ERROR && (
        <EmptyTitle text={error || undefined} />
      )}
      {status === StatusOfRequestEnum.LOADING && sortedData.length === 0 && (
        <EmptyTitle text="Loading..." />
      )}
      <FlatList
        contentContainerStyle={styles.flatContainer}
        style={styles.flat}
        keyExtractor={keyExtractor}
        data={sortedData}
        renderItem={item => (
          <PhotoComponent
            id={item.item.id}
            title={item.item.title}
            navigate={navigate}
          />
        )}
        refreshing={status === StatusOfRequestEnum.LOADING}
        onRefresh={() => dispatch(getPhotosThunk)}
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
  flat: {flex: 1, width: '100%'},
  flatContainer: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: 10,
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
