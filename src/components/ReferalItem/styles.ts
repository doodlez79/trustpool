import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: perfectSize(90),
    marginBottom: perfectSize(20),
    borderRadius: perfectSize(15),
    paddingHorizontal: perfectSize(16),
    paddingVertical: perfectSize(10),
    position: 'relative',
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  columns: {
    alignItems: 'flex-start',
    width: '50%',
  },
  mL: { marginLeft: perfectSize(50) },
  mT: { marginTop: perfectSize(10) },
});
