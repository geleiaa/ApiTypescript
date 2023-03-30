import { IUsers } from './IUsers';

export interface IPagination {
  per_page: number;
  total: number;
  current_page: number;
  users: IUsers[];
}
