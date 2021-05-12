import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  container: {
    height: perfectSize(428),
    width: '100%',
  },
  scrollViewContainer: {
    paddingHorizontal: perfectSize(16),
  },
  infoBlock: {
    marginBottom: 20,
    paddingHorizontal: perfectSize(16),
  },
  note: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
});
