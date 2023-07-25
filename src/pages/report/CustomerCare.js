import React, {useContext, useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Animated, ScrollView} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

import {reportMenu} from '@data/index';
import {
  SCREEN_WIDTH,
  Colors,
  reportStyles as styles,
  SCREEN_HEIGHT,
} from '@styles/index';
import {LocalizationContext} from '@context/index';
import {HeaderChart} from '@components/headers/index';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
export default function CustomerCareChart() {
  const scrollRef = useRef(null);
  const {t} = useContext(LocalizationContext);
  const x = useRef(new Animated.Value(0)).current;
  const [listChild, setListChild] = useState(reportMenu[3].list);
  const onScroll = Animated.event([{nativeEvent: {contentOffset: {x}}}], {
    useNativeDriver: false,
  });
  const data = {
    labels: [
      'Test1',
      'Test2',
      'Test1',
      'Test2',
      'Test1',
      'Test2',
      'Test1',
      'Test2',
      'Test1',
      'Test2',
      'Test1',
      'Test2',
    ],
    legend: ['L1', 'L2'],
    data: [
      [65, 60],
      [30, 30],
      [65, 60],
      [65, 60],
      [65, 60],
      [65, 60],
      [65, 60],
      [30, 30],
      [65, 60],
      [65, 60],
      [65, 60],
      [65, 60],
    ],
    barColors: ['#6BB6B1', '#FF7500'],
  };
  const onChangeTab = (index) => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTo({
        x: index * (SCREEN_WIDTH - 220),
        y: 0,
        animate: true,
      });
    }
  };
  return (
    <View style={{flex: 1, paddingTop: 5}}>
      <HeaderChart listTitle={listChild} x={x} onPress={onChangeTab} />
      <AnimatedScrollView
        horizontal
        pagingEnabled
        style={{flex: 1}}
        onScroll={onScroll}
        ref={scrollRef}>
        {listChild.map((it, idx) => {
          return (
            <View
              style={{
                width: SCREEN_WIDTH - 220,
                flex: 1,
              }}
              key={idx.toString()}>
              <StackedBarChart
                data={data}
                width={SCREEN_WIDTH - 240}
                height={(3 * SCREEN_HEIGHT) / 4}
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  color: (opacity = 1) => 'black',
                  labelColor: (opacity = 1) => 'black',
                  // style: {
                  //   borderRadius: 16,
                  // },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: 'blue',
                  },
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  alignItems: 'center',
                }}
              />
            </View>
          );
        })}
      </AnimatedScrollView>
    </View>
  );
}
