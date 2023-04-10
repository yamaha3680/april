import React, {useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootNavigationParams} from '../../navigationStack/navigationTypes';
import {useAppDispatch} from '../../store';
import {
  addLike,
  checkLikes,
  clearPhotoById,
  deleteLike,
  getPhotoByIdThunk,
  selectPhotoById,
} from '../../store/slices/photos';
import {useSelector} from 'react-redux';
import {EmptyTitle} from '../../components/emptyTitle';
import {StatusOfRequestEnum} from '../../types/statusOfRequestEnum';
import {ViewJSON} from '../../components/viewJSON';
import {HeartSVG} from '../../components/svg/heart';

export const PhotoDetails = () => {
  const dispatch = useAppDispatch();
  const {
    params: {id},
  } = useRoute<RouteProp<RootNavigationParams, 'PhotoDetails'>>();

  const {data, status, error} = useSelector(selectPhotoById(id));
  const isLiked = useSelector(checkLikes(id));

  useEffect(() => {
    dispatch(getPhotoByIdThunk(id));

    return () => {
      dispatch(clearPhotoById(id));
    };
  }, [dispatch, id]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.titleContainer}>
          <Text style={styles.id}>{id}</Text>
          <TouchableOpacity
            onPress={() => dispatch(isLiked ? deleteLike(id) : addLike(id))}>
            <HeartSVG
              height={40}
              width={40}
              color={isLiked ? 'red' : 'black'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>{data?.title}</Text>
        {status === StatusOfRequestEnum.ERROR && (
          <EmptyTitle text={error || undefined} />
        )}
        {status === StatusOfRequestEnum.LOADING && (
          <EmptyTitle text="Loading..." />
        )}
      </View>

      <ViewJSON value={data} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: 20,

    padding: 20,
  },
  topView: {
    display: 'flex',
    flexDirection: 'column',
    gap: 40,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  id: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});
