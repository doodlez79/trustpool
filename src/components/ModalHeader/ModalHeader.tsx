import React, { FC } from 'react';

import { View } from 'react-native';

import { Typography } from 'components/Typography';
import { useTheme } from 'helpers/ThemeManage';

import Preloader from 'components/Preloader/Preloader';
import { mainColors } from 'constants/colors';
import { styles } from './styles';
import { ModalHeaderProps } from './Modal.types';

const ModalHeader:FC<ModalHeaderProps> = ({
  title,
  leftContent,
  rightContent,
  loading,
  longTitle = false,
}) => {
  const { colors } = useTheme();

  return (
    <View style={ styles.container }>
      <View style={{
        flex: longTitle ? 0.4 : 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
      >
        {
          loading && (
            <Preloader
              heightContainer={ 24 }
              stickStyle={{ backgroundColor: mainColors.blue }}
            />
          )
        }
        {
          leftContent && (leftContent)
        }
      </View>
      <Typography bold style={{ flex: 3 }} text={ title } color={ colors.text } />
      <View style={{
        flex: longTitle ? 0.4 : 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      }}
      >
        {
          rightContent && (rightContent)
        }
      </View>
    </View>
  );
};

export default ModalHeader;
