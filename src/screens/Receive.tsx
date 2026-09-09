import React from 'react';
import { Alert, Text, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useApp } from '../store/app';
import { Screen } from '../components/Screen';
import { Button } from '../components/Button';
import { colors, radius } from '../theme/colors';
import { type } from '../theme/typography';
import QRCode from 'react-native-qrcode-svg';
export function Receive(){const{wallet}=useApp();const copy=async()=>{if(!wallet)return;await Clipboard.setStringAsync(wallet.address);Alert.alert('Copied','Your RXC address is ready to paste.');};return <Screen><Text style={{...type.title,color:colors.text}}>Receive RXC</Text><Text style={{...type.bodySmall,color:colors.muted,marginTop:5}}>Share this RainX address to receive native RXC.</Text><View style={{alignItems:'center',marginTop:34}}><View style={{width:232,height:232,borderRadius:26,backgroundColor:colors.white,borderWidth:1,borderColor:colors.hairline,alignItems:'center',justifyContent:'center'}}>{wallet?.address?<QRCode value={wallet.address} size={184} color={colors.ink} backgroundColor={colors.white}/>:<Text style={{...type.caption,color:colors.muted}}>No address</Text>}</View></View><View style={{marginTop:26,backgroundColor:colors.card,borderWidth:1,borderColor:colors.hairline,borderRadius:radius.lg,padding:17}}><Text style={{...type.caption,color:colors.muted}}>YOUR RXC ADDRESS</Text><Text selectable style={{...type.body,color:colors.text,fontFamily:'monospace',lineHeight:24,marginTop:10}}>{wallet?.address||'—'}</Text></View><View style={{marginTop:14}}><Button title="Copy address" onPress={copy}/></View><Text style={{...type.caption,color:colors.muted,textAlign:'center',marginTop:15}}>Only send RXC on the RainX Network to this address.</Text></Screen>}
