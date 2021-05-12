import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  icon: {
    width: perfectSize(16),
    height: perfectSize(16),
    transform: [{
      rotate: '0 deg',
    }],
  },
  title: {
    marginBottom: perfectSize(20),
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedItem: {
    marginBottom: perfectSize(20),
  },
});
