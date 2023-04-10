import React, {FC, memo} from 'react';
import {StatusOfRequestEnum} from '../../types/statusOfRequestEnum';
import {EmptyTitle} from '../EmptyTitle';
import {FlatList, StyleSheet} from 'react-native';
import {PhotoComponent} from '../PhotoComponent';
import {getPhotosThunk} from '../../store/slices/photos';
import {Photo} from '../../types/photo';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootNavigationParams} from '../../navigationStack/navigationTypes';
import {useAppDispatch} from '../../store';
import normalize from 'react-native-normalize';

type ViewPhotoListProps = {
  status: StatusOfRequestEnum;
  keyExtractor: (item: Photo) => string;
  error: string | null;
  data: Photo[];
} & Pick<NativeStackNavigationProp<RootNavigationParams>, 'navigate'>;

const ViewPhotoListComponent: FC<ViewPhotoListProps> = ({
  navigate,
  status,
  keyExtractor,
  error,
  data,
}) => {
  const dispatch = useAppDispatch();

  return (
    <>
      {status === StatusOfRequestEnum.ERROR && (
        <EmptyTitle text={error || undefined} />
      )}
      {status === StatusOfRequestEnum.LOADING && data.length === 0 && (
        <EmptyTitle text="Loading..." />
      )}
      <FlatList
        contentContainerStyle={styles.flatContainer}
        style={styles.flat}
        keyExtractor={keyExtractor}
        data={data}
        ListEmptyComponent={() => <EmptyTitle />}
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
    </>
  );
};

const styles = StyleSheet.create({
  flat: {flex: 1, width: '100%'},
  flatContainer: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: normalize(10),
  },
});

export const ViewPhotoList = memo(ViewPhotoListComponent);
