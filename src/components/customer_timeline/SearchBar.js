import React, { useContext, useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import { Icon } from 'native-base';
import normalize from 'react-native-normalize';
import { VN_FORMAT_DATE } from '@configs/Configs';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  // , FlatList, Text
} from 'react-native';

import {
  Colors,
  FontFamily,
  SCREEN_WIDTH,
  FontSizeNormalize,
} from '@styles/index';
import { LocalizationContext } from '@context/index';
import { InputGrey } from '@components/forms/index';
import PickerItem from '@components/workshop_timeline/PickerItem';

const date_option = [
  { key: 'today', name: 'Hôm nay', sequence: 1 },
  { key: 'week', name: 'Tuần này', sequence: 5 },
  { key: 'month', name: 'Tháng này', sequence: 10 },
];

const don_son_stage = [
  { key: [28, 29], name: 'Tất cả công đoạn', sequence: 1 },
  { key: [28], name: 'Đồng', sequence: 5 },
  { key: [29], name: 'Sơn', sequence: 10 },
];

const scc_stage = [
  { key: [27, 31, 32, 34], name: 'Tất cả công đoạn', sequence: 1 },
  { key: [31], name: 'Bảo dưỡng', sequence: 5 },
  { key: [27], name: 'Sửa chữa chung', sequence: 10 },
  { key: [32], name: 'PDI', sequence: 15 },
  { key: [34], name: 'Khác', sequence: 20 },
];

const mix_stage = [
  { key: [27, 28, 29, 31, 32, 34], name: 'Tất cả công đoạn', sequence: 5 },
  { key: [31], name: 'Bảo dưỡng', sequence: 5 },
  { key: [27], name: 'Sửa chữa chung', sequence: 10 },
  { key: [32], name: 'PDI', sequence: 15 },
  { key: [34], name: 'Khác', sequence: 20 },
  { key: [28], name: 'Đồng', sequence: 5 },
  { key: [29], name: 'Sơn', sequence: 10 },
];

const list_state = [
  { key: 1, name: 'Tất cả trạng thái', sequence: 1 },
  { key: 5, name: "Không hiển thị xe đã sửa chữa xong", sequence: 25 },
  { key: 'cancel', name: 'Huỷ', sequence: 30 },
];

const list_stateDS = [
  { key: "all", name: 'Tất cả trạng thái', sequence: 25 },
  { key: "repaired", name: "Không hiển thị xe đã sửa chữa xong", sequence: 1 },
  { key: 'cancel', name: 'Huỷ', sequence: 30 },
];


const list_states = [
  { key: 1, name: 'Tất cả trạng thái', sequence: 1 },
  { key: 2, name: 'Không hiển thị xe đã giao', sequence: 2 },
];

