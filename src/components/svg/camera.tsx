import React, {FC} from 'react';
import {SvgProps} from 'react-native-svg/src/elements/Svg';
import {SVGTemplate} from './index';
import {Path} from 'react-native-svg';
export const CameraSVG: FC<SvgProps> = props => (
  <SVGTemplate viewBox="0 0 32 32" {...props}>
    <Path
      fill="currentColor"
      d="M16 12.906a4.47 4.47 0 0 0 0 8.938 4.47 4.47 0 0 0 4.469-4.469A4.47 4.47 0 0 0 16 12.906zm0 7.063a2.577 2.577 0 1 1-.002-5.154A2.577 2.577 0 0 1 16 19.969z"
    />
    <Path
      fill="currentColor"
      d="M25.625 9.812h-4.812l-2.062-2.75h-5.5l-2.062 2.75H6.375C5.618 9.812 5 10.43 5 11.188v12.375c0 .756.618 1.375 1.375 1.375h19.25c.757 0 1.375-.617 1.375-1.375V11.188c0-.758-.618-1.376-1.375-1.376zM16 23.477a6.103 6.103 0 1 1 .001-12.205A6.103 6.103 0 0 1 16 23.477zm9.625-10.399h-2.75v-1.375h2.75v1.375z"
    />
  </SVGTemplate>
);
