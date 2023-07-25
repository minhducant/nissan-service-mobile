import React, {useState, useRef} from 'react';
import {StyleSheet, FlatList, View, TouchableOpacity} from 'react-native';
import {Icon, Input} from 'native-base';
import {Menu} from 'react-native-paper';

import {Colors, FontFamily, FontSize, FontSizeNormalize} from '@styles/index';

function PickerItem({
  data = [],
  name = '',
  setValue,
  disabled = false,
  icon = false,
}) {
  const inputRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState({x: 0, y: 0});

  const onDismiss = () => {
    setVisible(false);
  };

  const onPress = (item) => {
    setValue(item);
    setVisible(false);
  };

  const _renderItem = ({item, index}) => {
    return (
      <Menu.Item
        title={item.name}
        onPress={() => onPress(item)}
        titleStyle={styles.valueItem}
        icon={icon === true ? item.icon : ''}
      />
    );
  };

  const onShowPicker = () => {
    if (inputRef.current) {
      inputRef.current._root.measure((fx, fy, width, height, px, py) => {
        setLocation({x: px, y: py});
      });
    }
    setVisible(true);
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={[styles.pickerContain, {borderWidth: disabled ? 0 : 0.5}]}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onShowPicker}
        activeOpacity={1}
        style={[
          styles.itemCon,
          {
            backgroundColor: disabled ? Colors.colorTextInput : Colors.white,
          },
        ]}>
        <Menu
          visible={visible}
          onDismiss={onDismiss}
          anchor={{x: location.x, y: location.y}}
          style={styles.menu}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderItem}
          />
        </Menu>
        <Input
          ref={inputRef}
          value={name}
          numberOfLines={1}
          style={[
            styles.value,
            {color: disabled ? Colors.black : Colors.txtGray},
          ]}
          disabled
        />
        <Icon
          name={visible ? 'chevron-small-up' : 'chevron-small-down'}
          type="Entypo"
        />
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(PickerItem);

const styles = StyleSheet.create({
  itemCon: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    // margin: 0,
    height: 41,
    marginLeft: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  menu: {
    width: '30%',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c9c9c9',
  },
  value: {
    fontFamily: FontFamily.nissanRegular,
    flex: 1,
    fontSize: FontSize.small,
    paddingLeft: 10,
    justifyContent: 'center',
    paddingVertical: 5,
  },
  valueItem: {
    fontFamily: FontFamily.nissanRegular,
    color: Colors.black,
    fontSize: FontSize.normal,
  },

  pickerContain: {borderColor: Colors.txtGray, borderRadius: 5},
});
