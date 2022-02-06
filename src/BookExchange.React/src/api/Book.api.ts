import { Book, CreateBook, PaginatedResult } from "@app/types";
import { BooksFilter } from "@models/filters";
import { ApiBase } from "@utils/api/ApiBase";
import { ApiResponse } from "@utils/api/ApiResponse";
import { ServiceUtils } from "@utils/service.utils";

export class BookApi extends ApiBase {
  public static async getAll(filter: BooksFilter): Promise<ApiResponse<PaginatedResult<Book>>> {
    const query = ServiceUtils.objectToQueryString(filter);

    return await BookApi.get<PaginatedResult<Book>>("/book?" + query, true);
  }

  public static async getById(id: number): Promise<ApiResponse<Book>> {
    return await BookApi.get<Book>(`/book/${id}?includeDetails=true`, true);
  }

  public static async addBook(book: CreateBook): Promise<ApiResponse<Book>> {
    const formData = new FormData();
    for (const [key, value] of Object.entries(book)) {
      if (value) {
        formData.append(key, <string | Blob>value);
      }
    }

    return await BookApi.post<Book>("/book", formData);
  }
}

// const GetBooksBySearch = async (searchTerm: string) => {
//   return fetchApi<PaginatedResult<Book>>(
//     `/book/smart-search?searchTerm=${searchTerm}`
//   );
// };
