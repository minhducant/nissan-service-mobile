import React, {useRef} from 'react';
import {Animated, Text, TouchableOpacity, View, FlatList} from 'react-native';
import {reportStyles as styles} from '@styles/index';
import {SCREEN_WIDTH, Colors} from '@styles/index';

const HeaderChart = ({listTitle, onPress, x}) => {
  const flatListRef = useRef(null);
  const actionChangeTab = (index) => {
    onPress(index);
  };

  const translateX = x.interpolate({
    inputRange: [0, (SCREEN_WIDTH - 220) * listTitle.length],
    outputRange: [0, SCREEN_WIDTH - 220],
    extrapolate: 'clamp',
  });
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => actionChangeTab(index)}
        style={{
          ...styles.headerItemCon,
          width: (SCREEN_WIDTH - 220) / listTitle.length,
        }}>
        <Text numberOfLines={2} style={styles.txtTab}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        scrollEnabled={false}
        ref={flatListRef}
        data={listTitle}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
      <Animated.View
        style={{
          ...styles.indicator,
          width: Math.floor((SCREEN_WIDTH - 220) / listTitle.length),
          transform: [{translateX}],
        }}
      />
    </View>
  );
};
export default HeaderChart;
