import { ProductionEnum } from '../enums/productionsEnum';

export interface Production {
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: Number;
}
