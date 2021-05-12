import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  earningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
    justifyContent: 'space-between',
    width: '100%',
    flexGrow: 1,
    flexShrink: 0,
  },
  icon: {
    width: perfectSize(11),
    height: perfectSize(6),
  },
});
