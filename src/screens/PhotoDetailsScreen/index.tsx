import React, {useEffect} from 'react';
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
import {EmptyTitle} from '../../components/EmptyTitle';
import {StatusOfRequestEnum} from '../../types/statusOfRequestEnum';
import {ViewJSON} from '../../components/ViewJSON';
import {HeartSVG} from '../../components/svg/Heart';
import normalize from 'react-native-normalize';

export const PhotoDetailsScreen = () => {
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
              height={normalize(40)}
              width={normalize(40)}
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
    gap: normalize(20),

    paddingVertical: normalize(40),
    paddingHorizontal: normalize(20),
  },
  topView: {
    display: 'flex',
    flexDirection: 'column',
    gap: normalize(40),
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  id: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    fontSize: normalize(20),
    color: 'black',
  },
});
