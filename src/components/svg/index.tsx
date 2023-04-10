import React, {FC} from 'react';
import {SvgProps} from 'react-native-svg/src/elements/Svg';
import Svg from 'react-native-svg';

export const SVGTemplate: FC<SvgProps> = ({children, ...other}) => (
  <Svg {...other}>{children}</Svg>
);
