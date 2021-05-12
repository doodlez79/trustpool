import { v4 as uuidv4 } from 'uuid';

export const mapperRequestVerifyCode = {
  coin: 'coin',
  verifyCode: 'verify_code',
  verifyType: 'verify_type',
  emailCaptcha: 'email_captcha',
};
export const mapperSetting = {
  coin: 'coin',
  remind_setting_list: 'remindSettingList',
};

export const mapperRemindSettingList = {
  value: {
    key: 'value',
    transform: (value: string | number) => {
      if (typeof value === 'string') {
        return parseFloat(value);
      }
      return value;
    },
  },
  business: 'business',
  status: 'status',
  unit: {
    key: 'unit',
    transform: (value: string) => {
      if (value === 'percent') {
        return '%';
      }
      return value;
    },
  },
};

export const mapperGetWalletBalance = {
  min_minimal_payment: 'minMinimalPayment',
  minimal_payment: 'minimalPayment',
  coin: 'coin',
  minimal_payment_choices: {
    key: 'minimalPaymentChoices',
    transform: (value: string[]) => {
      if (Array.isArray(value)) {
        return value.map(item => ({
          label: item,
          value: uuidv4(),
        }));
      }
      return value;
    },

  },
  withdraw_address: {
    key: 'withdrawAddress',
    transform: (value: string | null) => {
      if (!value) {
        return '';
      }
      return value;
    },
  },
  account_balance: 'accountBalance',

};
