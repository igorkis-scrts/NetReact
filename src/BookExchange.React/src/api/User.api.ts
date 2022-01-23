import { Common, Book } from "@app/types";
import { UserStats } from "@Pages/UserProfile/StatisticsBar/models/UserStats";
import { ApiBase } from "@utils/api/ApiBase";
import { ApiResponse } from "@utils/api/ApiResponse";

export class UserApi extends ApiBase {
  public static async getUserStats(id: number): Promise<ApiResponse<UserStats>> {
    return await UserApi.get<UserStats>(`/user/${id}/stats`, true);
  }

  public static async getWishedBooks(
    userId: number,
    pageSize: number,
    page: number
  ): Promise<ApiResponse<Common.PaginatedResult<Book.Book>>> {
    return await UserApi.get<Common.PaginatedResult<Book.Book>>(
      `/user/${userId}/books/wished?pageSize=${pageSize}&pageNumber=${page}`,
      true
    );
  }
}
