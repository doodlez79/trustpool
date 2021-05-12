import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: perfectSize(90),
    marginBottom: perfectSize(20),
    borderRadius: perfectSize(15),
    paddingHorizontal: perfectSize(16),
    paddingVertical: perfectSize(10),
    position: 'relative',
  },
  indicator: {
    width: perfectSize(5),
    height: perfectSize(5),
    borderRadius: perfectSize(5),
    marginRight: perfectSize(5),
  },
  coinSelector: {
    alignItems: 'center',
    marginVertical: perfectSize(20),
  },
  rows: { flexDirection: 'row', alignItems: 'center' },
  columns: { flexDirection: 'column', flex: 1 },
  icon: {
    position: 'absolute',
    top: '55%',
    width: perfectSize(10),
    height: perfectSize(11),
    transform: [{ rotate: '-90deg' }],
    right: perfectSize(10),
  },
  mL: { marginLeft: perfectSize(62) },
  mT: { marginTop: perfectSize(10) },

});
