import React, {useContext, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  TextBase,
} from 'react-native';
import {reportMenu} from '@data/index';
import {
  SCREEN_WIDTH,
  reportStyles as styles,
  SCREEN_HEIGHT,
  css,
} from '@styles/index';
import {LocalizationContext} from '@context/index';
import {HeaderChart} from '@components/headers/index';
import CarServices from './CarServices';
import AverageCar from './AverageCar';
import AdviserCar from './AdviserCar';
import {FontFamily, FontSizeNormalize, Colors} from '@styles/index';
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import normalize from 'react-native-normalize';

const Tab = createMaterialTopTabNavigator();
export default function ServicesChart() {
  const scrollRef = useRef(null);
  const x = useRef(new Animated.Value(0)).current;
  const [listChild, setListChild] = useState(reportMenu[0].list);
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
    <View style={{flex: 1}}>
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
        <Tab.Screen name="Lượt xe dịch vụ" component={CarServices} />
        <Tab.Screen name="Lượt xe trung bình" component={AverageCar} />
        <Tab.Screen name="Phân bổ lượt xe theo CVDV" component={AdviserCar} />
      </Tab.Navigator>
    </View>
  );
}
