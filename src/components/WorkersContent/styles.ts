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
  columns: { flexDirection: 'column' },
  icon: {
    position: 'absolute',
    top: '55%',
    width: perfectSize(10),
    height: perfectSize(11),
    transform: [{ rotate: '-90deg' }],
    right: perfectSize(20),
  },
  mL: { marginLeft: perfectSize(62) },
  mT: { marginTop: perfectSize(10) },
  rightAction: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    width: 60,
    marginLeft: 20,
    borderRadius: 15,
  },
  emptyView: {
    alignItems: 'center',
    position: 'relative',
    zIndex: 1000,
    width: '100%',
    justifyContent: 'center',
    marginVertical: perfectSize(20),
    paddingHorizontal: 16,
    top: '25%',
  },
});
