import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import normalize from 'react-native-normalize';
import {ListItem, Icon, Left, Right, Text} from 'native-base';

import {
  FontSizeNormalize,
  FontFamily,
  Colors,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  css,
} from '@styles/index';
import {LocalizationContext} from '@context/index';
import {EmptyData} from '@components/forms/index';

const PickerTechnical = ({
  visible,
  onChooseEmployee,
  onDismiss,
  title,
  placeholder,
  listEmployee = [],
  listSelected = [],
  addEmployee,
  buttonName = 'Đồng ý',
}) => {
  const {t} = useContext(LocalizationContext);
  const [listEmployeeFilter, setListEmployeeFilter] = useState([]);
  const [listEmployeeFormat, setListEmployeeFormat] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Check những nhân viên đã chọn trong danh sách nhân viên
    if (listSelected.length > 0) {
      const newListEmployee = listEmployee.map((item) => {
        if (listSelected.findIndex((it) => it.id === item.id) >= 0) {
          return {
            ...item,
            active: true,
          };
        } else {
          return {
            ...item,
            active: false,
          };
        }
      });
      // Check nếu còn text search thì không set lại mảng hiển thị
      if (searchText) {
        let filteredName = newListEmployee.filter((item) => {
          return item.name
            .toLowerCase()
            .match(searchText.toString().toLowerCase().trim());
        });
        setListEmployeeFilter(filteredName);
      } else {
        setListEmployeeFilter(newListEmployee);
      }
      setListEmployeeFormat(newListEmployee);
    } else {
      setListEmployeeFilter(listEmployee);
      setListEmployeeFormat(listEmployee);
    }
  }, [listEmployee, listSelected, searchText]);

  const onChangeText = (text) => {
    setSearchText(text);
    if (!text || text === '') {
      setListEmployeeFilter(listEmployeeFormat);
    } else {
      let filteredName = listEmployeeFormat.filter((item) => {
        return item.name
          .toLowerCase()
          .match(text.toString().toLowerCase().trim());
      });
      setListEmployeeFilter(filteredName);
    }
  };

  const addEmp = (item) => {
    addEmployee(item);
  };

  const _renderItem = ({item, index}) => {
    return (
      <ListItem button onPress={() => addEmp(item)}>
        <Left>
          <Text style={styles.userName}>{item.name}</Text>
        </Left>
        <Right>
          {item.active && (
            <Icon
              name="clipboard-check-outline"
              type="MaterialCommunityIcons"
              style={styles.userCheckIcon}
            />
          )}
        </Right>
      </ListItem>
    );
  };

  return (
    <Modal transparent visible={visible} onDismiss={() => onDismiss(false)}>
      <View style={styles.modal}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.content}>
          <TextInput
            onChangeText={onChangeText}
            value={searchText}
            style={styles.container}
            placeholder={placeholder}
          />
          <FlatList
            data={listEmployeeFilter}
            renderItem={_renderItem}
            ListEmptyComponent={<EmptyData />}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.footerContain}>
            <TouchableOpacity
              onPress={() => onChooseEmployee()}
              style={styles.btnCancel}>
              <Text style={styles.txtCancel}>{buttonName}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onDismiss(false)}
              style={styles.btnSave}>
              <Text style={styles.txtSave}>{t('cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(PickerTechnical);
const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  container: {
    color: Colors.black,
    fontSize: FontSizeNormalize.small,
    fontFamily: FontFamily.nissanRegular,
    height: 40,
    borderWidth: 0.5,
    borderColor: Colors.txtGray,
    margin: 5,
    borderRadius: 5,
  },
  content: {
    backgroundColor: Colors.colorWhite,
    height: (2 * SCREEN_HEIGHT) / 3,
    width: SCREEN_WIDTH / 3,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: FontSizeNormalize.normal,
    fontFamily: FontFamily.nissanRegular,
    color: Colors.white,
    backgroundColor: Colors.main,
    padding: 5,
  },
  footer: {
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: Colors.main,
    width: 60,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 5,
  },
  separator: {height: 1, backgroundColor: Colors.colorLightGray},
  item: {height: 40, justifyContent: 'center'},
  txtSave: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    color: Colors.main,
  },
  btnSave: {
    borderWidth: 1,
    paddingVertical: css.mgV10,
    paddingHorizontal: css.mgH10,
    borderColor: Colors.main,
    borderRadius: 5,
    backgroundColor: Colors.white,
    marginHorizontal: 10,
  },
  btnCancel: {
    borderWidth: 1,
    paddingVertical: css.mgV10,
    paddingHorizontal: css.mgH10,
    borderColor: Colors.main,
    borderRadius: 5,
    backgroundColor: Colors.main,
    marginHorizontal: 10,
  },
  txtCancel: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    color: Colors.white,
  },
  footerContain: {
    paddingVertical: 4,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    justifyContent: 'flex-end',
  },
  userName: {
    fontSize: FontSizeNormalize.small,
    fontFamily: FontFamily.nissanRegular,
    color: Colors.black,
  },
  userCheckIcon: {
    fontSize: normalize(6.5),
    color: 'green',
  },
});
