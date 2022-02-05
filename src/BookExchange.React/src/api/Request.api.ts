import { PaginatedResult, Request } from "@app/types";
import { ApiBase } from "@utils/api/ApiBase";
import { ApiResponse } from "@utils/api/ApiResponse";

export class RequestApi extends ApiBase {
  public static async acceptRequest(id: number): Promise<ApiResponse<PaginatedResult<Request>>> {
    return await RequestApi.put<PaginatedResult<Request>>(`/request/${id}`, true);
  }
}
