import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Icon} from 'native-base';
import normalize from 'react-native-normalize';
import {VN_FORMAT_DATE} from '@configs/Configs';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import {Colors} from '@styles/index';
import {InputGrey} from '@components/forms/index';

function SearchBar({onSearch, refreshing}) {
  const today = moment().format(VN_FORMAT_DATE);
  const [name, setName] = useState('');

  useEffect(() => {
    if (refreshing) {
      setName('');
    }
  }, [refreshing, today]);

  const onPress = () => {
    onSearch(name);
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <InputGrey setValue={setName} value={name} placeholder={'Tìm...'} />
      </View>
      <TouchableOpacity onPress={() => onPress()} style={styles.btnSearch}>
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
    paddingVertical: normalize(7, 'height'),
    paddingHorizontal: normalize(5, 'height'),
    borderColor: Colors.main,
    alignItems: 'center',
    backgroundColor: Colors.red,
    marginBottom: normalize(3),
    marginHorizontal: normalize(5),
  },
  input: {flex: 1, marginHorizontal: normalize(2, 'width')},
  icon: {color: 'white', width: 30, height: 30},
  btnSearch: {
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 5,
    borderRadius: 3,
    marginHorizontal: normalize(2, 'width'),
  },
});
