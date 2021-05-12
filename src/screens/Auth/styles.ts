import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  title: {
    marginBottom: perfectSize(20),
  },
  safeAreaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
