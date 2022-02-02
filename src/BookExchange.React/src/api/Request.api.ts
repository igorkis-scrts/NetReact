import { Common, Request } from "@app/types";
import { ApiBase } from "@utils/api/ApiBase";
import { ApiResponse } from "@utils/api/ApiResponse";

export class RequestApi extends ApiBase {
  public static async acceptRequest(
    id: number
  ): Promise<ApiResponse<Common.PaginatedResult<Request.Request>>> {
    return await RequestApi.put<Common.PaginatedResult<Request.Request>>(`/request/${id}`, true);
  }
}
