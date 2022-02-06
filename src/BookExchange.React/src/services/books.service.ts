import { Book, PaginatedResult } from "@app/types";

import { fetchApi } from "./fetchApi";

const GetBooksBySearch = async (searchTerm: string) => {
  return fetchApi<PaginatedResult<Book>>(
    `/book/smart-search?searchTerm=${searchTerm}`
  );
};

const BookService = {
  GetBooksBySearch,
};

export { BookService };
