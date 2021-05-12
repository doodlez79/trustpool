import { StyleSheet } from 'react-native';

import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  coinContainer: {
    width: perfectSize(40),
    height: perfectSize(40),
    marginRight: perfectSize(10),
    overflow: 'hidden',
  },
  infoBox: {
    flexDirection: 'column',
    marginTop: perfectSize(5),
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

  },
  icon: {
    width: perfectSize(10),
    height: perfectSize(10),
    marginLeft: perfectSize(3),
    alignSelf: 'center',
  },
});
