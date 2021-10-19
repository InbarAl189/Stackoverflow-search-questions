import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { WHITE } from '../../constants/Constants';

interface Props {
  isOn: boolean,
  action(): void
}

const ToggleSwitch = ({ isOn, action }: Props) => {
  const anim = useSharedValue(isOn ? 1 : 0);
  const r = useSharedValue(isOn ? 72 : 216);
  const g = useSharedValue(isOn ? 207 : 216);
  const b = useSharedValue(isOn ? 83 : 216);

  useEffect(() => {
    anim.value = withTiming(isOn ? 1 : 0, { duration: 200 });
    r.value = withTiming(isOn ? 72 : 216, { duration: 200 });
    g.value = withTiming(isOn ? 207 : 216, { duration: 200 });
    b.value = withTiming(isOn ? 83 : 216, { duration: 200 });
  }, [isOn]);

  const translation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: anim.value * 20 }]
    };
  });

  const color = useAnimatedStyle(() => {
    return {
      backgroundColor: `rgb(${r.value},${g.value},${b.value})`
    };
  });

  return (
    <Pressable onPress={action}>
      <Animated.View style={[styles.outerView, color]}>
        <Animated.View style={[styles.innerView, translation]} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  outerView: {
    height: 30,
    width: 50,
    justifyContent: 'center',
    borderRadius: 15
  },
  innerView: {
    backgroundColor: WHITE,
    height: 25,
    width: 25,
    left: 2.5,
    borderRadius: 12.5

  }
});

export default ToggleSwitch;
