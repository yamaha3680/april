import * as React from 'react';
import {SVGTemplate} from './index';
import {FC} from 'react';
import {SvgProps} from 'react-native-svg/src/elements/Svg';
import {Path} from 'react-native-svg';
export const FileSVG: FC<SvgProps> = props => (
  <SVGTemplate viewBox="0 0 32 32" {...props}>
    <Path fill="currentColor" d="M15.331 6H8.5v20h15V14.154h-8.169z" />
    <Path fill="currentColor" d="M18.153 6h-.009v5.342H23.5v-.002z" />
  </SVGTemplate>
);
