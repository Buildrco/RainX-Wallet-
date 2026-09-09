import React, { PropsWithChildren } from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export function AnimatedPressable({ children, style, ...props }: PropsWithChildren<PressableProps>) {
  const scale = useSharedValue(1);
  const animated = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Pressable
      {...props}
      onPressIn={(e) => { scale.value = withSpring(0.975, { damping: 17, stiffness: 340 }); props.onPressIn?.(e); }}
      onPressOut={(e) => { scale.value = withSpring(1, { damping: 17, stiffness: 340 }); props.onPressOut?.(e); }}
      style={style}
    >
      <Animated.View style={animated}>{children}</Animated.View>
    </Pressable>
  );
}
