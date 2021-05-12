import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  formStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: perfectSize(16),
  },
  row: {
    flexDirection: 'row',
  },
  botBtn: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mT: {
    marginTop: perfectSize(20),
  },
  mainBlock: {
    flex: 1,
    justifyContent: 'center',
  },
});
