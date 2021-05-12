import { StyleSheet } from 'react-native';

import { RFValue } from 'helpers/FontSizePerfect';
import { alignTextConfig } from 'components/Typography/Typography.types';

import { lightThemeColors } from 'constants/colors';

export const styles = StyleSheet.create({
  title: {
    color: lightThemeColors.text,
    fontFamily: 'OpenSans-Regular',
    fontSize: RFValue(16),
    textAlign: alignTextConfig.CENTER,
  },
});
