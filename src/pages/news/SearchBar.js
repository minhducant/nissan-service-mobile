import React, {useEffect} from 'react';
import moment from 'moment';
import normalize from 'react-native-normalize';
import {VN_FORMAT_DATE} from '@configs/Configs';
import {StyleSheet, View} from 'react-native';

import {Colors} from '@styles/index';
import PickerItem from '@pages/news/PickerItem';
import {InputGrey, PickerDateItem} from '@components/forms/index';

const list_state = [
  {key: 'all', name: 'Tất cả', sequence: 1},
  {key: 'doc', name: 'Tài liệu kỹ thuật', sequence: 5},
  {key: 'news', name: 'Bản tin kỹ thuật', sequence: 10},
];

function SearchBar({
  onSearch,
  refreshing,
  name,
  setName,
  date,
  setDate,
  state,
  setState,
  model,
  setModel,
}) {
  const today = moment().format(VN_FORMAT_DATE);

  useEffect(() => {
    if (refreshing) {
      setDate(today);
      setName('');
      setModel('');
      setState({key: 'all', name: 'Tất cả', sequence: 1});
    }
  }, [refreshing, setDate, setModel, setName, setState, today]);

  const onChangeState = (item) => {
    setState(item);
    onSearch(name, '', item.key, model);
  };

  const handleDate = (time) => {
    setDate(time);
    onSearch(name, time, state.key, model);
  };

  const onBlurName = () => {
    onSearch(name, '', state.key, model);
  };

  const onBlurModel = () => {
    onSearch(name, '', state.key, model);
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <InputGrey
          setValue={setName}
          value={name}
          placeholder={'Chủ đề'}
          onBlur={() => onBlurName()}
        />
      </View>
      <View style={styles.input}>
        <PickerDateItem value={date} setValue={handleDate} />
      </View>
      <View style={styles.input}>
        <PickerItem
          data={list_state}
          setValue={onChangeState}
          key="menu_status"
          title="menu_status"
          name={state.name}
        />
      </View>
      <View style={styles.input}>
        <InputGrey
          setValue={setModel}
          value={model}
          placeholder={'Model/ Hệ thống'}
          onBlur={() => onBlurModel()}
        />
      </View>
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
