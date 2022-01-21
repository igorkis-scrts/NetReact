import { IMapFunction } from "./IMapFunction";

export interface IMappingProfile {
  get: () => IMapFunction[];
}
