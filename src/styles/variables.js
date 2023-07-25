import {Dimensions} from 'react-native';
import normalize from 'react-native-normalize';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const IconSize = {
  normal: normalize(25, 'height'),
  large: normalize(30, 'height'),
};
