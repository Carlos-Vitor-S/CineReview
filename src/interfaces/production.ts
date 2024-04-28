export interface Production {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string;
  vote_average: number;
  key?: string;
  trailers?: { key: string }[];
}
