import React from 'react';
import { View } from 'react-native';
import { mainColors } from 'constants/colors';

import { useTheme } from 'helpers/ThemeManage';
import { styles } from './styles';
import { ModalHeaderWorkersGroupProps } from './ModalHeaderWorkersGroup.type';
import { Preloader } from '../Preloader';
import { Typography } from '../Typography';

const ModalHeaderWorkersGroup:React.FC<ModalHeaderWorkersGroupProps> = ({
  title, leftContent, rightContent, loading,
}) => {
  const { colors } = useTheme();
  return (
    <View style={ styles.container }>
      <View style={{
        flex: 1,
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
        flex: 1,
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

export default ModalHeaderWorkersGroup;
