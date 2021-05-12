import { StyleSheet } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';
import { mainColors } from 'constants/colors';

export const styles = StyleSheet.create({
  container: {
    borderRadius: perfectSize(30),
    width: '100%',
    paddingVertical: perfectSize(20),
    marginBottom: perfectSize(10),
    paddingHorizontal: perfectSize(24),
  },
  input: {
    width: 'auto',
    maxWidth: '50%',
    paddingTop: perfectSize(12),
    paddingBottom: perfectSize(12),
    paddingLeft: perfectSize(10),
    paddingRight: perfectSize(10),
    marginLeft: 20,
    fontWeight: 'bold',
    color: mainColors.blue,
    fontSize: perfectSize(26),
    fontFamily: 'OpenSans-Bold',
  },
  itemTime: {
    paddingVertical: perfectSize(5),
    paddingHorizontal: perfectSize(10),
    borderWidth: 1.5,
    borderRadius: 15,

  },

  containerTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: perfectSize(20),
  },
  icon: {
    width: perfectSize(11),
    height: perfectSize(6),
  },
});
