import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  title: {
    marginBottom: perfectSize(20),
  },
  container: {
    position: 'relative',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  picture: {
    height: perfectSize(239),
    width: '100%',
  },
  closeBtn: {
    width: perfectSize(20),
    height: perfectSize(20),
    position: 'absolute',
    right: 20,
    top: 20,
  },
});
