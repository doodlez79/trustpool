import React, { FC } from 'react';

import { View, TouchableOpacity } from 'react-native';

import { arrayLangWithIcon } from 'screens/Languages/Languages.config';
import { LANG_TYPE } from 'entitiesState/settings';
import { SelectedItemRadioType } from 'components/SelectedItemRadioType';
import { perfectSize } from 'helpers/PerfectSize';

type LangSelectedContentProps = {
  changeLang: (land: LANG_TYPE) => void
  lang: LANG_TYPE
}

const LangSelectedContent:FC<LangSelectedContentProps> = ({ changeLang, lang }) => (
  <View>
    {
          (Object.keys(arrayLangWithIcon) as LANG_TYPE[]).map(item => (
            <TouchableOpacity key={ item } onPress={ () => changeLang(item) }>
              <SelectedItemRadioType
                style={{ marginBottom: perfectSize(20) }}
                text={ arrayLangWithIcon[item].name }
                Icon={ arrayLangWithIcon[item].icon }
                active={ item === lang }
              />
            </TouchableOpacity>
          ))
        }
  </View>
);

export default LangSelectedContent;
