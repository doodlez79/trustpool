import { TITLE_SETTING_INFO_NORMAL } from 'entitiesState/settings';

export type FormValuesType = {
  [x in TITLE_SETTING_INFO_NORMAL]: {value: number, unit: string}
}
