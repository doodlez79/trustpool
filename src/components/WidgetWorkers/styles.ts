import { StyleSheet } from 'react-native';

import { perfectSize } from 'helpers/PerfectSize';
import { lightThemeColors } from 'constants/colors';

export const styles = StyleSheet.create({
  container: {
    width: perfectSize(175),
    height: perfectSize(110),
    borderRadius: perfectSize(30),
    backgroundColor: lightThemeColors.main,
  },
  mainBox: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  pieContainer: {
    marginRight: perfectSize(6),
    position: 'relative',
    justifyContent: 'center',
  },
  centerAmount: {
    position: 'absolute',
    alignSelf: 'center',
  },
  infoBox: {
    flexDirection:
     'column',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  active: {
    marginLeft: perfectSize(3),
  },
});
