import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  btn: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: perfectSize(24),
    height: perfectSize(24),
    marginBottom: perfectSize(30),
  },
});
