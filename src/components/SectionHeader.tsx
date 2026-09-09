import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { type } from '../theme/typography';
export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
    <Text style={{ ...type.headline, color:colors.text }}>{title}</Text>
    {action ? <Pressable hitSlop={10} onPress={onAction}><Text style={{ ...type.bodySmall, color:colors.goldDark, fontWeight:'700' }}>{action}</Text></Pressable> : null}
  </View>;
}
