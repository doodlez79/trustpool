import React, { FC } from 'react';

import { ScrollView, View } from 'react-native';

import { Container } from 'components/Container';
import { InputField } from 'components/InputField';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'helpers/ThemeManage';
import { perfectSize } from 'helpers/PerfectSize';
import Edit from 'Icons/Edit.svg';
import { styles } from './styles';
import DrawerItem from '../DrawerItem/DrawerItem';

type SettingsAccountContentProps = {
  name: string
  email: string
  logoutClick: () => void
  goSupportScreen: () => void
  goReferalScreen: () => void
  changePassword: () => void
  loadingLogout: boolean
}

const SettingsAccountContent:FC<SettingsAccountContentProps> = ({
  name, logoutClick, goReferalScreen, goSupportScreen, changePassword, email, loadingLogout,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <Container
      paddingSize={ 8 }
      style={{
        marginTop: perfectSize(20),
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={ false }
      >
        <View style={{
          marginBottom: perfectSize(40),
        }}
        >
          <InputField
            disable
            value={ name }
            onChange={ () => {} }
            inputContainerStyle={{
              borderWidth: 0,
            }}
            inputStyle={{
              ...styles.inputStyle,

              backgroundColor: colors.secondaryText,
            }}
            label={ t('screens.Settings.accountLabel') }
          />
          <InputField
            disable
            value={ email }
            onChange={ () => {} }
            styleContainer={{
              marginTop: perfectSize(20),
            }}
            inputContainerStyle={{
              borderWidth: 0,
            }}
            inputStyle={{
              ...styles.inputStyle,
              backgroundColor: colors.secondaryText,
            }}
            label={ t('screens.Settings.emailLabel') }
          />
          <InputField
            disable
            onClick={ changePassword }
            value="12345678"
            onChange={ () => {} }
            Icon={ () => (
              <View style={{
                width: perfectSize(16),
                height: perfectSize(16),
              }}
              >
                <Edit />
              </View>
            ) }
            styleContainer={{
              marginTop: perfectSize(20),
            }}
            inputContainerStyle={{
              borderWidth: 0,
            }}
            inputStyle={{
              backgroundColor: colors.backgroundSelectedItem,
            }}
            inputProps={{
              secureTextEntry: true,
            }}
            label={ t('screens.Settings.passwordLabel') }
          />
        </View>

        <DrawerItem title={ t('screens.Settings.referal') } onPress={ goReferalScreen } />
        <DrawerItem title={ t('screens.Settings.support') } onPress={ goSupportScreen } />
        <DrawerItem title={ t('screens.Settings.logout') } onPress={ logoutClick } loading={ loadingLogout } />
      </ScrollView>
    </Container>
  );
};

export default SettingsAccountContent;
