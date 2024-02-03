export interface IPagination {
  total: number;
  page: number;
  size: number;
  nextPage: number | null;
  prevPage: number | null;
}
