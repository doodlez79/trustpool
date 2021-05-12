import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { perfectSize } from 'helpers/PerfectSize';
import { iconsByCurrency } from 'constants/iconByCoin';
import { ModalHeader } from '../ModalHeader';
import { styles } from './styles';
import { CurrencyModalProps } from './CurrencyModal.types';
import { CurrencyModalSelect } from '../CurrencyModalSelect';

const CurrencyModalContent: FC<CurrencyModalProps> = ({
  currencyList, currentCurrency, onSelectCurrency, loading,
}) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  return (
    <View style={ styles.container }>
      <ModalHeader
        loading={ loading }
        title={ t('screens.Home.currencyModalTitle') }
      />
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: perfectSize(32),
          paddingBottom: insets.bottom + 10,
        }}
        keyExtractor={ item => item }
        data={ currencyList }
        renderItem={ ({ item }) => (
          <CurrencyModalSelect
            icon={ iconsByCurrency[item] }
            active={ item === currentCurrency }
            item={ item }
            onSelect={ onSelectCurrency }
          />
        ) }
      />

    </View>
  );
};

export default CurrencyModalContent;