function SearchBar({
  onSearch,
  refreshing,
  timelineType,
  listAdvisers,
  listCompartments,
  selectedButton,
  setSelectedButton,
}) {
  const { t } = useContext(LocalizationContext);
  const today = moment().format(VN_FORMAT_DATE);
  const [date, setDate] = useState({
    key: 'today',
    name: 'Hôm nay',
    sequence: 1,
  });
  const [state, setState] = useState({
    key: 'repaired',
    name: 'Không hiển thị xe đã sửa chữa xong',
    sequence: 1,
  });

  const [stateReception, setStateReception] = useState({
    key: 2,
    name: 'Không hiển thị xe đã giao',
    sequence: 1,
  });
  const [customerName, setCustomerName] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);
  const [adviser, setAdviser] = useState({
    id: null,
    name: 'Cố vấn dịch vụ',
  });
  const [compartment, setCompartment] = useState({
    branch_id: '',
    code: false,
    id: 0,
    location: '0',
    name: 'Tất cả khoang',
    state: true,
  });
  const [stage, setStage] = useState(
    timelineType === 'paint_timeline'
      ? { key: [28, 29], name: 'Tất cả công đoạn', sequence: 10 }
      : timelineType === 'mixture_timeline'
        ? { key: [27, 28, 29, 31, 32, 34], name: 'Tất cả công đoạn', sequence: 5 }
        : { key: [27, 31, 32, 34], name: 'Tất cả công đoạn', sequence: 5 },
  );

  useFocusEffect(
    useCallback(() => {
      setDateFrom(today);
      setDateTo(today);
      setLicensePlate('');
      setCustomerName('');
      setState({ key: 'repaired', name: 'Không hiển thị xe đã sửa chữa xong', sequence: 1 });
      setDate({
        key: 'today',
        name: 'Hôm nay',
        sequence: 1,
      });
      setStage(
        timelineType === 'paint_timeline'
          ? { key: [28, 29], name: 'Tất cả công đoạn', sequence: 10 }
          : timelineType === 'mixture_timeline'
            ? {
              key: [27, 28, 29, 31, 32, 34],
              name: 'Tất cả công đoạn',
              sequence: 5,
            }
            : { key: [27, 31, 32, 34], name: 'Tất cả công đoạn', sequence: 5 },
      );
      setCompartment({
        branch_id: '',
        code: false,
        id: 0,
        location: '0',
        name: 'Tất cả khoang',
        state: true,
      });
      setAdviser({
        id: null,
        name: 'Cố vấn dịch vụ',
      });
    }, []),
  );

  useEffect(() => {
    if (refreshing) {
      if (timelineType !== 'paint_timeline') {
        setSelectedButton(0);
      }
      setDateFrom(today);
      setDateTo(today);
      setLicensePlate('');
      setCustomerName('');
      setState({ key: 'all', name: 'Tất cả trạng thái', sequence: 1 });
      setDate({
        key: 'today',
        name: 'Hôm nay',
        sequence: 1,
      });
      setStage(
        timelineType === 'paint_timeline'
          ? { key: [28, 29], name: 'Tất cả công đoạn', sequence: 10 }
          : timelineType === 'mixture_timeline'
            ? {
              key: [27, 28, 29, 31, 32, 34],
              name: 'Tất cả công đoạn',
              sequence: 5,
            }
            : { key: [27, 31, 32, 34], name: 'Tất cả công đoạn', sequence: 5 },
      );
      setCompartment({
        branch_id: '',
        code: false,
        id: 0,
        location: '0',
        name: 'Tất cả khoang',
        state: true,
      });
      setAdviser({
        id: null,
        name: 'Cố vấn dịch vụ',
      });
    }
  }, [refreshing, setSelectedButton, timelineType, today]);

  const onChangeAdviser = (item) => {
    setAdviser(item);
  };

  const onChangeState = (item) => {
    setState(item);
    // console.log(item);
  };

  const onChangeDate = (item) => {
    setDate(item);
    setDateFrom(moment().startOf(item.key).format(VN_FORMAT_DATE));
    setDateTo(moment().endOf(item.key).format(VN_FORMAT_DATE));
  };

  const onChangeStage = (item) => {
    // console.log(item);
    setStage(item);
  };

  const onChangeCompartment = (item) => {
    setCompartment(item);
  };
  const onChangeStateReception = (item) => {
    setStateReception(item)
  }

  const onPress = () => {
    onSearch(
      dateFrom,
      dateTo,
      timelineType === undefined || null ? "all" : state.key,
      customerName,
      licensePlate,
      1,
      false,
      stage.key,
      adviser.id,
      compartment.id,
      stateReception.key,
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <PickerItem
          data={date_option}
          setValue={onChangeDate}
          key="menu_status"
          title="menu_status"
          name={date.name}
        />
      </View>
      {timelineType === 'paint_timeline' && (
        <View style={styles.input}>
          <PickerItem
            data={
              timelineType === 'general_timeline'
                ? scc_stage
                : timelineType === 'mixture_timeline'
                  ? mix_stage
                  : don_son_stage
            }
            setValue={onChangeStage}
            key="menu_status"
            title="menu_status"
            name={stage.name}
          />
        </View>
      )}
      {(timelineType === 'paint_timeline' ||
        timelineType === 'general_timeline') && (
          <View style={styles.input}>
            <PickerItem
              data={listCompartments}
              setValue={onChangeCompartment}
              key="menu_status"
              title="menu_status"
              name={compartment.name}
            />
          </View>
        )}

      <View style={styles.input}>
        <PickerItem
          data={timelineType === "general_timeline"
            ? list_state : timelineType === "paint_timeline"
              ? list_stateDS : timelineType === "mixture_timeline"
                ? list_stateDS : timelineType === undefined || null ? list_states :
                  list_stateDS}
          setValue={timelineType === undefined || null ? onChangeStateReception : onChangeState}
          key="menu_status"
          title="menu_status"
          // name={state.name}
          name={timelineType === undefined || null ? stateReception.name : state.name}

        />
      </View>
      {/* <View style={styles.input}>
        <PickerItem
          data={timelineType === "general_timeline" ? RECEPTION_FILTERS :
            timelineType === "paint_timeline" ? RECEPTION_FILTERS : RECEPTION_FILTER}
          setValue={onChangeStateRECEPTION}
          key="menu_status"
          title="menu_status"
          name={stateRECEPTION.name}
        />
      </View> */}
      {(timelineType === 'general_timeline' ||
        timelineType === 'paint_timeline') && (
          <View style={styles.input}>
            <PickerItem
              data={listAdvisers}
              setValue={onChangeAdviser}
              key="menu_status"
              title="menu_status"
              name={adviser.name}
            />
          </View>
        )}

      <View style={styles.input}>
        <InputGrey
          setValue={setLicensePlate}
          value={licensePlate}
          placeholder={t('license_plate')}
        />
      </View>
      <TouchableOpacity onPress={() => onPress()} style={styles.btnSearch}>
        <Icon type="AntDesign" name="search1" style={styles.icon} />
      </TouchableOpacity>
    </View>
    //   ) : (
    //     <View style={styles.containerList}>
    //       <FlatList
    //         horizontal
    //         data={date_option}
    //         renderItem={renderItem}
    //         showsHorizontalScrollIndicator={false}
    //         keyExtractor={(_item, index) => index.toString()}
    //       />
    //     </View>
    //   )}
    // </>
  );
}
export default React.memo(SearchBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    paddingVertical: normalize(7, 'height'),
    paddingHorizontal: normalize(5, 'height'),
    borderColor: '#0197A6',
    alignItems: 'center',
    backgroundColor: '#0197A6',
    marginBottom: normalize(3),
  },
  input: { flex: 1, marginHorizontal: normalize(2, 'width') },
  icon: { color: 'white', width: 30, height: 30 },
  btnSearch: {
    backgroundColor: '#0197A6',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 5,
    borderRadius: 3,
    marginHorizontal: normalize(2, 'width'),
  },
  containerList: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: normalize(3),
  },
  mStyleText: {
    color: Colors.white,
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.normal,
  },
  activeCategory: {
    width: SCREEN_WIDTH / 7.11,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#0197A6',
    height: normalize(13),
  },
  categoryContainer: {
    width: SCREEN_WIDTH / 7.11,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: Colors.txtGray,
    height: normalize(13),
  },
});
