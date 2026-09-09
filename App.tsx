import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useApp, AppProvider } from './src/store/app';
import { Onboarding } from './src/screens/Onboarding';
import { Lock } from './src/screens/Lock';
import { Home } from './src/screens/Home';
import { Activity } from './src/screens/Activity';
import { Network } from './src/screens/Network';
import { Settings } from './src/screens/Settings';
import { Send } from './src/screens/Send';
import { Receive } from './src/screens/Receive';
import { TxDetail } from './src/screens/TxDetail';
import { BackupPhrase } from './src/screens/BackupPhrase';
import { Icon } from './src/components/Icons';
import { colors } from './src/theme/colors';
import { fonts } from './src/theme/typography';

const Stack=createNativeStackNavigator(); const Tabs=createBottomTabNavigator();
function Main(){const{wallet,authenticated}=useApp();if(!wallet)return <Onboarding/>;if(!authenticated)return <Lock/>;return <NavigationContainer theme={{...DefaultTheme,colors:{...DefaultTheme.colors,background:colors.canvas,card:colors.canvas,text:colors.text,border:colors.hairline,primary:colors.gold}}}><Stack.Navigator screenOptions={{headerShown:false,animation:'slide_from_right'}}><Stack.Screen name="Tabs" component={TabsRoot}/><Stack.Screen name="Send" component={Send}/><Stack.Screen name="Receive" component={Receive}/><Stack.Screen name="TxDetail" component={TxDetail}/><Stack.Screen name="BackupPhrase" component={BackupPhrase}/></Stack.Navigator></NavigationContainer>}
function TabsRoot(){return <Tabs.Navigator screenOptions={{headerShown:false,tabBarActiveTintColor:colors.text,tabBarInactiveTintColor:colors.muted,tabBarStyle:{height:74,paddingTop:7,paddingBottom:12,backgroundColor:colors.card,borderTopColor:colors.hairline},tabBarLabelStyle:{fontFamily:fonts.text,fontSize:11,fontWeight:'700'}}}><Tabs.Screen name="Home" component={Home} options={{tabBarIcon:({color,size})=><Icon name="home" size={size} color={color}/>}}/><Tabs.Screen name="Activity" component={Activity} options={{tabBarIcon:({color,size})=><Icon name="activity" size={size} color={color}/>}}/><Tabs.Screen name="Network" component={Network} options={{tabBarIcon:({color,size})=><Icon name="network" size={size} color={color}/>}}/><Tabs.Screen name="Settings" component={Settings} options={{tabBarIcon:({color,size})=><Icon name="settings" size={size} color={color}/>}}/></Tabs.Navigator>}
export default function App(){return <SafeAreaProvider><AppProvider><Main/><StatusBar style="dark"/></AppProvider></SafeAreaProvider>}
