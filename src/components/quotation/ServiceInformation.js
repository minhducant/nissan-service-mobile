import React, {
  lazy,
  useRef,
  useEffect,
  useState,
  Suspense,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {Spinner} from 'native-base';
import {View, Text, ScrollView, TouchableOpacity, Animated} from 'react-native';

import {Colors, SCREEN_WIDTH} from '@styles/index';
import {receptionStyles as styles} from '@styles/index';

const OtherInformationTab = lazy(() => import('./OtherInformationTab'));
const ServiceInformationTab = lazy(() => import('./ServiceInformationTab'));

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const ServiceInformation = (props, ref) => {
  const x = useRef(new Animated.Value(0)).current;
  const childRef = useRef();
  const scrollRef = useRef(null);
  const data = props.item;
  const [listTitle, setListTitle] = useState([]);

  const checkListTypes = [
    {
      isSelected: true,
      key: 'service_information',
      name: 'Thông tin dịch vụ',
      sequence: 1,
    },
    {
      isSelected: false,
      key: 'other_information',
      name: 'Thông tin khác',
      sequence: 3,
    },
  ];

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
    listener: (event) => {},
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

  useImperativeHandle(ref, () => ({
    onUpdateQuotation() {
      childRef.current.onUpdate();
    },
  }));

  return (
    <View style={styles.checkOrderTab}>
      <View style={styles.titleTab}>
        {listTitle.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => onPressTab(index)}
              key={index.toString()}
              style={[
                styles.btnTitle,
                {
                  backgroundColor: item.isSelected ? Colors.white : Colors.gray,
                  width: (SCREEN_WIDTH - 20) / 10,
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
              {item.key === 'service_information' ? (
                <ServiceInformationTab
                  data={data}
                  ref={childRef}
                  isEdit={props.isEdit}
                  setIsEdit={props.setIsEdit}
                  _getDetailQuotation={props._getDetailQuotation}
                />
              ) : (
                <OtherInformationTab data={data} />
              )}
            </Suspense>
          );
        })}
      </AnimatedScrollView>
    </View>
  );
};
export default forwardRef(ServiceInformation);
