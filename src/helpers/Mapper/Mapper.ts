import { merge } from 'object-mapper';

export const mapper = <T>(data: object, mapperSchema: object) => {
  // @ts-expect-error
  const destinationObject: T = {};
  merge<T>(data, destinationObject, mapperSchema);
  return destinationObject;
};
