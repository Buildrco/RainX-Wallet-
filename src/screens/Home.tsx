import React, { useEffect, useState } from 'react';
import { RefreshControl, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { colors, radius, spacing } from '../theme/colors';
import { type } from '../theme/typography';
import { useApp } from '../store/app';
import { getHistory, getBlocks, formatRxcAtomic, Transaction, Block } from '../services/chain';
import { addressFromPublicKey, bytesFromHex } from '../utils/crypto';
import { Screen } from '../components/Screen';
import { RainXLogo } from '../components/RainXLogo';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { TxRow } from '../components/TxRow';
import { SectionHeader } from '../components/SectionHeader';
import { Icon } from '../components/Icons';

export function Home({navigation}:any){
 const {wallet,balance,status,rpcUrl,refresh}=useApp(); const [history,setHistory]=useState<Transaction[]>([]); const [blocks,setBlocks]=useState<Block[]>([]); const [refreshing,setRefreshing]=useState(false);
 const load=async()=>{ if(!wallet)return; const [h,b]=await Promise.allSettled([getHistory(rpcUrl,wallet.address),getBlocks(rpcUrl,3)]); if(h.status==='fulfilled')setHistory(h.value); if(b.status==='fulfilled')setBlocks(b.value); };
 useEffect(()=>{load()},[wallet?.address,rpcUrl,status?.height]);
 const onRefresh=async()=>{setRefreshing(true); await refresh(); await load(); setRefreshing(false)};
 return <Screen><Animated.View entering={FadeInDown.duration(450)}><View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}><View style={{flexDirection:'row',alignItems:'center',gap:10}}><RainXLogo size={40}/><View><Text style={{...type.body,color:colors.text,fontWeight:'800'}}>RainX Wallet</Text><Text style={{...type.caption,color:colors.muted}}>Native RXC</Text></View></View><View style={{flexDirection:'row',alignItems:'center',gap:7,backgroundColor:status?colors.successSoft:colors.dangerSoft,paddingHorizontal:10,paddingVertical:7,borderRadius:99}}><View style={{width:7,height:7,borderRadius:99,backgroundColor:status?colors.success:colors.danger}}/><Text style={{...type.caption,color:status?colors.success:colors.danger}}>{status?'Online':'Offline'}</Text></View></View>
 <View style={{marginTop:30,alignItems:'center'}}><Text style={{...type.caption,color:colors.muted}}>TOTAL RXC</Text><Text style={{...type.amount,color:colors.text,marginTop:7}}>{formatRxcAtomic(balance)}</Text><Text style={{...type.bodySmall,color:colors.muted,marginTop:4}}>Native balance • no artificial USD rate</Text></View>
 <View style={{flexDirection:'row',gap:10,marginTop:24}}>{[['arrow-up','Send','danger'],['arrow-down','Receive','success']].map(([icon,label,tone])=><AnimatedPressable key={label} style={{flex:1}} onPress={()=>navigation.navigate(label)}><View style={{height:54,borderRadius:radius.md,backgroundColor:tone==='danger'?colors.ink:colors.goldSoft,alignItems:'center',justifyContent:'center',flexDirection:'row',gap:8}}><Icon name={icon} size={19} color={tone==='danger'?colors.white:colors.text}/><Text style={{...type.bodySmall,color:tone==='danger'?colors.white:colors.text,fontWeight:'800'}}>{label}</Text></View></AnimatedPressable>)}</View>
 <View style={{marginTop:28}}><SectionHeader title="RainX Coin" action="Network" onAction={()=>navigation.navigate('Network')}/><Animated.View entering={FadeInRight.duration(450)}><View style={{backgroundColor:colors.card,borderWidth:1,borderColor:colors.hairline,borderRadius:radius.lg,padding:16,flexDirection:'row',alignItems:'center'}}><View style={{width:46,height:46,borderRadius:15,backgroundColor:colors.ink,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:21,fontWeight:'900',color:colors.gold}}>R</Text></View><View style={{flex:1,marginLeft:12}}><Text style={{...type.body,fontWeight:'800',color:colors.text}}>RainX Coin</Text><Text style={{...type.caption,color:colors.muted,marginTop:3}}>RXC • {status?.height ?? '—'} blocks</Text></View><Text style={{...type.body,fontWeight:'800',color:colors.text}}>{formatRxcAtomic(balance)} RXC</Text></View></Animated.View></View>
 <View style={{marginTop:28}}><SectionHeader title="Recent activity" action={history.length?'See all':undefined} onAction={()=>navigation.navigate('Activity')}/><View style={{backgroundColor:colors.card,borderWidth:1,borderColor:colors.hairline,borderRadius:radius.lg,paddingHorizontal:16}}>{history.length?history.slice(-4).reverse().map((tx,i)=><TxRow key={txMemoKey(tx,i)} kind={txKind(tx,wallet?.address||'')} amount={formatRxcAtomic(tx.outputs?.reduce((n,o)=>n+o.value,0)||0)} txid={txId(tx)} timestamp={tx.timestamp} onPress={()=>navigation.navigate('TxDetail',{tx})}/>):<View style={{paddingVertical:24,alignItems:'center'}}><Text style={{...type.body,color:colors.muted}}>No RXC activity yet</Text><Text style={{...type.bodySmall,color:colors.muted,marginTop:4}}>Receive or mine RXC to get started.</Text></View>}</View></View>
 <View style={{marginTop:28,marginBottom:12}}><SectionHeader title="Network"/><View style={{flexDirection:'row',gap:10}}>{[['Block height',String(status?.height??'—')],['Mempool',String(status?.mempool??'—')],['Peers','—']].map(([l,v])=><View key={l} style={{flex:1,backgroundColor:colors.card,borderWidth:1,borderColor:colors.hairline,borderRadius:radius.md,padding:14}}><Text style={{...type.caption,color:colors.muted}}>{l}</Text><Text style={{...type.headline,color:colors.text,marginTop:5}}>{v}</Text></View>)}</View></View>
 </Animated.View></Screen>
}
const txMemoKey=(t:Transaction,i:number)=>`${t.timestamp}-${i}`;
const txId=(t:Transaction)=>{try{const {transactionId}=require('../utils/transaction');return transactionId(t)}catch{return 'pending'}};
const txKind=(t:Transaction,address:string):'sent'|'received'|'mined'=>{if(!t.inputs.length)return 'mined'; const fromMe=t.inputs.some(i=>i.pubkey&&addressFromPublicKey(bytesFromHex(i.pubkey))===address); return fromMe?'sent':'received';};
