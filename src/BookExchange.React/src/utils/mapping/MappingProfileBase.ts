export class MappingProfileBase {
  protected static autoMap<TSource, TDestination>(source: TSource, destination: TDestination): TDestination {
    let keys = Object.keys(destination);
    if (keys.length === 0) {
      keys = Object.keys(source);
    }

    const finalDestination = destination as any;

    keys.forEach((propertyName: string) => {
      if (propertyName in source) {
        finalDestination[propertyName] = (source as any)[propertyName];
      }
    });

    return finalDestination;
  }
}
