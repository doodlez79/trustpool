import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  rulesBlock: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: perfectSize(8),
    paddingLeft: perfectSize(8),
  },
  rulesText: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: perfectSize(20),
  },
  rulesStrings: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: perfectSize(9),
  },
});
