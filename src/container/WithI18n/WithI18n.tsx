import React, { FC, Suspense, useEffect } from 'react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import { useSelector } from 'react-redux';
import { Selectors } from 'ducks';

import { optionsI18n } from './constants';

i18n.use(initReactI18next);

const WithI18n = (Component:FC) => (props: any) => {
  const langApp = useSelector(Selectors.Setting.getCurrentLang);

  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n.init({ ...optionsI18n, lng: langApp });
    }
  }, []);

  useEffect(() => {
    if (i18n.language !== langApp) {
      i18n.changeLanguage(langApp);
    }
  }, [ langApp ]);

  return (
    <Suspense fallback={ null }>
      <I18nextProvider i18n={ i18n }>
        <Component { ...props } />
      </I18nextProvider>
    </Suspense>
  );
};

export default WithI18n;
