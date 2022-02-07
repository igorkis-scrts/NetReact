import { Book, Post, PaginatedResult, User } from "@app/types";
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
  ): Promise<ApiResponse<PaginatedResult<Book>>> {
    return await UserApi.get<PaginatedResult<Book>>(
      `/user/${userId}/books/wished?pageSize=${pageSize}&pageNumber=${page}`,
      true
    );
  }

  public static async getUserBookshelf(
    userId: number,
    pageSize: number,
    page: number
  ): Promise<ApiResponse<PaginatedResult<Post>>> {
    return await UserApi.get<PaginatedResult<Post>>(
      `/user/${userId}/posts/owned?pageSize=${pageSize}&pageNumber=${page}`,
      true
    );
  }

  public static async createProfile(): Promise<ApiResponse<User>> {
    return await UserApi.post<User>("/user", undefined, false);
  }

  public static async getCurrentUser(): Promise<ApiResponse<User>> {
    return await UserApi.get<User>("/user/current-user", false);
  }
}
