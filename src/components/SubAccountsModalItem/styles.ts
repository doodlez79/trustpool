import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';
// import { colors, fonts, metrics } from 'styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    paddingVertical: perfectSize(10),
  },
  icon: {
    width: perfectSize(11),
    height: perfectSize(6),
    transform: [{ rotate: '-90deg' }],
  },
});
