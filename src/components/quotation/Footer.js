import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {Colors, FontFamily, FontSizeNormalize, css} from '@styles/index';

export default function Footer({
  onPress,
  disabled,
  state,
  isEdit,
  orderId,
  isSign,
  have_signature_adviser,
  have_signature_client,
}) {
  const roles = useSelector((st) => st.auth.user.roles);
  return (
    <View style={styles.footerContain}>
      {(roles?.izi_security === 'group_service_adviser' ||
        roles?.izi_security === 'group_repair_manage_workshop') &&
        state === 'draft' &&
        isSign === false &&
        isEdit === false && (
          <TouchableOpacity
            disabled={disabled}
            onPress={() => onPress('create')}
            style={styles.btnSave}>
            <Text style={styles.txtSave}>Tạo lệnh sửa chữa</Text>
          </TouchableOpacity>
        )}
      {(roles?.izi_security === 'group_service_adviser' ||
        roles?.izi_security === 'group_repair_manage_workshop') &&
        state === 'draft' &&
        orderId === 0 &&
        (isEdit === false && isSign === false ? (
          <>
            <TouchableOpacity
              disabled={disabled}
              onPress={() => onPress('edit')}
              style={styles.btnSave}>
              <Text style={styles.txtSave}>Sửa báo giá</Text>
            </TouchableOpacity>
            {!have_signature_adviser && !have_signature_client && (
              <TouchableOpacity
                disabled={disabled}
                onPress={() => onPress('sign')}
                style={styles.btnSave}>
                <Text style={styles.txtSave}>Chữ ký</Text>
              </TouchableOpacity>
            )}
          </>
        ) : isEdit === true && isSign === false ? (
          <>
            <TouchableOpacity
              disabled={disabled}
              onPress={() => onPress('update')}
              style={styles.btnSave}>
              <Text style={styles.txtSave}>Cập nhật báo giá</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={disabled}
              onPress={() => onPress('cancel')}
              style={styles.btnSave}>
              <Text style={styles.txtSave}>Hủy</Text>
            </TouchableOpacity>
          </>
        ) : isEdit === false && isSign === true ? (
          <>
            <TouchableOpacity
              disabled={disabled}
              onPress={() => onPress('update_signature')}
              style={styles.btnSave}>
              <Text style={styles.txtSave}>Cập nhật chữ ký</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={disabled}
              onPress={() => onPress('cancel')}
              style={styles.btnSave}>
              <Text style={styles.txtSave}>Hủy</Text>
            </TouchableOpacity>
          </>
        ) : (
          <></>
        ))}
      {isSign === false && isEdit === false && (
        <TouchableOpacity
          disabled={disabled}
          onPress={() => onPress('view')}
          style={styles.btnCancel}>
          <Text style={styles.txtCancel}>Xem báo giá</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  footerContain: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
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
});
