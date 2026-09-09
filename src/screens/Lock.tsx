import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useApp } from '../store/app';
import { RainXLogo } from '../components/RainXLogo';
import { Button } from '../components/Button';
import { Screen } from '../components/Screen';
import { colors } from '../theme/colors';
import { type } from '../theme/typography';
export function Lock(){const{unlock}=useApp();const[busy,setBusy]=useState(false);const go=async()=>{setBusy(true);await unlock();setBusy(false)};return <Screen><View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Animated.View entering={FadeInDown.duration(450)} style={{alignItems:'center',width:'100%'}}><RainXLogo size={76}/><Text style={{...type.title,color:colors.text,marginTop:22}}>RainX is locked</Text><Text style={{...type.body,color:colors.muted,textAlign:'center',maxWidth:300,marginTop:8}}>Unlock with your device security to access your RXC wallet.</Text><View style={{height:28}}/><Button title="Unlock wallet" loading={busy} onPress={go}/></Animated.View></View></Screen>}
