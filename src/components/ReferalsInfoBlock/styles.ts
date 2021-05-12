import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  scrollViewContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: perfectSize(40),
  },
  infoBlock: {
    marginBottom: perfectSize(20),
    paddingHorizontal: perfectSize(16),
  },
});
