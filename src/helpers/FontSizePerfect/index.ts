import { isIphoneX } from 'react-native-iphone-x-helper';
import { Platform, StatusBar, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const standardLength = width > height ? width : height;

let offset: number | undefined = 0;
if (width < height) {
  if (Platform.OS === 'ios') {
    offset = 78;
  } else {
    offset = StatusBar.currentHeight;
  }
}

const deviceHeight = isIphoneX() || Platform.OS === 'android'
  ? standardLength - offset!
  : standardLength;

export function RFValue(fontSize: number, standardScreenHeight = 680) {
  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
  // return fontSize;
}
