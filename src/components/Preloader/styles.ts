import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';
// import { colors, fonts, metrics } from 'styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  stick: {

    borderRadius: perfectSize(4),
  },
});
