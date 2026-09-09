import React, { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme/colors';

export function Screen({children,scroll=true,style}:{children:React.ReactNode;scroll?:boolean;style?:StyleProp<ViewStyle>}) {
  const body=<View style={[styles.inner, style]}>{children}</View>;
  return <SafeAreaView style={styles.safe} edges={['top','bottom']}><KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==='ios'?'padding':undefined}>{scroll?<ScrollView contentContainerStyle={{paddingBottom:30}} showsVerticalScrollIndicator={false}>{body}</ScrollView>:body}</KeyboardAvoidingView></SafeAreaView>;
}
const styles=StyleSheet.create({safe:{flex:1,backgroundColor:colors.canvas},inner:{paddingHorizontal:spacing.xl,paddingTop:12,flexGrow:1}});
