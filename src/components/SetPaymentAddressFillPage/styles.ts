import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  formStyle: {
    width: '100%',
    paddingHorizontal: perfectSize(16),
    justifyContent: 'space-between',
  },
  mainBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  fEnd: {
    alignSelf: 'flex-end',
    marginBottom: perfectSize(30),
  },
});
