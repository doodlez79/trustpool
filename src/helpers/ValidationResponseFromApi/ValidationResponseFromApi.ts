import { JSONSchemaType } from 'ajv/lib/types/json-schema';
import Ajv from 'ajv';

const ajv = new Ajv({ strictTypes: false });

ajv.addFormat('custom-date-time', dateTimeString => typeof dateTimeString === 'object');

export const validationResponseFromApi = <T>(schema: JSONSchemaType<T>) => ajv.compile<T>(schema);
