import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    width: '100%',
    height: perfectSize(98),
    marginBottom: perfectSize(30),
  },
  link: {
    width: '100%',
    height: perfectSize(56),
    borderRadius: perfectSize(15),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: perfectSize(16),
  },
});
