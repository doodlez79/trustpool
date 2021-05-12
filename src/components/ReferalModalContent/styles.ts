import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  container: {
    maxHeight: perfectSize(428),
    width: '100%',
    paddingHorizontal: perfectSize(16),
  },
  scrollContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 40,
  },
  rulesBlock: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: perfectSize(8),
    paddingLeft: perfectSize(8),
  },
  rulesText: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: perfectSize(20),
  },
  rulesStrings: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: perfectSize(11),
  },
});
