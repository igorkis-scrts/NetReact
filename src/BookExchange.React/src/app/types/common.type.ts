export type PaginatedResult<T> = {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  data: T[];
};

export type PaginationFilter = {
  [key: string]: any;

  pageNumber?: number;
  pageSize?: number;
  sortDirection?: string;
  sortBy?: string;
};
