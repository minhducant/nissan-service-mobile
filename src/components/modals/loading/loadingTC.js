import React, {useRef, useEffect} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import {Image, LinearGradient, Stop} from 'react-native-svg';
import {Svg, Circle, Defs, ClipPath} from 'react-native-svg';
import PropTypes from 'prop-types';
import {Modal} from 'react-native-paper';
import {Colors} from '@styles/index';

const SIZE = 70;
const strokeWidth = 2;
const radius = (SIZE - strokeWidth) / 2;
const circumference = Math.PI * 2 * radius;
const LOGO = require('@assets/icons/logo.png');
const {timing, loop, multiply} = Animated;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function LoadingIconAnimated({isLoading}) {
  const progress = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    loop(
      timing(progress, {
        toValue: 1,
        duration: 10 * 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      {iterations: -1},
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  //   useEffect(() => {
  //     if (isLoading) {
  //       parallel([
  //         timing(scale, {
  //           toValue: 1,
  //           duration: 5000,
  //           easing: Easing.linear,
  //           useNativeDriver: true,
  //         }),
  //         timing(opacity, {
  //           toValue: 0,
  //           duration: 5000,
  //           easing: Easing.linear,
  //           useNativeDriver: true,
  //         }),
  //       ]).start();
  //     }
  //   }, []);

  const animatedProgress = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [(2 * circumference) / 3, (Math.PI * 2) / 3],
  });

  const strokeDashoffset = multiply(animatedProgress, radius);

  return (
    <Modal contentContainerStyle={stylesLoadingTC.modal} visible={isLoading}>
      <View style={stylesLoadingTC.container}>
        <AnimatedSvg
          width={SIZE}
          height={SIZE}
          style={{
            transform: [{scale}],
            opacity,
          }}>
          <Defs>
            <ClipPath id="clip">
              <Circle cx={SIZE / 2} cy={SIZE / 2} r={radius} />
            </ClipPath>
          </Defs>
          <Defs>
            <LinearGradient id="grad">
              <Stop offset="0" stopColor={Colors.main} stopOpacity="1" />
              <Stop offset="1" stopColor={Colors.main} stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Image
            x={'0%'}
            y={'0%'}
            width={'100%'}
            height={'100%'}
            preserveAspectRatio="xMidYMid slice"
            href={LOGO}
            clipPath="url(#clip)"
          />
          <AnimatedCircle
            r={radius - 2}
            fill="none"
            stroke="url(#grad)"
            cx={SIZE / 2}
            cy={SIZE / 2}
            {...{strokeWidth, strokeDashoffset}}
            strokeDasharray={`${circumference} ${circumference}`}
          />
        </AnimatedSvg>
      </View>
    </Modal>
  );
}

const stylesLoadingTC = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 100,
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

LoadingIconAnimated.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
