import React from 'react';
import LottieView from 'lottie-react-native';
import source from '../../assets/lottie/rainx-success.json';
export function SuccessLottie({size=120}:{size?:number}){return <LottieView source={source} autoPlay loop={false} style={{width:size,height:size}}/>}
