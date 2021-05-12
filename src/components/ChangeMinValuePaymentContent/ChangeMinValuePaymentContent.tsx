import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList, TouchableOpacity, View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Btn } from 'components/Btn';
import { Container } from 'components/Container';
import { perfectSize } from 'helpers/PerfectSize';
import { mainColors } from 'constants/colors';
import { ModalHeader } from 'components/ModalHeader';
import { Typography } from 'components/Typography';
import { useTheme } from 'helpers/ThemeManage';

import { styles } from './styles';

type Props = {
  SelectedItem: (id: string) => void
  data: {label: string, value: string}[],
  currentItem: string
  loading: boolean
}
const ChangeMinValuePaymentContent:FC<Props> = ({
  SelectedItem, data, currentItem, loading,
}) => {
  const [ value, setValue ] = useState(currentItem);
  useEffect(() => {
    const id = data.find(item => item.label === currentItem);
    if (id) {
      setValue(id.value || '');
    }
  }, [ currentItem ]);

  const { t } = useTranslation();
  const insert = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View
      style={{
        maxHeight: perfectSize(360),
        marginBottom: insert.bottom + 10,
      }}
    >
      <ModalHeader
        longTitle
        title={ t('screens.MiningScreen.modalChangePayment') }
        loading={ loading }
      />
      <FlatList<{label: string, value: string}>
        data={ data }
        contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        horizontal
        keyExtractor={ (item, index) => `${index}-${item.value}` }
        renderItem={ ({ item }) => (
          <TouchableOpacity
            onPress={ () => setValue(item.value) }
            style={{
              ...styles.item,
              backgroundColor: colors.backgroundSelectedItem,
              borderColor: item.value === value ? mainColors.blue : colors.backgroundSelectedItem,
            }}
          >
            <Typography
              style={{
              }}
              text={ item.label }
              color={ colors.text }
            />
          </TouchableOpacity>
        ) }
      />
      <Container paddingSize={ 16 }>
        <Btn onClick={ () => SelectedItem(value) } title={ t('screens.ChangePassword.btnStepTwo') } />

      </Container>
    </View>
  );
};

export default ChangeMinValuePaymentContent;
