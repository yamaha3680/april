import React from 'react';
import {Path} from 'react-native-svg';
import {SvgProps} from 'react-native-svg/src/elements/Svg';
import {FC} from 'react';
import {SVGTemplate} from './index';
export const ClearSVG: FC<SvgProps> = props => (
  <SVGTemplate color="black" viewBox="0 0 32 32" {...props}>
    <Path
      fill="currentColor"
      d="m7.004 23.087 7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z"
    />
  </SVGTemplate>
);
