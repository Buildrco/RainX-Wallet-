import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '../theme/colors';

export function RainXLogo({ size = 44 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="48" fill={colors.ink}/>
      <Circle cx="50" cy="50" r="32" fill={colors.gold}/>
      <Path d="M38 32h19c9 0 14 4.5 14 10.9 0 4.9-3 8.2-7.8 9.6L73 68H63.5l-8.6-13h-8.3v13H38zm8.6 6.2v10.4h10c4.4 0 6.8-1.7 6.8-5.2s-2.4-5.2-6.8-5.2z" fill={colors.ink}/>
      <Path d="M33 69c5 3 10.7 4.8 17 4.8S62 72 67 69" fill="none" stroke="#FFF4CE" strokeWidth="2.3" strokeLinecap="round" opacity=".55"/>
    </Svg>
  );
}
