import { IProds } from './IProds';

export interface IPagination {
  per_page: number;
  total: number;
  current_page: number;
  data: IProds[];
}
