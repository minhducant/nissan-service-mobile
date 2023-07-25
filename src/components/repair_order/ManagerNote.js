import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import normalize from 'react-native-normalize';
import {FontSizeNormalize, FontFamily, Colors, css} from '@styles/index';

const ManagerNote = ({visible, onAccept, onDismiss}) => {
  const [note, setNote] = React.useState('');

  const onChangeText = (text) => {
    setNote(text);
  };

  const onModalHide = () => {
    setNote('');
    onDismiss(false);
    Keyboard.dismiss();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      avoidKeyboard={true}
      backdropOpacity={0.5}>
      <View style={styles.modal}>
        <Text style={styles.title}>Ghi chú quản đốc</Text>
        <View style={styles.content}>
          <TextInput
            onChangeText={onChangeText}
            value={note}
            style={styles.container}
            placeholder={'Bạn có ghi chú nào không?'}
            multiline={true}
          />
          <View style={styles.footerContain}>
            <TouchableOpacity
              onPress={() => onAccept(note)}
              style={styles.btnCancel}>
              <Text style={styles.txtCancel}>Đồng ý</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onModalHide} style={styles.btnSave}>
              <Text style={styles.txtSave}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(ManagerNote);
const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 110,
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
    width: normalize(150),
  },
  container: {
    color: Colors.black,
    fontSize: FontSizeNormalize.normal,
    fontFamily: FontFamily.nissanRegular,
    height: normalize(30),
    borderWidth: 0.5,
    borderColor: Colors.txtGray,
    margin: 5,
    borderRadius: 3,
    textAlignVertical: 'top',
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
    paddingBottom: 4,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    justifyContent: 'flex-end',
  },
});
