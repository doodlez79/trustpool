import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';
import { mainColors } from 'constants/colors';

export const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 0,
    height: perfectSize(45),
  },
  indicatorStyle: {

    backgroundColor: mainColors.blue,
  },
  container: {
    paddingHorizontal: perfectSize(8),
  },
  btn: {
    backgroundColor: 'green',
    marginVertical: perfectSize(16),
    marginHorizontal: perfectSize(8),
  },
  shadowLine: {
    position: 'absolute',
    bottom: 0,
    zIndex: -2,
    width: '100%',
    height: perfectSize(2),
  },
});
