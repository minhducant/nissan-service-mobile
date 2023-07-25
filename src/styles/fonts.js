import normalize from 'react-native-normalize';

export const FontFamily = {
  nissanRegular: 'nissan_regular',
  nissanBold: 'nissan_bold',
  nissanItalic: 'nissan_italic',
  nissanBoldItalic: 'nissan_bold_italic',
};

export const FontSize = {
  xxSmall: 8,
  xSmall: 10,
  small: 12,
  mediumNormal: 13,
  normal: 14,
  smallMedium: 15,
  medium: 16,
  large: 17,
  xLarge: 18,
  mediumXXLarge: 22,
  xxLarge: 25,
  xxxLarge: 30,
};

export const FontSizeNormalize = {
  xLarge: normalize(8),
  large: normalize(7),
  normal: normalize(6),
  small: normalize(5),
  xSmall: normalize(4),
};
