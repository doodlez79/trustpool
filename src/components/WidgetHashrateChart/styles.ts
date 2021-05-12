import { StyleSheet } from 'react-native';

import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  container: {
    borderRadius: perfectSize(30),
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginHorizontal: perfectSize(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: perfectSize(21),
  },
  timeRow: {
    marginHorizontal: perfectSize(20),
    marginTop: perfectSize(21),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

  },
  line: {
    marginHorizontal: 20,
    marginTop: -2,
    height: 2,
    zIndex: -2,
  },
  infoBox: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    height: perfectSize(101),
    zIndex: 200,
  },
  infoRowBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoRowBoxMore: {
    flexDirection: 'row',
    marginTop: perfectSize(10),
    justifyContent: 'space-around',
  },
  icon: {
    width: perfectSize(20),
    height: perfectSize(16),
  },
});
