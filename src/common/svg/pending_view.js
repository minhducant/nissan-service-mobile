import * as React from 'react';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
  Use,
  G,
  Mask,
} from 'react-native-svg';

export const IconPendingView = ({style, fill = '#c3002f'}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={90}
    height={100}
    viewBox="0 0 120 140">
    <Defs>
      <LinearGradient id="c" x1="91.284%" x2="25.707%" y1="100%" y2="0%">
        <Stop offset="0%" stopColor="#c3002f" />
        <Stop offset="100%" stopColor="#c3002f" />
      </LinearGradient>
      <Circle id="b" cx={56} cy={76.614} r={56} />
      <Path
        id="d"
        d="M56 122.807c30.928 0 56-25.135 56-56.14V0H0v66.667c0 31.005 25.072 56.14 56 56.14z"
      />
      <Path
        id="f"
        d="M22 6.015h62.315L100.5 22.556v92.274c0 9.388-7.611 17-17 17H31c-9.389 0-17-7.612-17-17V14.015a8 8 0 018-8z"
      />
    </Defs>
    <G fill="none" fillRule="evenodd" transform="translate(4 2)">
      <Use fill="#000" filter="url(#a)" xlinkHref="#b" />
      <Use fill="url(#c)" xlinkHref="#b" />
      <G transform="translate(0 10)">
        <Mask id="e" fill="#fff">
          <Use xlinkHref="#d" />
        </Mask>
        <G mask="url(#e)">
          <Use fill="#FFF" xlinkHref="#f" />
          <Path
            stroke="#A1ACBA"
            strokeWidth={2}
            d="M99.5 22.964L83.894 7.015H22a7 7 0 00-7 7V114.83c0 8.836 7.163 16 16 16h52.5c8.837 0 16-7.164 16-16V22.964z"
          />
        </G>
        <Path
          stroke="#A1ACBA"
          strokeWidth={2}
          d="M84.8 27.505c2.606-2.483 6.615-6.239 6.988-6.878.304-.522.413-1.057.413-2.073 0-.633-.141-1.24-.435-1.876-.491-1.064-1.398-2.209-3-3.84-.527-.536-2.447-2.393-3.966-3.87v18.537z"
          mask="url(#e)"
          transform="rotate(135 88.5 18.226)"
        />
        <G fill="#000" mask="url(#e)" opacity={0.07}>
          <G transform="translate(23 81)">
            <Path d="M0 0H46.716V6.214H0z" />
            <Path d="M0 8.7H68.812V14.914H0z" />
            <Path d="M0 20.506H42.297V26.72H0z" />
            <Path d="M0 31.07H52.398V37.284H0z" />
          </G>
        </G>
      </G>
      <Path
        stroke="#A1ACBA"
        strokeLinecap="round"
        strokeWidth={2}
        d="M13 14L4 5m14 4V0M1 20h9"
      />
      <G transform="translate(28.491 43.21)">
        <Path
          stroke="#A1ACBA"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.509 17.79c16.5 9 33 0 33 0"
        />
        <Circle cx={48.009} cy={5.289} r={3.5} fill="#A1ACBA" />
        <Circle cx={8.009} cy={5.289} r={3.5} fill="#A1ACBA" />
      </G>
    </G>
  </Svg>
);
