import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
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
  getPhotoById: Record<
    number,
    | {
        status: StatusOfRequestEnum;
        error: string | null;
        data: Photo | null;
      }
    | undefined
  >;
  likedPhotos: Record<number, true>;
}

const initialState: PhotosSlice = {
  getPhotos: {
    status: StatusOfRequestEnum.IDLE,
    error: null,
    data: [],
  },
  getPhotoById: {},
  likedPhotos: {},
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

export const getPhotoByIdThunk = createAsyncThunk<
  Photo,
  number,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'photoById/getPhotosThunk',
  async (id, thunkAPI) => {
    try {
      const {data} = await axiosInstance.get(`/photos/${id}`);

      if (!isPhoto(data)) {
        return thunkAPI.rejectWithValue('Not valid data');
      }

      return data;
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

export const photosSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    clearPhotoById: (state, action: PayloadAction<number>) => {
      delete state.getPhotoById[action.payload];
    },

    addLike: (state, action: PayloadAction<number>) => {
      state.likedPhotos[action.payload] = true;
    },
    deleteLike: (state, action: PayloadAction<number>) => {
      delete state.likedPhotos[action.payload];
    },
  },
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

    builder
      .addCase(getPhotoByIdThunk.pending, (state, action) => {
        state.getPhotoById = {
          ...state.getPhotoById,
          [action.meta.arg]: {
            data: null,
            status: StatusOfRequestEnum.LOADING,
            error: null,
          },
        };
      })
      .addCase(getPhotoByIdThunk.fulfilled, (state, action) => {
        state.getPhotoById = {
          ...state.getPhotoById,
          [action.meta.arg]: {
            data: action.payload,
            status: StatusOfRequestEnum.SUCCESS,
            error: null,
          },
        };
      })
      .addCase(getPhotoByIdThunk.rejected, (state, action) => {
        state.getPhotoById = {
          ...state.getPhotoById,
          [action.meta.arg]: {
            data: null,
            status: StatusOfRequestEnum.ERROR,
            error: action.payload || 'Unknown error',
          },
        };
      });
  },
});

export const {clearPhotoById, addLike, deleteLike} = photosSlice.actions;

const selfSelector = (state: RootState) => state.photos;

export const selectPhotos = createSelector(
  selfSelector,
  state => state.getPhotos,
);

export const selectPhotoById = (id: number) =>
  createSelector(selfSelector, state => {
    if (id in state.getPhotoById) {
      if (state.getPhotoById[id]) {
        return state.getPhotoById[id] as {
          data: Photo | null;
          status: StatusOfRequestEnum;
          error: string | null;
        };
      }
    }

    return {
      data: null,
      status: StatusOfRequestEnum.IDLE,
      error: null,
    };
  });

export const checkLikes = (id: number) =>
  createSelector(selfSelector, state => id in state.likedPhotos);
