import React from 'react';

import { useTranslation } from 'react-i18next';
import { Dimensions, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useTheme } from 'helpers/ThemeManage';
import { mainColors } from 'constants/colors';
import Sort from 'Icons/Sort.svg';
import ClearInput from 'Icons/ClearInput.svg';
import Search from 'Icons/Search.svg';
import { InputField } from '../InputField';
import { SearchAndSortWorkersTabProps } from './SearchAndSortWorkersTab.types';

import { styles } from './styles';
import { Typography } from '../Typography';

const { width } = Dimensions.get('screen');

const SearchAndSortWorkersTab:React.FC<SearchAndSortWorkersTabProps> = ({
  value, setChangeSearch, setChangeSearch1, sortClick, activeSort, searchActive, setSearchActive,
  placeholderNameGroup, clearInput,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const checkLength = (name:string) => {
    if (name.length > 6) {
      name = name.slice(0, 6).concat('...');
    }
    return name;
  };
  return (
    <View style={ styles.container }>
      {
          searchActive
          && (
            <View style={{
              flex: 3,
            }}
            >
              <InputField
                onChange={ e => {
                  setChangeSearch(e);
                } }
                editFlagProps
                value={ value }
                styleContainer={{ ...styles.inputHeight, flexWrap: 'nowrap' }}
                inputContainerStyle={{ ...styles.inputHeight, flexWrap: 'nowrap' }}
                inputProps={{
                  onEndEditing: () => {
                    setChangeSearch1(value);
                  },
                  keyboardType: 'default',
                  autoCorrect: false,
                  multiline: false,
                  autoFocus: searchActive,
                  numberOfLines: 1,
                  underlineColorAndroid: 'transparent',
                }}
                Icon={ () => (
                  <View
                    style={{
                      height: 18,
                      width: 18,
                      marginRight: -11,
                    }}
                  >
                    <ClearInput />
                  </View>
                ) }
                onClickIcon={ () => { clearInput(); setChangeSearch(''); setChangeSearch1(''); } }
                LeftIcon={ () => (
                  <View style={ styles.icon }>
                    <Search fill={ colors.secondaryText } />
                  </View>
                ) }
                placeholder={ placeholderNameGroup === 'Workers'
                || placeholderNameGroup === 'Воркеры' ? t('screens.Workers.searchAll')
                  : t('screens.Workers.search', { name: checkLength(placeholderNameGroup) }) }
              />
            </View>

          )
}
      <View style={{
        flexDirection: 'row', flex: searchActive ? 1 : 0, alignItems: 'center', justifyContent: 'flex-end',
      }}
      >
        {
          searchActive ? (
            <Typography
              style={{ marginLeft: 10 }}
              color={ mainColors.blue }
              fontSize={ 14 }
              text={ width <= 320
                ? t('screens.Workers.group.deleteConfirmBtnNo1')
                : t('screens.Workers.group.deleteConfirmBtnNo') }
              onPress={ () => { setChangeSearch(''); setChangeSearch1(''); setSearchActive(false); } }
            />

          ) : (
            <TouchableOpacity
              style={{ ...styles.sort }}
              onPress={ () => setSearchActive(true) }
            >
              <Search width={ 20 } height={ 20 } fill={ colors.text } />
            </TouchableOpacity>
          )
          }
        <TouchableOpacity
          style={ styles.sort }
          onPress={ sortClick }
        >
          <Sort width={ 20 } height={ 20 } fill={ activeSort.orderBy === '' ? colors.text : mainColors.blue } />
        </TouchableOpacity>
      </View>

    </View>

  );
};

export default SearchAndSortWorkersTab;
