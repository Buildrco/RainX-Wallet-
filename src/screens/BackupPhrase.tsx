import React from 'react';
import { Alert, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useApp } from '../store/app';
import { loadWallet } from '../store/wallet';
import { colors, radius } from '../theme/colors';
import { type } from '../theme/typography';
import { Button } from '../components/Button';
import { Screen } from '../components/Screen';

export function BackupPhrase(){const navigation=useNavigation<any>(); const {wallet}=useApp(); const phrase=(wallet as any)?.mnemonic||''; const words=phrase.split(' '); const [confirmed,setConfirmed]=React.useState(false);
  return <Screen><Animated.View entering={FadeInDown.duration(500)}><Text style={{...type.title,color:colors.text}}>Recovery phrase</Text><Text style={{...type.body,color:colors.muted,marginTop:8}}>Write these words down offline. Anyone with them can control this wallet.</Text><View style={{flexDirection:'row',flexWrap:'wrap',gap:8,marginTop:22}}>{words.map((word,i)=><View key={`${word}-${i}`} style={{paddingHorizontal:12,paddingVertical:9,borderRadius:radius.sm,borderWidth:1,borderColor:colors.hairline,backgroundColor:colors.card}}><Text style={{...type.bodySmall,color:colors.text}}><Text style={{color:colors.muted}}>{i+1}. </Text>{word}</Text></View>)}</View><View style={{height:24}}><Text style={{...type.caption,color:colors.danger,lineHeight:18}}>RainX will never ask you to send this phrase to support or another person.</Text></View><View style={{height:15}}/><Button title={confirmed?'Saved securely':'I wrote it down'} onPress={()=>{setConfirmed(true); Alert.alert('Backed up','Keep your phrase offline and private.');}}/><View style={{height:12}}/><Button title="Done" variant="ghost" disabled={!confirmed} onPress={()=>navigation.goBack()}/></Animated.View></Screen>;
}
