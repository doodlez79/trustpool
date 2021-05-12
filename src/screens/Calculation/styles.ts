import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: perfectSize(20),
  },
  containerSelectedCoin: {
    maxWidth: perfectSize(130),
    marginBottom: perfectSize(10),
  },
});
