import React, {useContext, useEffect, useState} from 'react';
import {Divider} from 'react-native-paper';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  FontSizeNormalize,
  FontFamily,
  Colors,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from '@styles/index';
import normalize from 'react-native-normalize';
import {LocalizationContext} from '@context/index';

const SearchModal = ({
  visible,
  onDismiss,
  title,
  placeholder,
  data,
  setValue,
}) => {
  const {t} = useContext(LocalizationContext);
  const [list, setList] = useState([]);
  const [txtSearch, setTxtSearch] = useState('');
  useEffect(() => {
    setList(data);
  }, [data]);
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => setValue(item)} style={styles.item}>
        <Text style={styles.txtItem}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const renderSeparator = () => {
    return <Divider />;
  };
  const onChangeText = (text) => {
    if (text === '') {
      setList(data);
    } else {
      const newList = data.filter((item) => {
        return item.name.toLowerCase().match(text.toLowerCase().trim());
      });
      setList(newList);
    }

    setTxtSearch(text);
  };
  const emptyData = () => {
    return <Text style={styles.txtItem}>{t('no_data')}</Text>;
  };
  return (
    <Modal
      transparent
      visible={visible}
      // dismissable={false}
      onDismiss={() => onDismiss(false)}>
      <View style={styles.modal}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.content}>
          <TextInput
            onChangeText={onChangeText}
            value={txtSearch}
            style={styles.container}
            placeholder={placeholder}
          />
          <FlatList
            data={list}
            renderItem={renderItem}
            ItemSeparatorComponent={renderSeparator}
            ListEmptyComponent={emptyData}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity
            onPress={() => onDismiss(false)}
            style={styles.footer}>
            <Text style={styles.btnCancel}>{t('cancel')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default React.memo(SearchModal);
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
  txtItem: {
    fontSize: FontSizeNormalize.small,
    fontFamily: FontFamily.nissanRegular,
    color: Colors.black,
  },
  item: {height: 40, justifyContent: 'center', marginHorizontal: normalize(5)},
  btnCancel: {
    fontSize: FontSizeNormalize.normal,
    fontFamily: FontFamily.nissanRegular,
    color: Colors.white,
    textAlign: 'center',
  },
});
