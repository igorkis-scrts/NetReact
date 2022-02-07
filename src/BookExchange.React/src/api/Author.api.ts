import { Author } from "@app/types";
import { ApiBase } from "@utils/api/ApiBase";
import { ApiResponse } from "@utils/api/ApiResponse";

export class AuthorApi extends ApiBase {
  public static async getAll(): Promise<ApiResponse<Author[]>> {
    return await AuthorApi.get<Author[]>("/author", true);
  }
}
