export interface Paginated<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    size: number;
    nextPage: number | null;
    prevPage: number | null;
  };
}
