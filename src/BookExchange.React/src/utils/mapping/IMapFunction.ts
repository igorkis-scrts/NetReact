import { IMapKey } from "./IMapKey";

export interface IMapFunction<TResult = any> {
  key: IMapKey;
  map: (sourceModel: any, destinationModel?: any) => TResult;
}
