import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({

  icon: {
    position: 'absolute',
    top: '55%',
    width: perfectSize(10),
    height: perfectSize(11),
    transform: [{ rotate: '-90deg' }],
    right: perfectSize(16),
  },
  itemContainer: {
    width: '100%',
    height: perfectSize(90),
    marginBottom: perfectSize(20),
    borderRadius: perfectSize(15),
    paddingHorizontal: perfectSize(16),
    paddingVertical: perfectSize(10),
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: perfectSize(10),
  },

});
