import { Dimensions, StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  container: {
    width: (Dimensions.get('window').width / 2) - 12,
    borderRadius: perfectSize(30),
    paddingBottom: perfectSize(20),
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: perfectSize(10),
  },
  mainBox: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    alignSelf: 'center',
    top: '58%',
    width: perfectSize(11),
    right: perfectSize(5),
    height: perfectSize(6),
    transform: [{ rotate: '-90deg' }],
  },
});
