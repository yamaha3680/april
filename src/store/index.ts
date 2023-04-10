import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {photosSlice} from './slices/photos';

export const store = configureStore({
  reducer: {
    photos: photosSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
