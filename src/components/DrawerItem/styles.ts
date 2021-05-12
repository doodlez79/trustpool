import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';
// import { colors, fonts, metrics } from 'styles';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: perfectSize(10),
    paddingVertical: perfectSize(10),
    borderBottomWidth: perfectSize(2),
    borderColor: '#F8F9FA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
