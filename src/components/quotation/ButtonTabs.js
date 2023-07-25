import React from 'react';
import {View, Text, Animated, TouchableOpacity} from 'react-native';

import {receptionStyles as styles} from '@styles/index';
import {SCREEN_WIDTH} from '@styles/index';

const AnimatedView = Animated.createAnimatedComponent(View);

const ButtonTabs = ({onPress, x}) => {
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
        <Text style={styles.txtTab}>Thông tin chung</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onCheckOrderActiveTab}
        style={styles.buttonTab}>
        <Text style={styles.txtTab}>Thông tin dịch vụ</Text>
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
