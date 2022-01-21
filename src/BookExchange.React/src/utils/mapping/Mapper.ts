import { IMapKey } from "./IMapKey";
import { IMapFunction } from "./IMapFunction";
import { IMappingProfile } from "./IMappingProfile";

export class Mapper {
  private static mapFunctions: IMapFunction[] = [];

  private static findByKey(key: IMapKey) {
    return Mapper.find(key.sourceType, key.destinationType);
  }

  private static find(sourceType: string, destinationType: string) {
    return Mapper.mapFunctions.find(
      (mapFunction: IMapFunction) => mapFunction.key.sourceType === sourceType && mapFunction.key.destinationType === destinationType
    );
  }

  public static addProfiles(profiles: IMappingProfile[]): void {
    profiles.forEach((profile: IMappingProfile) => Mapper.addProfile(profile));
  }

  public static addProfile(profile: IMappingProfile): void {
    profile.get().forEach((mapFunction: IMapFunction) => {
      const addedMapFunction = Mapper.findByKey(mapFunction.key);
      if (addedMapFunction) {
        // eslint-disable-next-line max-len
        throw Error(
          // eslint-disable-next-line max-len
          `Adding mapping failed: the mapping key was already added (sourceType: ${mapFunction.key.sourceType}, destinationType: ${mapFunction.key.destinationType})`
        );
      }

      Mapper.mapFunctions.push(mapFunction);
    });
  }

  public static map<TDestination>(
    sourceType: string,
    destinationType: string,
    sourceModel: any,
    destinationModel?: TDestination
  ): TDestination {
    const mapFunction = Mapper.find(sourceType, destinationType);
    if (!mapFunction) {
      throw Error(
        `A mapping for types has not been registered (sourceType: ${sourceType}, destinationType: ${destinationType})`
      );
    }
    return mapFunction.map(sourceModel, destinationModel);
  }
}
