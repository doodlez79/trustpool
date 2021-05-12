import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, View } from 'react-native';
import { StackHeaderLeftButtonProps, StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from 'navigation/Navigation.types';

import { PaymentDetailsContent } from 'components/PaymentDetailsContent';

import { perfectSize } from 'helpers/PerfectSize';

import { useTheme } from 'helpers/ThemeManage';
import NavigationBack from 'components/NavigationBack/NavigationBack';
import { styles } from './styles';

export interface PaymentDetailsProps extends StackScreenProps<MainStackParamList, 'PaymentDetails'>{}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ navigation, route }) => {
  const { item } = route.params;

  const { t } = useTranslation();
  const { colors } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontFamily: 'OpenSans-Bold',
        fontSize: perfectSize(16),
        color: colors.text,
      },
      // eslint-disable-next-line max-len
      headerLeft: ({ onPress }: StackHeaderLeftButtonProps) => <NavigationBack onClick={ onPress } text={ t('screens.Payment.nameScreen') } />,
      title: t('screens.PaymentDetails.nameScreen'),
    });
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <View
        style={ styles.container }
      >

        <PaymentDetailsContent
          time={ item.time as string }
          status={ item.status }
          adress={ item.address }
          adressUrl={ item.adressUrl }
          amount={ item.amount }
          trId={ item.txId }
          trUrl={ item.txUrl }
          coin={ item.coin }
        />

      </View>
    </SafeAreaView>
  );
};

export default PaymentDetails;
