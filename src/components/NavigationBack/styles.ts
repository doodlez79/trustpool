import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    paddingLeft: 0,
  },
  icon: {
    width: perfectSize(9),
    height: perfectSize(16),
    marginRight: perfectSize(5),
  },
});
