import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { mainColors } from 'constants/colors';
import { WorkerItem, WorkersGroupState } from 'src/entitiesState/workers';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../Typography';

import { styles } from './styles';
import { DrawerItem } from '../DrawerItem';
import { Btn } from '../Btn';
import ModalHeaderWorkersGroup from '../ModalHeaderWorkersGroup/ModalHeaderWorkersGroup';

type Props = {
  closeModal: ()=>void
  groups: WorkersGroupState[]
  moveToGroup: (id:number)=>void
  workers?: WorkerItem[]
  choosenItem?: number
  aloneItem?: number
}

const MovedToGroupWorkerComponent:React.FC<Props> = ({
  closeModal, groups, moveToGroup, workers, choosenItem, aloneItem,
}) => {
  const { t } = useTranslation();

  let check = 0;

  if (workers) {
    check = workers.find(el => el.id === choosenItem)?.groupId;
  } else if (aloneItem) check = aloneItem;

  const checkGroup = workers ? groups.find(el => el.groupId === check)?.groupId : aloneItem;

  const [ newGroup, setNewGroup ] = useState(checkGroup);

  const [ flag, setFlag ] = useState(false);

  const checkName = (item: WorkersGroupState) => {
    if (item.groupId === 0) {
      return t('screens.Workers.group.defaultWorkers');
    } return item.groupName;
  };

  const insert = useSafeAreaInsets();

  return (
    <View style={{ ...styles.container, paddingBottom: insert.bottom + 10 }} onStartShouldSetResponder={ () => true }>
      <ModalHeaderWorkersGroup
        title={ t('screens.Workers.group.moveTo') }
        rightContent={ (
          <Typography
            color={ mainColors.blue }
            onPress={ closeModal }
            fontSize={ 14 }
            text={ t('screens.Workers.group.deleteConfirmBtnNo') }
          />
) }
      />
      <FlatList
        data={ groups.filter(el => el.groupId !== -1) }
        keyExtractor={ (item, index) => `${item}-${index}` }
        renderItem={ ({ item }) => (
          <DrawerItem
            title={ checkName(item) }
            withOutChevron
            active={ (!flag && check && item.groupId === check)
              || newGroup === item.groupId }
            onPress={ () => { setNewGroup(item.groupId); setFlag(true); } }
          />

        ) }
      />
      <Btn
        onClick={ () => moveToGroup(newGroup) }
        disabled={ (choosenItem && check === newGroup) || (aloneItem && aloneItem === newGroup) || (false) }
        title={ t('screens.Home.modalChangeAccountBtn') }
      />

    </View>
  );
};

export default MovedToGroupWorkerComponent;
