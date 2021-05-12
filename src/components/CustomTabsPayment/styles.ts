import { Dimensions, StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';
import { mainColors } from 'constants/colors';

export const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 0,
    height: perfectSize(45),
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorStyle: {
    width: perfectSize(150),
    left: (Dimensions.get('window').width / 2 - 150) / 2,
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
