import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/colors';
import { type } from '../theme/typography';
import { AnimatedPressable } from './AnimatedPressable';

export function Button({title,onPress,variant='primary',disabled=false,loading=false,left}:{title:string;onPress:()=>void;variant?:'primary'|'secondary'|'ghost'|'danger';disabled?:boolean;loading?:boolean;left?:React.ReactNode}) {
  const bg=variant==='primary'?colors.ink:variant==='secondary'?colors.goldSoft:variant==='danger'?colors.dangerSoft:'transparent';
  const fg=variant==='primary'?colors.white:variant==='danger'?colors.danger:variant==='secondary'?colors.text:colors.text;
  return <AnimatedPressable disabled={disabled||loading} onPress={onPress} style={{opacity:disabled?.45:1}}><View style={{height:54,borderRadius:radius.md,backgroundColor:bg,alignItems:'center',justifyContent:'center',flexDirection:'row',borderWidth:variant==='ghost'?1:0,borderColor:colors.hairline}}>{loading?<ActivityIndicator color={fg}/>:<>{left?<View style={{marginRight:8}}>{left}</View>:null}<Text style={{...type.body,fontWeight:'800',color:fg}}>{title}</Text></>}</View></AnimatedPressable>;
}
