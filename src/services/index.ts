import { ConfigApi } from 'constants/configApi';

import LocalAuthentication from 'services/LocalAuthentication';
import { APIService } from './API';
import { AuthService } from './Auth';

import SettingsServices from './Settings';
import WorkersServices from './Workers';
import LinkingService from './Linking';

import AccountService from './Account';
import PaymentService from './Payment';
import ReferalsService from './Referals';
import PushNotifications from './PushNotifications';
import GeneralServices from './General';
import CurrencyServices from './Currency';
import NotificationsServices from './Notifications';
import CurrencysCourseServices from './Valutes';

const APIServiceInstance = new APIService(ConfigApi.url);

const AuthServiceInstance = new AuthService(APIServiceInstance);

const WorkersServicesInst = new WorkersServices(APIServiceInstance);
const AccountServicesInst = new AccountService(APIServiceInstance);
const PaymentServicesInst = new PaymentService(APIServiceInstance);
const SettingsServicesInst = new SettingsServices(APIServiceInstance);
const NotificationsServicesInst = new NotificationsServices(APIServiceInstance);
const LinkingURLService = new LinkingService();
const PushNotificationsInst = new PushNotifications();
const ReferalsServicesInst = new ReferalsService(APIServiceInstance);
const GeneralServicesInst = new GeneralServices(APIServiceInstance);
const CurrencyServicesInst = new CurrencyServices(APIServiceInstance);
const CurrencysCoursesServicesInst = new CurrencysCourseServices();
const LocalAuthenticationServices = new LocalAuthentication();

export type Types = {
  API: APIService,
  Auth: AuthService,
  Settings: SettingsServices,
  General: GeneralServices,
  Account: AccountService,
  Workers: WorkersServices,
  Currency: CurrencyServices,
  Referals: ReferalsService,
  Payment: PaymentService,
  PushNotification: PushNotifications
  Notifications: NotificationsServices
  Course: CurrencysCourseServices
}

export {
  APIServiceInstance as APIService,
  AuthServiceInstance as AuthService,

  LinkingURLService, WorkersServicesInst, AccountServicesInst, SettingsServicesInst, PaymentServicesInst,
  ReferalsServicesInst, PushNotificationsInst, GeneralServicesInst,
  CurrencyServicesInst, NotificationsServicesInst, LocalAuthenticationServices,
  CurrencysCoursesServicesInst,
};
