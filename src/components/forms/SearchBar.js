import React, {useState, useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import moment from 'moment';
import normalize from 'react-native-normalize';
import {Icon} from 'native-base';

import {LocalizationContext} from '@context/index';
import {InputGrey, PickerItem, PickerDateItem} from '@components/forms/index';
import {VN_FORMAT_DATE} from '@configs/Configs';
import {Colors} from '@styles/index';
import {checkNotNullData} from '@common/index';

const today = moment().format(VN_FORMAT_DATE);
function SearchBar({
  from,
  to,
  lp,
  name,
  onSearch,
  menu = [],
  refresh = false,
  stateFilter,
}) {
  const {t} = useContext(LocalizationContext);
  const [dateFrom, setDateFrom] = useState(from || today);
  const [dateTo, setDateTo] = useState(to || today);
  const [state, setState] = useState({
    name: '',
    key: '',
  });
  const [licensePlate, setLicensePlate] = useState(lp || '');
  const [customerName, setCustomerName] = useState(name || '');
  useEffect(() => {
    if (stateFilter) {
      menu.forEach((item) => {
        if (item.key === stateFilter) {
          setState(item);
        }
      });
    } else {
      if (checkNotNullData(menu[0])) {
        setState(menu[0]);
      }
    }
  }, [menu, stateFilter]);
  useEffect(() => {
    if (refresh) {
      if (checkNotNullData(menu[0])) {
        setState(menu[0]);
      }
      setDateFrom(today);
      setDateTo(today);
      setLicensePlate('');
      setCustomerName('');
    }
  }, [menu, refresh]);
  const handleFromDate = (dateStr, date) => {
    setDateFrom(dateStr);
  };
  const handleToDate = (dateStr, date) => {
    setDateTo(dateStr);
  };
  const onChangeState = (item) => {
    setState(item);
  };
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <PickerDateItem value={dateFrom} setValue={handleFromDate} />
      </View>
      <Text>-</Text>
      <View style={styles.input}>
        <PickerDateItem value={dateTo} setValue={handleToDate} />
      </View>
      <View style={styles.input}>
        <PickerItem
          data={menu}
          setValue={onChangeState}
          key="menu_status"
          title="menu_status"
          name={state.name}
        />
      </View>
      <View style={styles.input}>
        <InputGrey
          setValue={setCustomerName}
          value={customerName}
          placeholder={t('customer_name')}
        />
      </View>
      <View style={styles.input}>
        <InputGrey
          setValue={setLicensePlate}
          value={licensePlate}
          placeholder={t('license_plate')}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          onSearch(dateFrom, dateTo, state.key, customerName, licensePlate)
        }
        style={styles.btnSearch}>
        <Icon type="AntDesign" name="search1" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}
export default React.memo(SearchBar);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    paddingVertical: normalize(10, 'height'),
    borderColor: Colors.gray,
    alignItems: 'center',
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5,
  },
  input: {flex: 1, marginHorizontal: normalize(2, 'width')},
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
