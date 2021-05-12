import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  scrollViewContainer: {
    justifyContent: 'flex-start',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: perfectSize(16),
  },
  content: {
    justifyContent: 'flex-start',
    width: '100%',
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
