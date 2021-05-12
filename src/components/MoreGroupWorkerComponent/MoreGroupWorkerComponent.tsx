import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { DrawerItem } from '../DrawerItem';
import { ModalHeader } from '../ModalHeader';

import { styles } from './styles';

type Props = {
  toMoveList:()=>void
  selectAll:()=>void
  unSelectAll:()=>void
}

const MoreGroupWorkerComponent:React.FC<Props> = ({ toMoveList, selectAll, unSelectAll }) => {
  const { t } = useTranslation();
  return (
    <View style={ styles.container } onStartShouldSetResponder={ () => true }>
      <ModalHeader title={ t('screens.Workers.group.more') } />
      <DrawerItem onPress={ selectAll } withOutChevron title={ t('screens.Workers.group.selectAll') } />
      <DrawerItem onPress={ unSelectAll } withOutChevron title={ t('screens.Workers.group.unSelectAll') } />
      <DrawerItem onPress={ toMoveList } withOutChevron title={ t('screens.Workers.group.moveSelectedTo') } />
    </View>
  );
};

export default MoreGroupWorkerComponent;
