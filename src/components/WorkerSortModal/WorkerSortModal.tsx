import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { mainColors } from 'constants/colors';
import { useTheme } from 'helpers/ThemeManage';
import { Typography } from 'components/Typography';
import { DrawerItem } from '../DrawerItem';
import { ModalHeader } from '../ModalHeader';
import { WorkerSortModalProps } from './WorkerSortModal.types';
import { data } from './WorkerSortModal.config';

const WorkerSortModal:React.FC<WorkerSortModalProps> = ({
  loading, setChangeSort, sort, resetSort,
}) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View style={{ width: '100%', height: 374 }}>
      <ModalHeader
        title={ t('screens.Workers.sort') }
        loading={ loading }
        rightContent={ (
          <>
            {
              sort.orderBy && sort.orderBy
                ? (
                  <TouchableOpacity onPress={ resetSort }>

                    <Typography bold text={ t('screens.Workers.reset') } color={ mainColors.blue } fontSize={ 14 } />
                  </TouchableOpacity>
                )
                : <></>
            }
          </>

) }
      />
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 10,
        }}
        keyExtractor={ item => `${item}-${Math.random()}` }
        data={ data }
        renderItem={ ({ item }) => (
          <DrawerItem
            title={ t(`screens.Workers.sortList.${item.title}`) }
            icon={ () => item.icon((sort.orderBy === item.orderBy && sort.sortBy === item.sortType)
              ? mainColors.blue : colors.secondaryText) }
            onPress={ (sort.orderBy === item.orderBy && sort.sortBy === item.sortType)
              ? () => setChangeSort({ sortBy: '', orderBy: '' })
              : () => setChangeSort({ sortBy: item.sortType, orderBy: item.orderBy }) }
            active={ sort.orderBy === item.orderBy && sort.sortBy === item.sortType }
          />
        ) }
      />
    </View>
  );
};

export default WorkerSortModal;
