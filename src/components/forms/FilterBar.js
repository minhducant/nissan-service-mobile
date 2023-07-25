import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {Icon} from 'native-base';
import MonthPicker, {
  ACTION_DATE_SET,
  ACTION_DISMISSED,
  ACTION_NEUTRAL,
} from 'react-native-month-year-picker';
import {useSelector} from 'react-redux';
import moment from 'moment';
import normalize from 'react-native-normalize';

import {Colors} from '@styles/index';
import {PickerDateItem, PickerItem} from '@components/forms/index';
const FilterBar = ({
  search,
  isDate = true,
  isMonth = true,
  limitDays = true,
}) => {
  const date = new Date();
  const {today, listCompany} = useSelector((st) => st.conf);
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);
  const menu =
    isDate && isMonth
      ? [
          {name: 'Ngày', key: 'yyyy-mm-dd'},
          {name: 'Tháng', key: 'yyyy-mm'},
        ]
      : isMonth
      ? [{name: 'Tháng', key: 'yyyy-mm'}]
      : [{name: 'Ngày', key: 'yyyy-mm-dd'}];
  const [type, setType] = useState(menu[0]);
  const [company, setCompany] = useState({name: '', id: null});
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date(date.getFullYear(), date.getMonth(), 1),
  );
  const [endDate, setEndDate] = useState(
    new Date(date.getFullYear(), date.getMonth() + 1, 0),
  );
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  useEffect(() => {
    if (listCompany.length > 0) {
      setCompany(listCompany[0]);
    }
  }, [listCompany]);
  const onChangeStartDate = (event, newDate) => {
    switch (event) {
      case ACTION_DATE_SET:
        const selectedDate = newDate;
        setShowFromDatePicker(false);
        setStartDate(selectedDate);
        break;
      case ACTION_NEUTRAL:
        setShowFromDatePicker(false);
        break;
      case ACTION_DISMISSED:
        setShowFromDatePicker(false);
    }
  };
  const onChangeEndDate = (event, newDate) => {
    switch (event) {
      case ACTION_DATE_SET:
        var lastDay = new Date(
          newDate.getFullYear(),
          newDate.getMonth() + 1,
          0,
        );
        setShowToDatePicker(false);
        setEndDate(lastDay);
        break;
      case ACTION_NEUTRAL:
        setShowToDatePicker(false);
        break;
      case ACTION_DISMISSED:
        setShowToDatePicker(false);
    }
  };
  const onSearch = () => {
    if (type.key !== 'yyyy-mm') {
      const before = moment(dateFrom, 'DD-MM-YYYY');
      const after = moment(dateTo, 'DD-MM-YYYY');
      if (after.diff(before, 'days') > 31 && limitDays) {
        Alert.alert('Cảnh báo', 'Số ngày được chọn không vượt quá 31 ngày!');
      } else {
        search(
          type.key,
          moment(before).format('YYYY-MM-DD'),
          moment(after).format('YYYY-MM-DD'),
          company.id,
        );
      }
    } else {
      const startMonth = moment(new Date(startDate.toString()), 'DD-MM-YYYY');
      const endMonth = moment(new Date(endDate.toString()), 'DD-MM-YYYY');
      if (endMonth.diff(startMonth, 'months') > 12) {
        Alert.alert('Cảnh báo', 'Số tháng được chọn không vượt quá 12 tháng');
      } else {
        search(
          type.key,
          moment(startMonth).format('YYYY-MM-DD'),
          moment(endMonth).format('YYYY-MM-DD'),
          company.id,
        );
      }
    }
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={{flex: 1, marginRight: 5}}>
          <PickerItem
            data={listCompany}
            name={company.name}
            setValue={setCompany}
          />
        </View>
        <View style={{flex: 1, marginRight: 5}}>
          <PickerItem data={menu} name={type.name} setValue={setType} />
        </View>
        <View style={{flex: 1, marginRight: 5}}>
          {type.key === 'yyyy-mm-dd' ? (
            <PickerDateItem value={dateFrom} setValue={setDateFrom} />
          ) : (
            <TouchableOpacity
              style={{
                borderWidth: 0.5,
                height: 40,
                backgroundColor: 'white',
                justifyContent: 'center',
                paddingLeft: 10,
                borderRadius: 5,
              }}
              onPress={() => setShowFromDatePicker(true)}>
              <Text>
                {moment(new Date(startDate.toString())).format('DD-MM-YYYY')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{flex: 1}}>
          {type.key === 'yyyy-mm-dd' ? (
            <PickerDateItem value={dateTo} setValue={setDateTo} />
          ) : (
            <TouchableOpacity
              style={{
                borderWidth: 0.5,
                height: 40,
                backgroundColor: 'white',
                justifyContent: 'center',
                paddingLeft: 10,
                borderRadius: 5,
              }}
              onPress={() => setShowToDatePicker(true)}>
              <Text>
                {moment(new Date(endDate.toString())).format('DD-MM-YYYY')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.btnSearch} onPress={() => onSearch()}>
          <Icon type="AntDesign" name="search1" style={styles.icon} />
        </TouchableOpacity>
      </View>
      {showFromDatePicker && (
        <MonthPicker
          onChange={onChangeStartDate}
          value={startDate}
          locale="vn"
        />
      )}
      {showToDatePicker && (
        <MonthPicker onChange={onChangeEndDate} value={endDate} locale="vn" />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {color: 'white', width: 30, height: 30},
  btnSearch: {
    backgroundColor: Colors.main,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 5,
    borderRadius: 3,
    marginHorizontal: normalize(2, 'width'),
  },
});
export default React.memo(FilterBar);
