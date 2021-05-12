import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  alertSetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: perfectSize(14),
    borderBottomWidth: 2,
    paddingHorizontal: perfectSize(5),
  },
  chevron: {
    width: 10,
    height: 10,
    transform: [{
      rotate: '-90deg',
    }],
  },
});
