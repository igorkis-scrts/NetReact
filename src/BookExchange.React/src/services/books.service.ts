import { Book, CreateBook, PaginatedResult } from "@app/types";

import { fetchApi } from "./fetchApi";

const GetBooksBySearch = async (searchTerm: string) => {
  return fetchApi<PaginatedResult<Book>>(
    `/book/smart-search?searchTerm=${searchTerm}`
  );
};


const AddBook = async (book: CreateBook) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(book)) {
    if (value) {
      formData.append(key, <string | Blob>value);
    }
  }

  // formData.append("file", book.image);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  console.log(book);
  console.log(requestOptions);
  console.log(book.image);

  return fetchApi<Book>("/book", requestOptions);
};


const BookService = {
  GetBooksBySearch,
  AddBook,
};

export { BookService };
