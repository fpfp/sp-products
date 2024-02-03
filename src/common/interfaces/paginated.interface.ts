import { IPagination } from './pagination.interface';

export interface IPaginated<T> {
  data: T[];
  pagination: IPagination;
}
