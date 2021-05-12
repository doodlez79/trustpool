import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mainColors } from 'constants/colors';
import { WorkersGroupState } from 'entitiesState/workers';
import AddModal from 'Icons/AddModal.svg';
import ModalHeaderWorkersGroup from '../ModalHeaderWorkersGroup/ModalHeaderWorkersGroup';
import { GroupListProps } from './GroupList.types';

import { styles } from './styles';
import { Typography } from '../Typography';
import GropWorkerItem from '../GroupWorkerItem/GroupWorkerItem';

const GroupWorkersList:React.FC<GroupListProps> = ({
  id, loading, groups, chooseGroup, addAccountHandler, renameAccountHandler,
}) => {
  const { t } = useTranslation();

  const [ editFlag, setEditFlag ] = useState(false);
  const insets = useSafeAreaInsets();

  const checkName = (item: WorkersGroupState) => {
    if (item.groupId === -1) {
      return t('screens.Workers.group.allWorkers');
    }
    if (item.groupId === 0) {
      return t('screens.Workers.group.defaultWorkers');
    }

    return item.groupName;
  };

  return (
    <View style={ styles.container } onStartShouldSetResponder={ () => true }>
      <ModalHeaderWorkersGroup
        title={ t('screens.Workers.group.modalHeader') }
        rightContent={ editFlag
          ? (
            <TouchableOpacity
              style={{
                height: 25, width: 25, justifyContent: 'center', alignItems: 'center',
              }}
              onPress={ addAccountHandler }
            >
              <AddModal height={ 16 } width={ 16 } fill={ mainColors.blue } />
            </TouchableOpacity>
          )
          : (
            <Typography
              onPress={ () => setEditFlag(true) }
              color={ mainColors.blue }
              text={ t('screens.Workers.group.modalHeaderRight') }
            />
          ) }
        loading={ loading }
        leftContent={ (editFlag && !loading)
          && (
          <Typography
            onPress={ () => setEditFlag(false) }
            color={ mainColors.blue }
            text={ t('screens.Workers.group.modalHeaderLeft') }
          />
          ) }
      />
      <FlatList
        contentContainerStyle={{
          paddingBottom: insets.bottom + 10,
        }}
        onStartShouldSetResponder={ () => true }
        data={ groups }
        style={{ paddingHorizontal: 16 }}
        keyExtractor={ (item, index) => `${item}-${index}` }
        renderItem={ ({ item }) => (
          <GropWorkerItem
            name={ checkName(item) }
            count={ item.total }
            id={ item.groupId }
            active={ item.groupId === id }
            key={ item.groupId }
            chooseGroup={ id => chooseGroup(id) }
            editable={ editFlag }
            renameAccountHandler={ (id, name) => renameAccountHandler(id, name) }
          />
        ) }
      />

    </View>
  );
};

export default GroupWorkersList;
