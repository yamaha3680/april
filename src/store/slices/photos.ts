import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {isAxiosError} from 'axios';
import {RootState} from '../index';
import {axiosInstance} from '../../axiosInstance';
import {isPhoto, Photo} from '../../types/photo';
import {StatusOfRequestEnum} from '../../types/statusOfRequestEnum';

interface PhotosSlice {
  getPhotos: {
    status: StatusOfRequestEnum;
    error: string | null;
    data: Photo[];
  };
}

const initialState: PhotosSlice = {
  getPhotos: {
    status: StatusOfRequestEnum.IDLE,
    error: null,
    data: [],
  },
};

export const getPhotosThunk = createAsyncThunk<
  Photo[],
  undefined,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'photos/getPhotosThunk',
  async (_, thunkAPI) => {
    try {
      const {data} = await axiosInstance.get('/albums/1/photos');

      if (!Array.isArray(data)) {
        return thunkAPI.rejectWithValue('Not valid data');
      }

      return data.filter(isPhoto) as Photo[];
    } catch (e) {
      if (isAxiosError(e)) {
        return thunkAPI.rejectWithValue(e.message);
      }
      return thunkAPI.rejectWithValue('Unknown error');
    }
  },
  {
    condition: (_, {getState}) =>
      getState().photos.getPhotos.status !== StatusOfRequestEnum.LOADING,
  },
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPhotosThunk.pending, state => {
        state.getPhotos.status = StatusOfRequestEnum.SUCCESS;
        state.getPhotos.error = null;
      })
      .addCase(getPhotosThunk.fulfilled, (state, action) => {
        state.getPhotos.data = action.payload;
        state.getPhotos.status = StatusOfRequestEnum.SUCCESS;
        state.getPhotos.error = null;
      })
      .addCase(getPhotosThunk.rejected, (state, action) => {
        state.getPhotos.data = [];
        state.getPhotos.status = StatusOfRequestEnum.ERROR;
        state.getPhotos.error = action.payload || 'Unknown error';
      });
  },
});
