import React, {useEffect, useState, useRef, Suspense, lazy} from 'react';
import {View, Text, TouchableOpacity, Animated, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {Spinner} from 'native-base';

import {receptionStyles as styles} from '@styles/index';
import {SCREEN_WIDTH, Colors} from '@styles/index';
const TableCheckOrder = lazy(() => import('./TableCheckOrder'));
const VehicleBody = lazy(() => import('./VehicleBody'));
const VehicleImage = lazy(() => import('./VehicleImage'));
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
function CheckOrderTab({setIsCapture, disabled, numColumns, receptionId}) {
  const x = useRef(new Animated.Value(0)).current;

  const scrollRef = useRef(null);
  const {checkListTypes} = useSelector((st) => st.conf);
  const {checkList} = useSelector((st) => st.appointment);
  const [listTitle, setListTitle] = useState([]);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const newList = [...checkListTypes];
    newList.forEach((it, index) => {
      if (index === 0) {
        newList[0].isSelected = true;
      } else {
        newList[index].isSelected = false;
      }
    });
    setListTitle(newList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onScroll = Animated.event([{nativeEvent: {contentOffset: {x}}}], {
    useNativeDriver: true,
    listener: (event) => {
      // do something special
    },
  });
  const onPressTab = (index) => {
    const newList = [...listTitle];
    newList.forEach((it, idx) => {
      if (idx === index) {
        newList[index].isSelected = true;
      } else {
        newList[idx].isSelected = false;
      }
    });
    setListTitle(newList);
    if (scrollRef?.current) {
      scrollRef.current.scrollTo({
        x: index * SCREEN_WIDTH,
        y: 0,
        animate: true,
      });
    }
  };
  const onCapture = (boolean) => {
    setIsCapture(boolean);
    setHidden(boolean);
  };
  return (
    <View style={styles.checkOrderTab}>
      {!hidden && (
        <View style={styles.titleTab}>
          {listTitle.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => onPressTab(index)}
                key={index.toString()}
                style={[
                  styles.btnTitle,
                  {
                    backgroundColor: item.isSelected
                      ? Colors.white
                      : Colors.lightGray,
                    width: (SCREEN_WIDTH - 20) / listTitle.length,
                  },
                ]}>
                <Text
                  style={[
                    styles.txtTitleTab,
                    {color: item.isSelected ? Colors.main : Colors.txtGray},
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <AnimatedScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}
        {...{onScroll}}
        scrollEventThrottle={16}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}>
        {checkListTypes.map((item, index) => {
          return (
            <Suspense
              fallback={
                <Spinner color={Colors.main} style={{width: SCREEN_WIDTH}} />
              }
              key={index.toString()}>
              {item.key === 'image_car' ? (
                <VehicleBody disabled={disabled} setIsCapture={onCapture} />
              ) : item.key === 'actual_image_ids' ? (
                <VehicleImage receptionId={receptionId} />
              ) : (
                <TableCheckOrder
                  disabled={disabled}
                  data={checkList[item.key]}
                  section={item.key}
                  numColumns={numColumns}
                />
              )}
            </Suspense>
          );
        })}
      </AnimatedScrollView>
    </View>
  );
}
export default React.memo(CheckOrderTab);
