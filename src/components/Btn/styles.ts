import { StyleSheet } from 'react-native';
import { mainColors } from 'constants/colors';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  btn: {
    width: '100%',
    padding: perfectSize(16),
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: mainColors.blue,
    borderRadius: perfectSize(15),
    position: 'relative',
  },
  btnSizeSmall: {
    height: perfectSize(50),
  },
  btnSizeMedium: {
    height: perfectSize(56),
  },
  icon: {
    position: 'absolute',
    right: perfectSize(20),
  },
});
