import React from 'react';
import { View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { perfectSize } from 'helpers/PerfectSize';
import { useTheme } from 'helpers/ThemeManage';
import ArrowDown from 'Icons/ArrowDown.svg';
import ArrowUp from 'Icons/ArrowUp.svg';
import { mainColors } from 'constants/colors';
import { WidgetContainer } from 'components/WidgetContainer';
import { useTranslation } from 'react-i18next';
import { Typography } from '../Typography';

import { WidgetCalculatorProps } from './WidgetCalculator.types';

import { styles } from './styles';

const WidgetCalculator: React.FC<WidgetCalculatorProps> = ({
  onClick,
  diffAmount,
  nextDiff = 13,
  coinPrice = 19,
  diffType = 'T',
  coinPriceType = 'RUBLES',
  coinPriceCurrency = '',
  icon,
}) => {
  const { t } = useTranslation();
  const typeOfArrowDiff = () => {
    if (nextDiff) {
      return (nextDiff - parseInt(diffAmount, 10) > 0 ? <ArrowDown fill={ mainColors.red } />
        : (<ArrowUp fill={ mainColors.green } />));
    }
    return (<></>);
  };

  const data = [
    {
      title: t('screens.Home.calculationDiff'),
      value: diffAmount,
      type: diffType,
      arrow: typeOfArrowDiff(),
    },
    {
      title: coinPriceType,
      value: coinPrice,
      type: coinPriceCurrency,
    },
  ];

  const { colors } = useTheme();

  return (
    <WidgetContainer onClick={ onClick } label={ t('screens.Home.widgetCalculation') }>
      <View style={{
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: perfectSize(5),
      }}
      >
        <View style={ styles.coinContainer }>
          {
          icon
        }
        </View>
        <Carousel
          data={ data }
          vertical
          itemHeight={ perfectSize(45) }
          autoplay
          activeAnimationType="spring"
          loop
          enableMomentum
          onTouchStart={ onClick }
          scrollEnabled={ false }
          layout="stack"
          layoutCardOffset={ perfectSize(50) }
          autoplayInterval={ 7000 }
          sliderHeight={ perfectSize(45) }
          renderItem={ ({ item }:any) => (
            <View style={ styles.infoBox }>
              <View style={ styles.infoRow }>
                <Typography text={ item.title } color={ colors.secondaryText } fontSize={ 12.8 } />
              </View>
              <View style={ styles.infoRow }>
                <Typography bold text={ item.value } color={ colors.text } fontSize={ 14 } />
                <Typography
                  bold
                  text={ item.type ? item.type : '' }
                  color={ colors.secondaryText }
                  style={{ marginLeft: 3 }}
                  fontSize={ 12.8 }
                />
                <View style={ styles.icon }>
                  {item.arrow}
                </View>
              </View>
            </View>
          ) }
        />
      </View>

    </WidgetContainer>

  );
};

export default WidgetCalculator;
