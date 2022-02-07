import { Category } from "@app/types";
import { ApiBase } from "@utils/api/ApiBase";
import { ApiResponse } from "@utils/api/ApiResponse";

export class CategoryApi extends ApiBase {
  public static async getAll(): Promise<ApiResponse<Category[]>> {
    return await CategoryApi.get<Category[]>("/category", true);
  }
}
