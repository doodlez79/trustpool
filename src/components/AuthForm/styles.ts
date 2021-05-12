import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  emailInput: {
    marginBottom: perfectSize(20),
    width: '100%',
  },
  container: {
    width: '100%', flex: 1, justifyContent: 'center',
  },
  passwordInput: {
    width: '100%',
  },
  formStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
