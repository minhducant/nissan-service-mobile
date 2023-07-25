import React, {useEffect, useState, useRef, Suspense, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import {Spinner} from 'native-base';
import normalize from 'react-native-normalize';

import {
  receptionStyles as styles,
  FontFamily,
  FontSizeNormalize,
  Colors,
  SCREEN_WIDTH,
} from '@styles/index';
import {formatDate} from '@services/utils';
import {LocalizationContext} from '@context/index';
import {LineInput} from '@components/forms/index';
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

function ServiceInformation(params) {
  const x = useRef(new Animated.Value(0)).current;
  const {t} = useContext(LocalizationContext);
  const scrollRef = useRef(null);
  const data = params.item;
  const serviceInfo = Object.fromEntries(data?.service_info_labor || []);
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
      key: 'material_requirements',
      name: 'Yêu cầu vật tư',
      sequence: 3,
    },
    {
      isSelected: false,
      key: 'material_payment_slip',
      name: 'Phiếu trả vật tư',
      sequence: 3,
    },
    {
      isSelected: false,
      key: 'scrap',
      name: 'Phế liệu',
      sequence: 3,
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

  const renderEmptyItem = () => {
    return <Text style={stylesTab.noData}>Không có dữ liệu</Text>;
  };

  const renderHeaderScrap = () => {
    return (
      <View style={stylesTab.titleHeader}>
        <Text style={stylesTab.txt(Colors.white, 2.5, 'center')}>Tên</Text>
        <Text style={stylesTab.txt(Colors.white, 2.5, 'center')}>
          Ngày thu hồi
        </Text>
        <Text style={stylesTab.txt(Colors.white, 2.5, 'center')}>
          Nhân viên yêu cầu
        </Text>
        <Text style={stylesTab.txt(Colors.white, 2.5, 'center')}>
          Lệnh sửa chữa
        </Text>
      </View>
    );
  };

  const renderItemScrap = ({item, index}) => {
    return (
      <View style={stylesTab.titleItem(index)}>
        <Text style={stylesTab.txt(Colors.black, 2.5)}>{item.name}</Text>
        <Text style={stylesTab.txt(Colors.black, 2.5)}>{item.scrap_date}</Text>
        <Text style={stylesTab.txt(Colors.black, 2.5)}>{item.employee_id}</Text>
        <Text style={stylesTab.txt(Colors.black, 2.5)}>
          {item.fleet_repair_oder_id}
        </Text>
      </View>
    );
  };

  const renderHeaderMaterial = () => {
    return (
      <View style={stylesTab.titleHeader}>
        <Text style={stylesTab.txt(Colors.white, 2.7, 'center')}>Sản phẩm</Text>
        <Text style={stylesTab.txt(Colors.white, 2.7, 'center')}>Tên</Text>
        <Text style={stylesTab.txt(Colors.white, 1, 'center')}>ĐVT</Text>
        <Text style={stylesTab.txt(Colors.white, 1.4, 'center')}>
          Loại công việc
        </Text>
        <Text style={stylesTab.txt(Colors.white, 1, 'center')}>SL</Text>
        <Text style={stylesTab.txt(Colors.white, 1, 'center')}>Sl nhận</Text>
      </View>
    );
  };

  const renderItemMaterial = ({item, index}) => {
    return (
      <View style={stylesTab.titleItem(index)}>
        <Text style={stylesTab.txt(Colors.black, 2.7, 'left')}>
          {item.name}
        </Text>
        <Text style={stylesTab.txt(Colors.black, 2.7, 'left')}>
          {item.name}
        </Text>
        <Text style={stylesTab.txt(Colors.black, 1)}>{item.product_uom}</Text>
        <Text style={stylesTab.txt(Colors.black, 1.4)}>
          {item.task_type_id === 0 ? '' : item.task_type_id}
        </Text>
        <Text style={stylesTab.txt(Colors.black, 1, 'right')}>{item.qty}</Text>
        <Text style={stylesTab.txt(Colors.black, 1, 'right')}>
          {item.qty_received}
        </Text>
      </View>
    );
  };

  const renderHeaderServiceInfo = () => {
    return (
      <View style={stylesTab.titleHeader}>
        <Text style={stylesTab.txt(Colors.white, 1.9)}>Tên công việc</Text>
        <Text style={stylesTab.txt(Colors.white, 1.9)}>Phân công</Text>
        <Text style={stylesTab.txt(Colors.white, 1)}>Trạng thái</Text>
        <Text style={stylesTab.txt(Colors.white, 1)}>Khoang</Text>
        <Text style={stylesTab.txt(Colors.white, 1)}>Trạng thái hoạt động</Text>
        <Text style={stylesTab.txt(Colors.white, 1)}>Số giờ theo kế hoạch</Text>
        <Text style={stylesTab.txt(Colors.white, 1)}>Thời gian bắt đầu</Text>
        <Text style={stylesTab.txt(Colors.white, 1)}>Thời gian kết thúc</Text>
      </View>
    );
  };

  const renderItemServiceInfo = ({item, index}) => {
    return (
      <View style={stylesTab.titleItem(index)}>
        <Text style={stylesTab.txt(Colors.black, 1.9, 'left')}>
          {item.name}
        </Text>
        <Text style={stylesTab.txt(Colors.black, 1.9)}>
          {item.x_employee_ids.map((z, i, arr) =>
            i < arr.length - 1 ? z + '\n' : z,
          )}
        </Text>
        <Text style={stylesTab.txt(Colors.black, 1)}>{t(item.x_state)}</Text>
        <Text style={stylesTab.txt(Colors.black, 1)}>
          {item.x_compartment_id === 0 ? '' : item.x_compartment_id}
        </Text>
        <Text style={stylesTab.txt(Colors.black, 1)}>
          {item.x_state_compartment}
        </Text>
        <Text style={stylesTab.txt(Colors.black, 1, 'right')}>
          {item.planned_hours || 0}
        </Text>
        <Text style={stylesTab.txt(Colors.black, 1)}>
          {item.start_time_reality === 'False'
            ? ' '
            : item.start_time_reality
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('/')}
        </Text>
        <Text style={stylesTab.txt(Colors.black, 1)}>
          {item.end_time_reality === 'False'
            ? ' '
            : item.end_time_reality.slice(0, 10).split('-').reverse().join('/')}
        </Text>
      </View>
    );
  };

  const renderHeaderReturn = () => {
    return (
      <View style={stylesTab.titleHeader}>
        <Text style={stylesTab.txt(Colors.white, 2)}>Tên</Text>
        <Text style={stylesTab.txt(Colors.white, 2)}>Ngày tiếp nhận</Text>
        <Text style={stylesTab.txt(Colors.white, 2)}>Nhân viên yêu cầu</Text>
        <Text style={stylesTab.txt(Colors.white, 2)}>Lệnh sửa chữa</Text>
        <Text style={stylesTab.txt(Colors.white, 2)}>Trạng thái</Text>
      </View>
    );
  };

  const renderItemReturn = ({item, index}) => {
    return (
      <View style={stylesTab.titleItem(index)}>
        <Text style={stylesTab.txt(Colors.black, 2)}>{item.name}</Text>
        <Text style={stylesTab.txt(Colors.black, 2)}>
          {item.request_date === 'False'
            ? ' '
            : item.request_date.slice(0, 10).split('-').reverse().join('/')}
        </Text>
        <Text style={stylesTab.txt(Colors.black, 2)}>
          {item.employee_id === 0 ? '' : item.employee_id}
        </Text>
        <Text style={stylesTab.txt(Colors.black, 2)}>
          {item.fleet_repair_order_id}
        </Text>
        <Text style={stylesTab.txt(Colors.black, 2)}>{t(item.state)}</Text>
      </View>
    );
  };

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
                <ScrollView
                  style={styles.containerTab}
                  showsHorizontalScrollIndicator={false}>
                  <View style={stylesTab.title}>
                    <Text style={stylesTab.txtTitle}>Nhiệm vụ</Text>
                  </View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FlatList
                      keyExtractor={(_, idx) => idx.toString()}
                      data={serviceInfo?.service_info_lb}
                      ListHeaderComponent={renderHeaderServiceInfo()}
                      renderItem={renderItemServiceInfo}
                      showsVerticalScrollIndicator={false}
                      ListEmptyComponent={renderEmptyItem}
                    />
                  </ScrollView>
                  <View style={stylesTab.title}>
                    <Text style={stylesTab.txtTitle}>
                      Phần Phụ tùng/dầu mỡ/vật tư
                    </Text>
                  </View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FlatList
                      keyExtractor={(_, idx) => idx.toString()}
                      data={data?.service_info_material?.service_info_material}
                      ListHeaderComponent={renderHeaderMaterial()}
                      renderItem={renderItemMaterial}
                      showsVerticalScrollIndicator={false}
                      ListEmptyComponent={renderEmptyItem}
                    />
                  </ScrollView>
                  <View style={stylesTab.title} />
                </ScrollView>
              ) : item.key === 'material_requirements' ? (
                <ScrollView style={styles.containerTab}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FlatList
                      keyExtractor={(_, idx) => idx.toString()}
                      data={data?.material_request_return?.material_request}
                      ListHeaderComponent={renderHeaderReturn()}
                      renderItem={renderItemReturn}
                      showsVerticalScrollIndicator={false}
                      ListEmptyComponent={renderEmptyItem}
                    />
                  </ScrollView>
                </ScrollView>
              ) : item.key === 'material_payment_slip' ? (
                <ScrollView style={styles.containerTab}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FlatList
                      keyExtractor={(_, idx) => idx.toString()}
                      data={data?.material_request_return?.material_return}
                      ListHeaderComponent={renderHeaderReturn()}
                      renderItem={renderItemReturn}
                      showsVerticalScrollIndicator={false}
                      ListEmptyComponent={renderEmptyItem}
                    />
                  </ScrollView>
                </ScrollView>
              ) : item.key === 'scrap' ? (
                <ScrollView style={styles.containerTab}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FlatList
                      keyExtractor={(_, idx) => idx.toString()}
                      data={data?.scrap?.collect_scrap_ids}
                      ListHeaderComponent={renderHeaderScrap()}
                      renderItem={renderItemScrap}
                      showsVerticalScrollIndicator={false}
                      ListEmptyComponent={renderEmptyItem}
                    />
                  </ScrollView>
                </ScrollView>
              ) : (
                <ScrollView style={styles.containerTab}>
                  <LineInput
                    leftTitle={'Đơn hàng'}
                    rightTitle={'Ngày tiếp nhận'}
                    leftValue={data?.order_id || ''}
                    rightValue={formatDate(data?.date_order || '  ')}
                    leftUpperCase={true}
                    disabled={true}
                  />
                  <LineInput
                    leftTitle={'Công ty'}
                    rightTitle={'Đại lý'}
                    leftValue={data?.company || ''}
                    rightValue={data?.branch || ''}
                    leftUpperCase={true}
                    disabled={true}
                  />
                  <LineInput
                    leftTitle={'Ngày dự kiến giao'}
                    rightTitle={'Ngày giao xe'}
                    leftValue={formatDate(data?.date_hand_plan || ' ')}
                    rightValue={formatDate(data?.date_delivery || ' ')}
                    leftUpperCase={true}
                    disabled={true}
                  />
                </ScrollView>
              )}
            </Suspense>
          );
        })}
      </AnimatedScrollView>
      {/* <View style={styles.state} /> */}
    </View>
  );
}
export default React.memo(ServiceInformation);

const stylesTab = StyleSheet.create({
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: normalize(5),
  },
  txtTitle: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
  },
  txt: (color, flex, textAlign = 'center') => ({
    width: (SCREEN_WIDTH / 10) * flex,
    flex: 0.5,
    borderRightWidth: 0.5,
    borderRightColor: Colors.white,
    color: color,
    textAlign: textAlign,
    textAlignVertical: 'center',
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    padding: 6,
  }),
  noData: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    alignSelf: 'center',
    marginTop: normalize(5),
  },
  titleHeader: {
    backgroundColor: Colors.main,
    flexDirection: 'row',
  },
  titleItem: (index) => ({
    flexDirection: 'row',
    backgroundColor: index % 2 === 0 ? '#ede8e8' : '#ffffff',
    borderBottomWidth: 1,
    borderColor: Colors.gray,
  }),
});
