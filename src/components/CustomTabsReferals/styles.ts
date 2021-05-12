import { Dimensions, StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';
import { mainColors } from 'constants/colors';

export const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 0,
    height: perfectSize(45),
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorStyle: {
    width: perfectSize(150),
    left: (Dimensions.get('window').width / 2 - 150) / 2,
    backgroundColor: mainColors.blue,
  },
  container: {
    paddingHorizontal: perfectSize(8),
  },
  tabBarElem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: 'green',
    marginVertical: perfectSize(16),
    marginHorizontal: perfectSize(8),
  },
  link: {
    width: '100%',
    height: perfectSize(56),
    borderRadius: perfectSize(15),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: perfectSize(16),
  },
  shadowLine: {
    position: 'absolute',
    bottom: 0,
    zIndex: -2,
    width: '100%',
    height: perfectSize(2),
  },
});
