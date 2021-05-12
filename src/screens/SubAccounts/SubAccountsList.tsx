import { StackScreenProps } from '@react-navigation/stack';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, Selectors } from 'ducks';
import { MainStackParamList } from 'navigation/Navigation.types';
import { ACCOUNT_TYPE } from 'entitiesState/account';

export interface SubAccountsListProps extends StackScreenProps<MainStackParamList, 'SubAccountsList'>{}

const SubAccountListScreen:FC<SubAccountsListProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [ subAccount, setSubAccountData ] = useState('');

  useEffect(() => {
    dispatch(Actions.Account.getSubAccountsInfo.request());
    return () => { dispatch(Actions.Account.clearSubList()); };
  }, []);

  const SubAccounts = useSelector(Selectors.Account.getSubAccounts);
  const currentAccount = useSelector(Selectors.Account.getCurrentAccount);

  const handleChangeAccount = (id: number) => {
    dispatch(
      Actions.Account.putChangeSubAccount.request(id, { resolve: () => {} }),
    );
  };

  const createSubAccount = () => {
    dispatch(Actions.Account.postSubAccount.request({ account: subAccount }, {
      resolve: () => {
        setSubAccountData('');
      },
      reject: () => {},
    }));
  };

  const handleGoBack = () => {
    navigation.navigate('Home');
  };

  const handleChangeVisibleSubAccount = (id: number, visible: boolean) => {
    dispatch(Actions.Account.putChangeVisibleSubAccount.request({ id, visible }));
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        onPress={ handleGoBack }
        title={ t('GoBack') }
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Text>
        {
        currentAccount.account && `${t('CurrentAccount')}: ${currentAccount.account} ${currentAccount.accountType}`
        }
      </Text>

      {SubAccounts?.map(item => (
        <View
          key={ item.id }
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {item.accountType !== ACCOUNT_TYPE.main && (
          <Button
            onPress={ () => handleChangeVisibleSubAccount(item.id, item.visible) }
            title={ item.visible ? t('HideSubAccount') : t('ShowSubAccount') }
          />
          ) }
          <TouchableOpacity
            onPress={ () => handleChangeAccount(item.id) }
            disabled={ !item.visible }
          >
            <Text
              style={ [ item.visible ? { color: 'black' } : { color: 'grey' }, { fontSize: 17 }] }
            >
              {item.account}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text>
        {t('CreateSubAccount')}
        :
      </Text>
      <TextInput
        style={{
          width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 10,
        }}
        onChangeText={ text => setSubAccountData(text) }
        value={ subAccount }
      />
      <Button
        onPress={ createSubAccount }
        title={ t('CreateSubAccountsBtn') }
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>

  );
};

export default SubAccountListScreen;
