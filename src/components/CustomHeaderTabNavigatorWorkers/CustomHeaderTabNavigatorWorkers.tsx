import React from 'react';

import { View, TouchableOpacity } from 'react-native';

import { Typography } from 'components/Typography';
import { useTheme } from 'helpers/ThemeManage';

import { Container } from 'components/Container';

import Chevron from 'Icons/Chevron.svg';
import More from 'Icons/More.svg';
import { mainColors } from 'constants/colors';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import { SearchAndSortWorkersTab } from '../SearchAndSortWorkersTab';

type CustomHeaderTabNavigatorWorkersProps = {
  title: string

  titleClick?: ()=>void
  searchValue: string
  searchValue1: string
  setChangeSearch: (e: string)=>void
  setChangeSearch1: (e: string)=>void
  sortClick: ()=>void
  activeSort: {sortBy: string, orderBy: string}
  loadingUpdate: boolean
  selectableItem: boolean
  setSelectableItem: (val:boolean)=> void
  moreToClick: ()=>void
  searchActive: boolean
  setSearchActive : (val:boolean)=>void
  clearInput: ()=>void
}

const CustomHeaderTabNavigatorWorkers:React.FC<CustomHeaderTabNavigatorWorkersProps> = ({
  title, titleClick, searchValue,
  activeSort,
  sortClick, setChangeSearch, setChangeSearch1,
  loadingUpdate, selectableItem, setSelectableItem,
  moreToClick, searchActive, setSearchActive,
  clearInput,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Container
      paddingSize={ 17 }
      style={ styles.container }
    >
      <View style={{
        flex: searchActive ? 0 : 1, justifyContent: 'center', alignItems: 'flex-start',
      }}
      >
        {
        selectableItem && (
          <Typography
            onPress={ () => setSelectableItem(false) }
            color={ mainColors.blue }
            text={ t('screens.Workers.group.modalHeaderLeft') }
            fontSize={ 14 }
          />
        )
      }
      </View>

      { !searchActive && (
      <TouchableOpacity
        style={{
          flex: 2,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={ titleClick }
      >
        <Typography
          text={ title }
          color={ colors.text }
          bold
          fontSize={ 16 }
        />
        <View
          style={{
            height: 11, width: 11, marginLeft: 7,
          }}
        >
          <Chevron fill={ colors.secondaryText } />
        </View>
      </TouchableOpacity>
      )}

      <View style={{
        alignItems: 'flex-end',
        flex: 1,
        justifyContent: 'center',
      }}
      >
        {selectableItem ? (
          <TouchableOpacity
            style={{
              height: 20, width: 20,
            }}
            onPress={ moreToClick }
          >
            <More fill={ colors.text } />
          </TouchableOpacity>
        ) : (
          <SearchAndSortWorkersTab
            sortClick={ sortClick }
            setChangeSearch={ e => setChangeSearch(e) }
            setChangeSearch1={ e => setChangeSearch1(e) }
            value={ searchValue }
            activeSort={ activeSort }
            loading={ loadingUpdate }
            searchActive={ searchActive }
            setSearchActive={ val => setSearchActive(val) }
            placeholderNameGroup={ title }
            clearInput={ clearInput }
          />
        )}

      </View>
    </Container>
  );
};

export default CustomHeaderTabNavigatorWorkers;
