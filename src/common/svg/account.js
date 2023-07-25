import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

export const IcAccount = ({style, onPress, fill = '#c3002f'}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="19"
    viewBox="0 0 19.647 21.083"
    style={style}
    onTouchEnd={onPress}>
    <G id="user" transform="translate(-17.44)">
      <G id="Group_24" data-name="Group 24" transform="translate(17.44 11.875)">
        <G id="Group_23" data-name="Group 23">
          <Path
            id="Path_53"
            data-name="Path 53"
            d="M27.263,288.389c-6.335,0-9.823,3-9.823,8.438a.769.769,0,0,0,.769.769H36.317a.769.769,0,0,0,.769-.769C37.087,291.386,33.6,288.389,27.263,288.389Zm-8.257,7.669c.3-4.069,3.077-6.13,8.257-6.13s7.954,2.061,8.257,6.13Z"
            transform="translate(-17.44 -288.389)"
            fill={fill}
          />
        </G>
      </G>
      <G id="Group_26" data-name="Group 26" transform="translate(22.159)">
        <G id="Group_25" data-name="Group 25">
          <Path
            id="Path_54"
            data-name="Path 54"
            d="M137.153,0a5.043,5.043,0,0,0-5.1,5.206,5.121,5.121,0,1,0,10.208,0A5.043,5.043,0,0,0,137.153,0Zm0,9.208a3.806,3.806,0,0,1-3.565-4,3.5,3.5,0,0,1,3.565-3.668,3.538,3.538,0,0,1,3.565,3.668A3.806,3.806,0,0,1,137.153,9.208Z"
            transform="translate(-132.049)"
            fill={fill}
          />
        </G>
      </G>
    </G>
  </Svg>
);
