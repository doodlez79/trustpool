import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    height: perfectSize(44),
    minHeight: perfectSize(44),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: perfectSize(20),
    paddingHorizontal: perfectSize(16),
  },
});
