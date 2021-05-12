import React from 'react';
import { useTheme } from 'helpers/ThemeManage';

import { TouchableOpacity, View } from 'react-native';
import { mainColors } from 'constants/colors';
import Check from 'Icons/Check.svg';

type Props = {
  active: boolean
  onClick: ()=>void
}

const RadioButtonForGroupWorkers:React.FC<Props> = ({ active, onClick }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        top: 35,
        width: 20,
        height: 20,
      }}
    >
      <TouchableOpacity
        style={{
          borderRadius: 50,
          borderColor: colors.backgroundSelectedItem,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: active ? 0 : 2,
          backgroundColor: active ? mainColors.blue : 'transparent',
        }}
        onPress={ onClick }
      >
        { active && <Check width={ 10 } height={ 10 } fill={ colors.backgroundColor } />}

      </TouchableOpacity>
    </View>
  );
};

export default RadioButtonForGroupWorkers;
