import { Dimensions, StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

const { height } = Dimensions.get('window');
export const styles = StyleSheet.create({

  iconContainer: {
    marginTop: perfectSize(3),
    width: perfectSize(10),
    height: perfectSize(6),
  },
  container: {
    maxHeight: height / 2,
  },
});
