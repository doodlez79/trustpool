import { StyleSheet } from 'react-native';
import { lightThemeColors, mainColors } from 'constants/colors';
import { perfectSize } from 'helpers/PerfectSize';

export const styles = StyleSheet.create({
  label: {
    fontSize: perfectSize(14),
    fontFamily: 'OpenSans-Regular',
    marginBottom: perfectSize(5),
  },
  success: {
    borderColor: mainColors.green,
  },
  error: {
    borderColor: mainColors.red,
  },
  edit: {
    borderColor: mainColors.blue,
  },
  container: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: perfectSize(40),
    width: perfectSize(50),

    position: 'absolute',

    right: perfectSize(20),
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 999,
  },
  leftIcon: {
    height: perfectSize(20),
    width: perfectSize(40),
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 999,
    left: 8,
  },

  text: {
    width: '100%',
    fontSize: perfectSize(16),
    paddingRight: 56,
    fontFamily: 'OpenSans-Regular',
  },
  input: {
    // height: perfectSize(56),
    overflow: 'hidden',
    borderWidth: 1.5,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'OpenSans-Regular',
    color: lightThemeColors.text,
    width: '100%',
    fontSize: perfectSize(16),
  },
  initialText: {
    maxWidth: perfectSize(343),
    width: '100%',
    paddingTop: perfectSize(16),
    paddingBottom: perfectSize(18),
    paddingLeft: perfectSize(16),
  },
});
