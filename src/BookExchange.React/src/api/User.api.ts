import { UserStats } from "@Pages/UserProfile/StatisticsBar/models/UserStats";
import { ApiBase } from "@utils/api/ApiBase";
import { ApiResponse } from "@utils/api/ApiResponse";
import { Mapper } from "@utils/mapping/Mapper";
import { IUserStatsDto } from "./models/statistics/requests/IUserStatsDto";

export class UserApi extends ApiBase {
  public static async getUserStats(id: number): Promise<ApiResponse<UserStats>> {
    const response = await UserApi.get<IUserStatsDto>(`/user/${id}/stats`, true);

    if (response.data) {
      response.data = Mapper.map<UserStats>(nameof<IUserStatsDto>(), nameof<UserStats>(), response.data);
    }

    return response;
  }
}
