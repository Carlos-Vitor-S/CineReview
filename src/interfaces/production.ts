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
  release_date?: string;
  first_air_date?: string;
  key?: string;
  genre_ids?: number;
}
