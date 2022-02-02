import { PaginationFilter } from "./pagination.fitler";

export interface BooksFilter extends PaginationFilter {
  [key: string]: any;

  includeDetails?: boolean;
  includeAuthors?: boolean;
  includeCategories?: boolean;
  includeWishedBy?: boolean;

  isbn: string;
  title: string;
  publisher: string;
  description: string;
  publishedYear?: number;
  PageCount?: number;
  minPageCount?: number;
  maxPageCount?: number;

  //TODO: authors and categories
}