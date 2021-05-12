import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';
// import { colors, fonts, metrics } from 'styles';

export const styles = StyleSheet.create({
  infoItem: {
    marginBottom: perfectSize(20),
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
  },
  mL: {
    marginLeft: perfectSize(3),
  },
});
