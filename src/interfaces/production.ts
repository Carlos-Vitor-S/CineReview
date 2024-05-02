import { Genre } from './genre';

export interface Production {
  id: number;
  title?: string;
  name?: string;
  original_name?: string;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
  vote_average: number;
  key?: string;
  genre_ids?: number;
  genre?: Genre;
}
