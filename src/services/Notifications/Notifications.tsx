import { NotificationApi } from 'constants/configNotification';
import { LANG_TYPE } from 'entitiesState/settings';
import { APIService } from '../API';
import { LanguageSWAP } from './Notifications.constant';

export default class NotificationsServices {
  constructor(private readonly apiService: APIService) {}

  sync(token: string, lang: LANG_TYPE, platform: string, experienceId: string, main: {name: string}, sub: any) {
    const locale = LanguageSWAP[lang];

    return this.apiService.post(`${NotificationApi.url}/sync`, {
      main,
      sub,
      deviceInfo: {
        locale, token, platform, experienceId,
      },
    }, true).then(response => response).catch(e => {
      throw e;
    });
  }

  subAdd(main: {name: string}, sub: {name:string}) {
    return this.apiService.post(`${NotificationApi.url}/sub-add`, {
      main,
      sub,
    }, true).then(response => response).catch(e => {
      throw e;
    });
  }

  changeLang(token: string, lang: LANG_TYPE) {
    const locale = LanguageSWAP[lang];

    return this.apiService.patch(`${NotificationApi.url}/locale`, {
      token,
      locale,
    }, true).then(response => response).catch(e => {
      throw e;
    });
  }

  signOut(token:string) {
    return this.apiService.post(`${NotificationApi.url}/sign-out`, {
      token,
    }, true).then(response => response).catch(e => {
      throw e;
    });
  }

  noticeAllEmails() {
    return this.apiService.get('/setting/hashremind/notice').then(response => response.notice_emails).catch(e => {
      throw e;
    });
  }

  noticePostEmail(changData: string) {
    return this.apiService.post('/setting/hashremind/notice', { emails: changData })
      .then(response => response.notice_emails).catch(e => {
        throw e;
      });
  }
}
