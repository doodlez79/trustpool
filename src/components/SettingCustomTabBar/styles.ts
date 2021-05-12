import { StyleSheet } from 'react-native';
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
    height: perfectSize(2),
    backgroundColor: mainColors.blue,
    width: perfectSize(150),
    left: '3%',
  },
  shadowLine: {
    position: 'absolute',
    bottom: 0,
    zIndex: -2,
    width: '100%',
    height: perfectSize(2),
  },
});
