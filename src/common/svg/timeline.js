import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IcTimeLine = ({style, fill = '#c3002f'}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 410.916 410.916"
    xmlSpace="preserve">
    <Path
      fill={fill}
      d="M410.916 375.424v22.413H0V13.079h22.413v362.35h388.502v-.005zM308.185 38.854H52.301V64.07h255.884V38.854zm-82.181 46.132H89.66v25.215h136.345V84.986zm-20.546 63.038h136.344v-25.215H205.458v25.215zm4.667 54.452H73.78v25.216h136.345v-25.216zm0 68.645v-25.214h-82.178v25.214h82.178zm85.92 32.217V278.12H216.66v25.218h79.385zm6.064 31.751h79.387v-25.214h-79.387v25.214z"
    />
  </Svg>
);
