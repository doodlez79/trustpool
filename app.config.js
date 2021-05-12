import { version } from './package.json';

const parsedVersion = /^(\d+).(\d+).(\d+)$/.exec(version);

if (!parsedVersion) {
  throw new Error('Incorrect application version!');
}
const versionParts = parsedVersion.slice(1, 4);
const versionPadding = [ 4, 3, 2 ];

versionParts.forEach((version, index) => {
  const isVersionWithLeadingZeros = (version !== parseInt(version, 10).toString());
  const isVersionIncorrectLength = (version.length > versionPadding[index]);

  if (isVersionWithLeadingZeros || isVersionIncorrectLength) {
    throw new Error('Incorrect application version!');
  }
});

const versionCode = parseInt(versionParts.map((v, index) => v.padStart(versionPadding[index], '0')).join(''), 10);

export default {
  name: 'Trustpool',
  owner: 'trustpool',
  slug: 'mobile-app',
  privacy: 'unlisted',
  version,
  entryPoint: './src/index.tsx',
  orientation: 'portrait',
  icon: './assets/app-icon.png',
  notification: {
    icon: './assets/app-notification-icon.png',
    color: '#3366ff',
  },
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: 'sente-v2',
          project: 'trustpool',
          authToken: 'a35b54a5703445998735068d11c9c545074771ee81104fc991001ab5e0bf517b',
        },
      },
    ],
  },
  splash: {
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
    image: './assets/app-splash.png',
  },
  userInterfaceStyle: 'automatic',
  assetBundlePatterns: [
    'assets/**/*',
  ],
  locales: {
    en: './locales/en.json',
    ru: './locales/ru.json',
  },
  updates: {
    enabled: false,
    fallbackToCacheTimeout: 0,
  },
  extra: {
    version: {
      name: version,
      buildNumber: versionCode,
    },
  },
  ios: {
    bundleIdentifier: 'ru.trustpool.client',
    buildNumber: version,
    supportsTablet: false,
    googleServicesFile: './google-services/ios.plist',
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      NSFaceIDUsageDescription: 'Trustpool will use Face ID to authorize',
    },
    config: {
      usesNonExemptEncryption: false,
    },
    splash: {
      backgroundColor: '#ffffff',
      darkMode: {
        backgroundColor: '#192038',
      },
    },
  },
  android: {
    versionCode,
    package: 'ru.trustpool.client',
    useNextNotificationsApi: true,
    googleServicesFile: './google-services/android.json',
    icon: './assets/app-rounded-icon.png',
    adaptiveIcon: {
      foregroundImage: './assets/app-adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    splash: {
      backgroundColor: '#ffffff',
      darkMode: {
        backgroundColor: '#192038',
      },
    },
    permissions: [
      'READ_PHONE_STATE',
      'USE_FINGERPRINT',
      'USE_BIOMETRIC',
      'VIBRATE',
      'com.anddoes.launcher.permission.UPDATE_COUNT',
      'com.android.launcher.permission.INSTALL_SHORTCUT',
      'com.google.android.c2dm.permission.RECEIVE',
      'com.google.android.providers.gsf.permission.READ_GSERVICES',
      'com.htc.launcher.permission.READ_SETTINGS',
      'com.htc.launcher.permission.UPDATE_SHORTCUT',
      'com.majeur.launcher.permission.UPDATE_BADGE',
      'com.sec.android.provider.badge.permission.READ',
      'com.sec.android.provider.badge.permission.WRITE',
      'com.sonyericsson.home.permission.BROADCAST_BADGE',
    ],
  },
  packagerOpts: {
    config: 'metro.config.js',
    sourceExts: [
      'expo.ts',
      'expo.tsx',
      'expo.js',
      'expo.jsx',
      'ts',
      'tsx',
      'js',
      'jsx',
      'json',
      'wasm',
      'svg',
    ],
  },
};
