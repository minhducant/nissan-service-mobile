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
  FontSizeNormalize,
  FontFamily,
} from '@styles/index';
import {LocalizationContext} from '@context/index';
import {HeaderChart} from '@components/headers/index';
import ServicesRevenue from './ServicesRevenue';
import AverageRevenue from './AverageRevenue';
import TaskRevenue from './TaskRevenue';
import ObjectPaymentRevenue from './ObjectPaymentRevenue';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
export default function RevenueChart() {
  const scrollRef = useRef(null);
  const {t} = useContext(LocalizationContext);
  const x = useRef(new Animated.Value(0)).current;
  const [listChild, setListChild] = useState(reportMenu[1].list);
  const onScroll = Animated.event([{nativeEvent: {contentOffset: {x}}}], {
    useNativeDriver: false,
  });
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
    // <View style={{flex: 1, paddingTop: 5}}>
    //   <HeaderChart listTitle={listChild} x={x} onPress={onChangeTab} />
    //   <AnimatedScrollView
    //     horizontal
    //     pagingEnabled
    //     style={{flex: 1}}
    //     onScroll={onScroll}
    //     ref={scrollRef}>
    //     <ServicesRevenue />
    //     <AverageRevenue />
    //     <TaskRevenue />
    //     <ObjectPaymentRevenue />

    //   </AnimatedScrollView>
    // </View>
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.main,
        inactiveTintColor: Colors.black,
        labelStyle: {
          fontFamily: FontFamily.nissanRegular,
          fontSize: FontSizeNormalize.xSmall,
        },
        indicatorStyle: {backgroundColor: Colors.main},
      }}>
      <Tab.Screen name="Doanh thu dịch vụ" component={ServicesRevenue} />
      <Tab.Screen name="Doanh thu trung bình" component={AverageRevenue} />
      <Tab.Screen
        name="Doanh thu theo loại công việc"
        component={TaskRevenue}
      />
      <Tab.Screen
        name="Doanh thu theo đối tượng thanh toán"
        component={ObjectPaymentRevenue}
      />
    </Tab.Navigator>
  );
}
