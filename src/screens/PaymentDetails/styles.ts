import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  mT: {
    marginTop: perfectSize(20),
  },
  container: {
    paddingLeft: perfectSize(16),
    marginTop: perfectSize(40),
    paddingRight: perfectSize(20),
    alignItems: 'flex-start',
  },
  mL: {
    marginLeft: perfectSize(3),
  },
});
