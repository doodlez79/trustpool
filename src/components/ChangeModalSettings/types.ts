import { SettingsInfo } from 'entitiesState/settings';
import { FormValuesType } from 'screens/NotificationSetting/types';

export type ChangeModalSettingsProps = {
  infoByCurrentCoin: SettingsInfo
  loading: boolean
  handleSubmit: (values: FormValuesType) => void
}
