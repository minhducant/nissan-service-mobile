import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Animated, TouchableOpacity} from 'react-native';

import {LocalizationContext} from '@context/index';
import {receptionStyles as styles} from '@styles/index';
import {Colors, SCREEN_WIDTH, css} from '@styles/index';

const AnimatedView = Animated.createAnimatedComponent(View);

const ButtonTabs = ({onPress, x}) => {
  const {t} = useContext(LocalizationContext);
  const onCustomerActiveTab = () => {
    onPress(0);
  };

  const onCheckOrderActiveTab = () => {
    onPress(1);
  };

  const translateX = x.interpolate({
    inputRange: [0, SCREEN_WIDTH * 2],
    outputRange: [0, SCREEN_WIDTH / 3.5],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.buttonTabsCon}>
      <TouchableOpacity onPress={onCustomerActiveTab} style={styles.buttonTab}>
        <Text style={styles.txtTab}>{t('customer')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onCheckOrderActiveTab}
        style={styles.buttonTab}>
        <Text style={styles.txtTab}>{t('check_order')}</Text>
      </TouchableOpacity>
      <AnimatedView
        style={{
          ...styles.indicator,
          transform: [{translateX}],
        }}
      />
    </View>
  );
};
export default React.memo(ButtonTabs);
