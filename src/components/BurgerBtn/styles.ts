import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  container: {
    height: perfectSize(24),
    width: perfectSize(24),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
