import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';
import { mainColors } from 'constants/colors';

export const styles = StyleSheet.create({
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: perfectSize(16),
    width: perfectSize(250),
    paddingVertical: perfectSize(12),
    borderRadius: perfectSize(15),
    borderWidth: perfectSize(1.5),
    borderColor: 'transparent',

  },
  active: {
    borderColor: mainColors.blue,
  },
});
