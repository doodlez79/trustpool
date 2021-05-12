import React from 'react';

import { View } from 'react-native';

import { mainColors } from 'constants/colors';
import { useTheme } from 'helpers/ThemeManage';
import Svg, {
  Circle, Defs, Use,
} from 'react-native-svg';
import { WidgetContainer } from 'components/WidgetContainer';
import { useTranslation } from 'react-i18next';
import { WidgetWorkersProps } from './WidgetWorkers.types';
import { Typography } from '../Typography';

import { styles } from './styles';

const WidgetWorkers: React.FC<WidgetWorkersProps> = (
  {
    activeWork,
    inactiveWork, onClick = () => {},
  },
) => {
  const summary = activeWork + inactiveWork;

  const strokeOffset = 25.12 * (activeWork / summary);

  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <WidgetContainer onClick={ onClick } label={ t('screens.Home.widgetWorkersTitle') }>
      <View style={{
        alignItems: 'center',
        flexDirection: 'row',
      }}
      >
        <View style={ styles.pieContainer }>
          <Svg
            viewBox="0 0 10 10"
            style={{
              height: 50,
              aspectRatio: 1,
              transform: [{ rotate: '270deg' }],
            }}
          >
            <Defs>
              <Circle id="circle" cx="5" cy="5" r="4" stroke-width="1" fill="none" />
            </Defs>
            <Use xlinkHref="#circle" stroke={ mainColors.green } strokeDasharray="25.12" />
            <Use
              xlinkHref="#circle"
              stroke={ mainColors.red }
              strokeDashoffset={ strokeOffset }
              strokeDasharray="25.12"
            />
            {summary === 0 && (
              <Use
                xlinkHref="#circle"
                stroke={ colors.secondaryText }
                strokeDashoffset={ strokeOffset }
                strokeDasharray="25.12"
              />
            ) }
          </Svg>
          <Typography
            bold
            text={ summary ? String(summary) : '0' }
            style={ styles.centerAmount }
            color={ colors.text }
          />

        </View>
        <View
          style={ styles.infoBox }
        >
          <View style={ styles.infoRow }>
            <Typography bold color={ colors.text } fontSize={ 14 } text={ summary ? String(summary) : '0' } />
            <Typography
              text={ t('screens.Home.widgetWorkers.total') }
              color={ colors.secondaryText }
              fontSize={ 12.8 }
              style={ styles.active }
            />
          </View>
          <View style={ styles.infoRow }>
            <Typography
              bold
              color={ mainColors.green }
              fontSize={ 14 }
              text={ activeWork ? String(activeWork) : '0' }
            />
            <Typography
              text={ t('screens.Home.widgetWorkers.active') }
              color={ colors.secondaryText }
              fontSize={ 12.8 }
              style={ styles.active }
            />
          </View>
          <View style={ styles.infoRow }>
            <Typography
              color={ mainColors.red }
              fontSize={ 14 }
              bold
              text={ inactiveWork ? String(inactiveWork) : '0' }
            />
            <Typography
              text={ t('screens.Home.widgetWorkers.unactive') }
              color={ colors.secondaryText }
              fontSize={ 12.8 }
              style={ styles.active }
            />
          </View>
        </View>
      </View>

    </WidgetContainer>
  );
};

export default WidgetWorkers;
