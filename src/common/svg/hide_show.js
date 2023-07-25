import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IcHideShow = ({style, fill = '#c3002f'}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round">
    <Path d="m7 15 5 5 5-5M7 9l5-5 5 5" fill={fill} />
  </Svg>
);
