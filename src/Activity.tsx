import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Screen } from '../components/Screen';
import { TxRow } from '../components/TxRow';
import { colors, radius } from '../theme/colors';
import { type } from '../theme/typography';
import { getHistory, Transaction } from '../services/chain';
import { useApp } from '../store/app';
import { transactionId } from '../utils/transaction';
export function Activity({navigation}:any){const {wallet,rpcUrl}=useApp();const[items,setItems]=useState<Transaction[]>([]);useEffect(()=>{if(wallet)getHistory(rpcUrl,wallet.address).then(setItems).catch(()=>setItems([]))},[wallet?.address,rpcUrl]);return <Screen><Animated.View entering={FadeInDown.duration(400)}><Text style={{...type.title,color:colors.text}}>Activity</Text><Text style={{...type.bodySmall,color:colors.muted,marginTop:5}}>Confirmed transactions read from the RainX node.</Text><View style={{marginTop:18,backgroundColor:colors.card,borderWidth:1,borderColor:colors.hairline,borderRadius:radius.lg,paddingHorizontal:16}}>{items.length?items.slice().reverse().map((tx,i)=><TxRow key={transactionId(tx)+i} kind={i%3===0?'received':'sent'} amount={String((tx.outputs?.[0]?.value||0)/100000000)} txid={transactionId(tx)} timestamp={tx.timestamp} onPress={()=>navigation.navigate('TxDetail',{tx})}/>):<View style={{paddingVertical:38,alignItems:'center'}}><Text style={{...type.body,color:colors.muted}}>No transactions</Text></View>}</View></Animated.View></Screen>}
