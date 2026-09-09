import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors, radius } from '../theme/colors';
import { type } from '../theme/typography';
import { Icon } from './Icons';

type Props = { kind: 'sent'|'received'|'mined'; amount: string; txid: string; timestamp?: number; onPress?: () => void };
export function TxRow({ kind, amount, txid, timestamp, onPress }: Props) {
  const outgoing = kind === 'sent';
  const label = kind === 'mined' ? 'Block reward' : outgoing ? 'Sent' : 'Received';
  const icon = kind === 'mined' ? 'network' : outgoing ? 'arrow-up' : 'arrow-down';
  return <Pressable onPress={onPress} style={({pressed})=>({paddingVertical:12,opacity:pressed?.75:1})}>
    <View style={{flexDirection:'row',alignItems:'center'}}>
      <View style={{width:42,height:42,borderRadius:15,backgroundColor:outgoing?colors.dangerSoft:colors.successSoft,alignItems:'center',justifyContent:'center'}}><Icon name={icon} size={19} color={outgoing?colors.danger:colors.success}/></View>
      <View style={{flex:1,marginLeft:12}}><Text style={{...type.body,color:colors.text,fontWeight:'700'}}>{label}</Text><Text numberOfLines={1} style={{...type.caption,color:colors.muted,marginTop:2}}>{txid.slice(0,10)}…{txid.slice(-6)}</Text></View>
      <View style={{alignItems:'flex-end'}}><Text style={{...type.body,fontWeight:'700',color:outgoing?colors.danger:colors.text}}>{outgoing?'−':'+'}{amount} RXC</Text>{timestamp?<Text style={{...type.caption,color:colors.muted,marginTop:3}}>{new Date(timestamp*1000).toLocaleDateString()}</Text>:null}</View>
    </View>
  </Pressable>;
}
