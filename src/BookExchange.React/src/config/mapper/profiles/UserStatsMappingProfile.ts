import { IUserStatsDto } from "@api/models/statistics/requests/IUserStatsDto";
import { UserStats } from "@Pages/UserProfile/StatisticsBar/models/UserStats";
import { IMapFunction } from "@utils/mapping/IMapFunction";
import { IMappingProfile } from "@utils/mapping/IMappingProfile";
import { MapFunction } from "@utils/mapping/MapFunction";
import { MappingProfileBase } from "@utils/mapping/MappingProfileBase";

export class UserStatsMappingProfile extends MappingProfileBase implements IMappingProfile {
  public get(): IMapFunction[] {
    return [
      new MapFunction(
        nameof<IUserStatsDto>(),
        nameof<UserStats>(),
        UserStatsMappingProfile.mapDtoToModel)
    ];
  }

  private static mapDtoToModel(dto: IUserStatsDto): UserStats {
    return MappingProfileBase.autoMap<IUserStatsDto, UserStats>(dto, new UserStats());
  }
}
