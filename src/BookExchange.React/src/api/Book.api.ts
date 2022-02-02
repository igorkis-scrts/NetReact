import { Common, Book } from "@app/types";
import { BooksFilter } from "@models/filters";
import { ApiBase } from "@utils/api/ApiBase";
import { ApiResponse } from "@utils/api/ApiResponse";
import { ServiceUtils } from "@utils/service.utils";

export class BookApi extends ApiBase {
  public static async getAll(filter: BooksFilter): Promise<ApiResponse<Common.PaginatedResult<Book.Book>>> {
    const query = ServiceUtils.objectToQueryString(filter);

    return await BookApi.get<Common.PaginatedResult<Book.Book>>("/book?" + query, true);
  }

  public static async getById(id: number): Promise<ApiResponse<Book.Book>> {
    return await BookApi.get<Book.Book>(`/book/${id}?includeDetails=true`, true);
  }
}
