import React from 'react';
import { View } from 'react-native';
import { colors, radius } from '../theme/colors';
export function Card({children,tint='white'}:{children:React.ReactNode;tint?:'white'|'soft'}){return <View style={{backgroundColor:tint==='white'?colors.card:colors.goldSoft,borderRadius:radius.lg,borderWidth:1,borderColor:colors.hairline,padding:18}}>{children}</View>}
