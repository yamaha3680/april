import {number, object, string} from 'yup';

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const photoSchema = object<Photo>({
  albumId: number().required(),
  id: number().required(),
  title: string().required(),
  url: string().url().required(),
  thumbnailUrl: string().url().required(),
});

export const isPhoto = (item: unknown): item is Photo =>
  photoSchema.isValidSync(item);
