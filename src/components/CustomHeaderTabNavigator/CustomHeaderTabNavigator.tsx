import React, { FC } from 'react';

import { View, TouchableOpacity } from 'react-native';

import { Typography } from 'components/Typography';
import { useTheme } from 'helpers/ThemeManage';

import { Container } from 'components/Container';

import Chevron from 'Icons/Chevron.svg';
import { styles } from './styles';

type CustomHeaderTabNavigatorProps = {
  title: string

  onPressLeft?: () => void
  contentRight?: React.ReactNode
  workerScreen?: boolean
  titleClick?: ()=>void
}
const CustomHeaderTabNavigator: FC<CustomHeaderTabNavigatorProps> = ({
  title, onPressLeft, workerScreen, contentRight, titleClick,
}) => {
  const { colors } = useTheme();
  return (
    <Container
      paddingSize={ 6 }
      style={ styles.container }
    >
      {
        onPressLeft && (
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            onPress={ onPressLeft }
          />
        )
      }
      {
        workerScreen
          ? (
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
                align="center"
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
          )
          : (
            <Typography
              style={{
                flex: 2,
              }}
              align="center"
              text={ title }
              color={ colors.text }
              bold
              fontSize={ 16 }
            />
          )
      }
      <View style={{
        flex: 1,
      }}
      >
        {
        contentRight
      }
      </View>
    </Container>
  );
};

export default CustomHeaderTabNavigator;
