import { StyleSheet } from 'react-native';

import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  mainBox: {
    width: '100%',
    minWidth: 100,
    height: perfectSize(40),
    borderRadius: perfectSize(40),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: perfectSize(5),
  },
  iconBox: {
    marginLeft: perfectSize(5),
    width: perfectSize(30),
    height: perfectSize(30),
  },
  iconChevron: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    width: perfectSize(11),
    right: perfectSize(7),
    height: perfectSize(6),
  },
  activeChevron: {
    transform: [{ rotate: '180deg' }],
  },
  username: {
    marginHorizontal: perfectSize(20),
  },
  coin: {
    marginHorizontal: perfectSize(15),
  },
  amount: {
    marginLeft: perfectSize(10),
  },
});
