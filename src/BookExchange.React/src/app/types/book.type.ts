import { Author, Category } from "app/types/index";

export type Book = {
  id: number;
  title: string;
  isbn: string;
  shortDescription: string;
  thumbnailPath: string;
  authors: Author[];
  categories: Category[];
  details: BookDetails;
};

export type BookDetails = {
  description: string;
  publisher: string;
  publishedYear?: number;
  pageCount?: number;
  imagePath: string;
};

export type CreateBook = {
  title: string;
  isbn: string;
  shortDescription: string;
  description: string;
  publisher: string;
  pageCount: number;
  publishedYear: number;
  authorsId: number[];
  categoriesId: number[];
  image: any;
};
