import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    maxHeight: perfectSize(56),
    minWidth: perfectSize(80),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: perfectSize(8),
    paddingVertical: perfectSize(16),
    borderRadius: perfectSize(15),
    margin: perfectSize(5),
  },
});
