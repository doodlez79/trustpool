import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

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
