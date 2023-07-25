import React from 'react';
import Svg, {G, Path, Circle, Ellipse} from 'react-native-svg';

export const IcAppointment = ({style, fill = '#fff'}) => (
  <Svg
    id="calendar"
    xmlns="http://www.w3.org/2000/svg"
    width="23"
    height="23"
    viewBox="0 0 23 23"
    style={style}>
    <G id="Group_7" data-name="Group 7">
      <G id="Group_6" data-name="Group 6">
        <Circle
          id="Ellipse_8"
          data-name="Ellipse 8"
          cx="1"
          cy="1"
          r="1"
          transform="translate(12 9)"
          fill={fill}
        />
        <Circle
          id="Ellipse_9"
          data-name="Ellipse 9"
          cx="1"
          cy="1"
          r="1"
          transform="translate(12 12)"
          fill={fill}
        />
        <Ellipse
          id="Ellipse_10"
          data-name="Ellipse 10"
          cx="1.5"
          cy="1"
          rx="1.5"
          ry="1"
          transform="translate(16 9)"
          fill={fill}
        />
        <Path
          id="Path_48"
          data-name="Path 48"
          d="M22.1,11.23a.9.9,0,0,0,.9-.9V5.391A3.6,3.6,0,0,0,19.406,1.8H18.238V.9a.9.9,0,1,0-1.8,0v.9H12.353V.9a.9.9,0,0,0-1.8,0v.9H6.514V.9a.9.9,0,1,0-1.8,0v.9H3.594A3.6,3.6,0,0,0,0,5.391V19.406A3.6,3.6,0,0,0,3.594,23h11.32A.9.9,0,0,0,15,23c.03,0,.059,0,.089,0a.9.9,0,0,0,.647-.275l7.008-7.277a.9.9,0,0,0-.647-1.522H17.789A3.6,3.6,0,0,0,14.2,17.52V21.2H3.594a1.8,1.8,0,0,1-1.8-1.8V5.391a1.8,1.8,0,0,1,1.8-1.8H4.717v.9a.9.9,0,1,0,1.8,0v-.9h4.043v.9a.9.9,0,0,0,1.8,0v-.9h4.088v.9a.9.9,0,1,0,1.8,0v-.9h1.168a1.8,1.8,0,0,1,1.8,1.8v4.941A.9.9,0,0,0,22.1,11.23ZM15.992,17.52a1.8,1.8,0,0,1,1.8-1.8h2.2l-4,4.151Z"
          fill={fill}
        />
        <Circle
          id="Ellipse_11"
          data-name="Ellipse 11"
          cx="1"
          cy="1"
          r="1"
          transform="translate(5 9)"
          fill={fill}
        />
        <Ellipse
          id="Ellipse_12"
          data-name="Ellipse 12"
          cx="2"
          cy="1"
          rx="2"
          ry="1"
          transform="translate(7 12)"
          fill={fill}
        />
        <Circle
          id="Ellipse_13"
          data-name="Ellipse 13"
          cx="1"
          cy="1"
          r="1"
          transform="translate(5 16)"
          fill={fill}
        />
        <Circle
          id="Ellipse_14"
          data-name="Ellipse 14"
          cx="1"
          cy="1"
          r="1"
          transform="translate(5 12)"
          fill={fill}
        />
        <Ellipse
          id="Ellipse_15"
          data-name="Ellipse 15"
          cx="2"
          cy="1"
          rx="2"
          ry="1"
          transform="translate(7 16)"
          fill={fill}
        />
        <Ellipse
          id="Ellipse_16"
          data-name="Ellipse 16"
          cx="2"
          cy="1"
          rx="2"
          ry="1"
          transform="translate(7 9)"
          fill={fill}
        />
      </G>
    </G>
  </Svg>
);
