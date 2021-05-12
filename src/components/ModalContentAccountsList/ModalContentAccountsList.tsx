import React, { FC } from 'react';

import {
  View, FlatList, TouchableOpacity,
} from 'react-native';

import { SubAccountsType } from 'entitiesState/account';
import { perfectSize } from 'helpers/PerfectSize';

import { useTranslation } from 'react-i18next';
import { mainColors } from 'constants/colors';
import AddModal from 'Icons/AddModal.svg';
import { ModalHeader } from 'components/ModalHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SubAccountsModalItem } from 'components/SubAccountsModalItem';

type ModalContentAccountsListProps = {
  data: SubAccountsType[],
  selectedItemSubAccount: (id: number) => void
  addAccountHandler: () => void
  currentNameId: string | number
  loading: boolean
}
const ModalContentAccountsList:FC<ModalContentAccountsListProps> = ({
  data,
  currentNameId, selectedItemSubAccount, addAccountHandler, loading,
}) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  return (
    <View
      onStartShouldSetResponder={ () => true }
      style={{
        width: '100%',
        maxHeight: perfectSize(428),
      }}
    >
      <ModalHeader
        title={ t('screens.Home.accountsModalTitle') }
        loading={ loading }
        rightContent={ (
          <TouchableOpacity
            onPress={ addAccountHandler }
            style={{
              height: perfectSize(16),
              width: perfectSize(16),
            }}
          >
            <AddModal fill={ mainColors.blue } />
          </TouchableOpacity>
) }
      />
      <FlatList<SubAccountsType>
        contentContainerStyle={{
          paddingHorizontal: perfectSize(16),
          paddingBottom: insets.bottom + 10,
        }}
        keyExtractor={ (item, index) => `${index}-${item.id}` }
        data={ data }
        renderItem={ ({ item }) => (
          <SubAccountsModalItem
            active={ item.id === currentNameId }
            item={ item }
            onSelect={ selectedItemSubAccount }
          />
        ) }
      />
    </View>

  );
};

export default ModalContentAccountsList;
