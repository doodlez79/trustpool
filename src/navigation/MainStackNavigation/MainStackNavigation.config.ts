import { SettingsScreen } from 'screens/Settings';
import { DetailWorkerScreen } from 'screens/DetailWorker';
import { SubAccountListScreen } from 'screens/SubAccounts';
import { Referal } from 'screens/Referal';
import { BottomNavigator } from 'navigation/BottomNavigation';
import { CalculationScreens } from 'screens/Calculation';
import { PaymentDetails } from 'screens/PaymentDetails';
import { SupportScreen } from 'screens/SupportScreen';
import ChangePassword from 'screens/ChangePassword/ChangePassword';
import ThemeScreen from 'screens/Theme/ThemeScreen';
import LanguagesSettingScreen from 'screens/LanguagesSetting/LanguagesSetting';
import MiningScreen from 'screens/Mining/Mining';
import NotificationSetting from 'screens/NotificationSetting/NotificationSetting';
import { SettingPaymentAddress } from 'screens/SettingPaymentAddress';
import { ThemeSettingScreen } from 'screens/ThemeSetting';
import { StratumUrls } from 'screens/StratumUrlsScreen';
import { ReferralLink } from 'screens/ReferalLink';
import SecureStoreSettings from 'screens/SecureStoreSettings/SecureStoreSettings';
import SecureCodeScreen from 'screens/SecureCode/SecureCode';
import AccessSecureCode from 'screens/SecureCode/AccessSecureCode';

export const MainStackNavigationConfig = [
  {
    id: 1,
    name: 'BottomNav',
    component: BottomNavigator,
    header: false,
  }, {
    id: 2,
    name: 'Settings',
    component: SettingsScreen,
    header: true,
  },
  {
    id: 4,
    name: 'DetailWorker',
    component: DetailWorkerScreen,
    header: true,
  },
  {
    id: 5,
    name: 'SubAccountsList',
    component: SubAccountListScreen,
    header: true,
  },
  {
    id: 6,
    name: 'Referals',
    component: Referal,
    header: true,
  },
  {
    id: 7,
    name: 'Calculation',
    component: CalculationScreens,
    header: true,
  },
  {
    id: 8,
    name: 'PaymentDetails',
    component: PaymentDetails,
    header: true,
  },
  {
    id: 10,
    name: 'SetPaymentAdress',
    component: SettingPaymentAddress,
    header: true,
  },
  {
    id: 11,
    name: 'Support',
    component: SupportScreen,
    header: true,
  },
  {
    id: 12,
    name: 'ChangePassword',
    component: ChangePassword,
    header: true,
  },
  {
    id: 13,
    name: 'Theme',
    component: ThemeScreen,
    header: true,
  },
  {
    id: 14,
    name: 'LanguagesSettings',
    component: LanguagesSettingScreen,
    header: true,
  },
  {
    id: 15,
    name: 'MiningScreen',
    component: MiningScreen,
    header: true,
  },
  {
    id: 16,
    name: 'NotificationSetting',
    component: NotificationSetting,
    header: true,
  },
  {
    id: 17,
    name: 'ThemeSetting',
    component: ThemeSettingScreen,
    header: true,
  },
  {
    id: 18,
    name: 'StratumUrls',
    component: StratumUrls,
    header: true,
  },
  {
    id: 19,
    name: 'ReferralList',
    component: ReferralLink,
    header: true,
  },
  {
    id: 20,
    name: 'SecureStoreSettings',
    component: SecureStoreSettings,
    header: true,
  },
  {
    id: 21,
    name: 'AccessSecureCode',
    component: AccessSecureCode,
    header: false,
  },
  {
    id: 22,
    name: 'SecureCodeScreen',
    component: SecureCodeScreen,
    header: false,
  },

];
