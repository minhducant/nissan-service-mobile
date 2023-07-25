import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {Colors, FontFamily, FontSizeNormalize, css} from '@styles/index';

export default function Footer({
  onPress,
  state,
  x_is_received,
  service_info_lb,
}) {
  return (
    <View style={styles.footerContain}>
      {state === 'new' && (
        <>
          {x_is_received === false ? (
            <TouchableOpacity
              onPress={() => onPress('action_receive_repair')}
              style={styles.btnSave}>
              <Text style={styles.txtSave}>Nhận sữa chữa</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => onPress('action_start_repair')}
                style={styles.btnSave}>
                <Text style={styles.txtSave}>Bắt đầu sửa chữa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onPress('action_assign_employee_all_task')}
                disabled={
                  service_info_lb.length === 0 ||
                  service_info_lb?.every(function (item) {
                    return item.x_employee_ids.length === 0;
                  }) === false
                    ? true
                    : false
                }
                style={styles.btnCancel}>
                <Text style={styles.txtCancel}>Phân công kỹ thuật viên</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
      {state === 'repairing' && (
        <>
          <TouchableOpacity
            onPress={() => onPress('action_pause')}
            style={styles.btnSave}>
            <Text style={styles.txtSave}>Tạm dừng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPress('action_incurred')}
            style={styles.btnSave}>
            <Text style={styles.txtSave}>Phát sinh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPress('action_finish_repairing')}
            style={styles.btnCancel}>
            <Text style={styles.txtCancel}>Kết thúc sữa chữa</Text>
          </TouchableOpacity>
        </>
      )}
      {state === 'pause' && (
        <TouchableOpacity
          onPress={() => onPress('action_resume')}
          style={styles.btnSave}>
          <Text style={styles.txtSave}>Tiếp tục sửa chữa</Text>
        </TouchableOpacity>
      )}
      {state === 'verify' && (
        <>
          <TouchableOpacity
            onPress={() => onPress('action_resume')}
            style={styles.btnSave}>
            <Text style={styles.txtSave}>Tiếp tục sửa chữa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPress('button_acceptance_work')}
            style={styles.btnCancel}>
            <Text style={styles.txtCancel}>Nghiệm thu công việc</Text>
          </TouchableOpacity>
        </>
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
