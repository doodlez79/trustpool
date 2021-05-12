export const en = {
  screens: {
    Language: {
      title: 'Hello!',
      description: 'Choose application language',
      btn: 'Continue',
      nameScreen: 'Language',
    },

    Auth: {
      nameScreen: 'Sign In',
      description: 'Don’t have an account yet?',
      linkDescription: 'Sign up',
      email: 'Email',
      password: 'Password',
      btn: 'Continue',
      errors: {
        passwordLengthLong: 'Password must be at most 30 characters',
        passwordLengthShort: 'Password must be at least 6 characters',
        passwordRequired: 'Password is a required field',
        emailRequired: 'Email is a required field',
        emailIncorrect: 'Incorrect Email',
        3024: 'Incorrect login or password or both',
      },
    },
    Theme: {
      nameScreen: 'Theme',
      title: 'Which side are you?',
      description: 'Choose application theme',
      btn: 'Continue',
      dark: 'Dark',
      light: 'Light',
      default: 'System',
    },
    LanguagesSettings: {
      nameScreen: 'Languages',
    },
    MiningScreen: {
      nameScreen: 'Mining Setting',
      btn: 'Change {{coinPoint}} address',
      btnPayment: 'Change current payment',
      modalChangePayment: 'Change current payment',
      paymentTime: 'Payment Time',
      currentPaymentStep: 'Current payment',
      address: '{{coinPoint}} address',

    },
    Notification: {
      title: 'Want to be notified?',
      description: 'Accept notifications',
      btn: 'Next',
    },
    AccessSecureCode: {
      title: 'Worry about your security?',
      description: 'Set up passcode',
      btn: 'Set up',
    },
    ChangePassword: {
      nameScreen: 'Change password',
      newPassword: 'New password',
      repeatPassword: 'Repeat password',
      btnStepOne: 'Continue',
      btnStepTwo: 'Confirm',
      oldPassword: 'Sign in password',
      titleRequiredPass: 'Password is required',
      titleRepeatPass: 'Doesn’t match',
      GA: 'GA code',
      requiredOldPass: 'Old Password is required',
      reqeiredValuedGA: 'GA code is required',
      errors: {
        4014: 'Incorrect GA code',
        3023: "Please don't set the same password again",
        3022: 'Old signin password is wrong',
        4: 'Too frequently',
      },
    },

    Settings: {
      nameScreen: 'Settings',
      readFaq: 'Read FAQ',
      accountLabel: 'Account',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      logout: 'Logout',
      referal: 'Referral reward',
      support: 'Support',
      theme: 'Theme',
      passcode: 'Security',
      language: 'Language',
      notifications: 'Notifications',
      mining: 'Mining Setting',
      tabName: {
        account: 'Account',
        general: 'General',
      },
    },

    Home: {
      nameScreen: 'Home',
      accountsModalTitle: 'Choose account',
      accountAddModalTitle: 'Create subaccount',
      accountModalBackBtn: 'Choose',
      modalChangeAccountInputLabel: 'Name of subaccount',
      modalChangeAccountBtn: 'Confirm',
      balance: 'Account balance',
      paymentTotal: 'Total payment',
      earningTotal: 'Total earning',
      coinModalTitle: 'Coin',
      currencyModalTitle: 'Currency',
      calculationDiff: 'Difficulty',
      widgetCalculation: 'Calculator',
      widgetWorkersTitle: 'Workers',
      chartTitle: 'Hashrate chart',
      widgetWorkers: {
        active: 'Active',
        unactive: 'Inactive',
        total: 'Total',
      },
      widgetChart: {
        '10-min': '10 min',
        '1-hour': '1 hour',
        '1-day': '1 day',
      },
      errors: {
        3010: 'Invalid account name',
        3013: 'Account name already exists',
      },
    },
    Support: {
      nameScreen: 'Help',
      stratum: "Stratum URL's",
      referal: 'Referral link',
      telegramm: 'Go to Telegram',
      faq: 'Go to FAQ',
    },
    StratumUrls: {
      nameScreen: "Stratum URL's",
    },
    ReferralList: {
      nameScreen: 'Referral link',
    },
    Payment: {
      nameScreen: 'Payments',
      tabName: {
        payment: 'Payments',
        earning: 'Earnings',
      },
      status: {
        paid: 'Paid',
        unknown: 'Unknown',
      },
      date: 'Date',
      statusDetail: 'Status',
      value: 'Value',
      adress: 'Address',
      transaction: 'Transaction',
      havntAdress: 'You haven`t set payment address yet',
      clickToSet: 'Click here to set',
      havntPayment: 'No  payments yet',
      havntPaymentHow: 'How should configure the mining rig?',
      earning: {
        date: 'Date',
        totalProfit: 'Total profit',
        hashrate: 'Hashrate',
        unitOutput: 'Unit output ({{prefix}}H/s)',
        startTime: 'Start time',
        endTime: 'End time',
        profit: 'Profit',
        score: 'Score',

      },

    },
    Calculation: {
      nameScreen: 'Calculator',
      title: 'Hashrate value:',
      textHelp: 'Click to change value',
      resultTitle: 'Your income per',
      helpDescription: 'Sample data based on pool profitability in last 7 days, including 1% pool commission.',
      time: {
        hour: 'Hour',
        day: 'Day',
        week: 'Week',
        month: 'Month',
      },
    },
    Workers: {
      nameScreen: 'Workers',
      lastActive: 'Last submit',
      tabsName: {
        active: 'Active',
        unActive: 'Inactive',
        all: 'All',
      },
      lastSubmit: 'Last submit',
      hourAvg: '1-hour avg',
      minAvg: '10-min avg',
      dayAvg: '1-day avg',
      havntWorkers: {
        ACTIVE: 'Active workers doesn’t found',
        INACTIVE: 'Inactive workers doesn’t found',
        ALL: 'Workers doesn’t found. \n Need help to setting a new worker?',
      },
      search: 'Search by group {{name}}',
      searchAll: 'Search',
      sort: 'Sort',
      reset: 'Reset',
      sortList: {
        name: 'Name',
        hashrate: 'Hashrate',
        lastActive: 'Last submit',
      },
      group: {
        modalHeader: 'Choose group',
        modalHeaderRight: 'Edit',
        modalHeaderLeft: 'Done',
        allWorkers: 'All workers',
        defaultWorkers: 'Default',
        deleteConfirmTitle: 'Reminder',
        deleteConfirmText: 'Workers in deleted group will go to default group. Confirm to delete a group?',
        deleteConfirmBtnYes: 'Confirm',
        deleteConfirmBtnNo: 'Cancel',
        deleteConfirmBtnNo1: 'Cancel',
        errors: {
          5007: 'Worker group exists',
        },
        more: 'More',
        selectAll: 'Select all',
        unSelectAll: 'Unselect all',
        moveSelectedTo: 'Move selected to',
        moveTo: 'Move to',
        empty: 'Group is empty \n Change to another group or',
        goToAllWorkers: 'Go to all workers',
        badSearch: 'No results \n Try to change request',
        createGroup: {
          header: 'Create group',
          headerRename: 'Change name',
          label: 'Name of group',
          btn: 'Confirm',
        },
      },
      cantFind: 'No workers found for your request',
      info: {
        mainTextFirstStr: 'Create a worker in the form of',
        mainTextFirstBold: '«UserID.workerID»',
        mainTextSecondStr: 'and any password for',
        // eslint-disable-next-line max-len
        mainTextMiddle: 'it. WorkerID should consist of numbers and lowecase letters no longer than 64 characters. E.g. If your userID is miner,',
        mainTextFourthStr: 'your worker name could be',
        mainTextSecondBold: '«miner.001».',
        mainTextLastString: 'Password is optional.',
        firstLinkLabel: 'Stratum URL 1',
        secondLinkLabel: 'Stratum URL',
        note: 'Note. Port',
        available: 'is available too.',
        forAllUrlsEng: 'For all URLs',
        forAllUrls: 'For all URLs.',
        showMore: 'Show more',
        showLess: 'Show less',
      },
      modal: {
        title: 'Stratum URL',
      },
    },
    Referals: {
      nameScreen: 'Referral',
      headerTitle: 'Referral reward',
      headerBackText: 'Account',
      tabName: {
        myReferrals: 'My referrals',
        rewardList: 'Reward list',
      },
      // eslint-disable-next-line max-len
      textFirstStr: 'Refer a friend to register and mine on',
      textSecondStrStart: 'Trustpool, and you will get from',
      textPercent: '0.3%',
      textSecondStrEnd: '',
      textThirdStr: 'of his/her mining income as reward.',
      linkLabel: 'Your referral link',
      mention: 'Your link has been copied',
      isRewardListEmpty: "Reward doesn't found. Your referrals has no payments yet.",
      dayAvg: '1-day avg hashrate',
      referralRatio: 'Referral ratio',
      reward: 'Reward',
      hashrate: 'Hashrate',
      modal: {
        title: 'Referral link',
        referralRules: 'Referral rules:',
        firstRule: 'Only users that sign up with YOUR referral link are counted as YOUR referrals.',
        // eslint-disable-next-line max-len
        secondRule: 'Rewards are allocated to your account at 08:30(UTC+8) of the next day. There might be payment delay.',
        thirdRule: 'Please refer to website for actual referral ratio.',
      },
    },
    Menu: {
      nameScreen: 'Menu',
    },
    NotificationSetting: {
      nameScreen: 'Notification',
      noPushStatus: 'Need setting in system',
      noPushStatusLink: 'Go to settings',
      Thresholds: 'Hashrate drop to',
      Fluctuation: 'Hashrate change',
      'Active workers': 'Active workers',
      AlertSetting: 'Alert setting',
      modalName: 'Alert settings',
      modalBtn: 'Confirm',
      errors: {
        11001: 'No hashrate found, notification unavailable',
      },
    },
    SecureCodeScreen: {
      nameScreen: 'Passcode',
      exit: 'Exit',
      enterCode: 'Passcode',
      repeatCode: 'Confirm new code',
      setCode: 'Set up new code',
      errorNoRightCode: 'You have {{repeatCount}} more try',
      notRightCodeTitle: 'Wrong code',
      skip: 'Not now',
      resetPassCodeTitle: 'Passcode reset ',
      resetPassCodeDescription: 'Click OK to reset the passcode and go to the authorization page',
      authBimetricTitle: 'Login to Trustpool',
      notMatch: 'Do not match',
      cancel: 'Cancel',
      Fingerprint: 'fingerprint',
      'Face ID': 'Face ID',
      'Touch ID': 'Touch ID',
      requestBioDescription: 'Click OK to enable {{type}} authentication',
      // eslint-disable-next-line max-len
      notRightCodeDescription: 'You entered an incorrect code 5 times, now you will be redirected to the authorization page',
    },
    SecureStoreSettings: {
      nameScreen: 'Security',
      usePasscode: 'Use passcode',
      useBio: 'Use {{type}}',
      changePassCode: 'Change passcode',
    },
    PaymentDetails: { nameScreen: 'Payment' },
    SetPaymentAdress: {
      nameScreen: 'Set {{coin}} address',
      verificate: 'Verification code was sent to your e-mail \nPlease check inbox',
      verificateCode: 'Verification code',
      verificateGaCode: 'GA code',
      continueBtn: 'Continue',
      resendCode: 'Resend code',
      sec: 'sec',
      setAddress: '{{coin}} address',
      fillAddress: 'Fill in Payment Address',
      set: 'Set',
      errors: {
        4033: 'Verification failed',
        8004: 'Withdraw address format incorrect',
        405: 'Operation timeout',
        required: 'Verification code is a required field',
      },
    },
    DetailWorker: {
      nameScreen: '{{workerNumber}}',
      lastSubmit: 'Last submit:',
      status: 'Status:',
      active: 'Active',
      unactive: 'Inactive',
      rejectRate: 'Reject rate:',
      '10minAvg': '10-min avg:',
      '1hourAvg': '1-hour avg:',
      '1dayAvg': '1-day avg:',
    },
    BottomNav: {
      nameScreen: 'Home',
    },
    ThemeSetting: {
      nameScreen: 'Theme',
    },
  },
  Chart: {
    click: 'Hold to switch in active state',
    hour: '1-hour avg',
    min: '10-min avg',
    day: '1-day avg',
    rejectRate: 'Reject rate',
    hashRate: 'Hashrate',
    Workers: 'Workers',
  },

  Pachal: {
    title: 'Congratulations!',

    // eslint-disable-next-line max-len
    text: 'You are in half way to victory! \n Take a screenshot of this screen and send it to Telegram chat Trustpool.\n The first participant who will solve the secret of the application and will send this screenshot with this message to the chat is the winner!',
  },
  languageText: 'English',
  disconnectOne: 'No internet connection',
  disconnecTwo: 'Some functions may not be available',
};
