import React from 'react';
import normalize from 'react-native-normalize';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Colors, FontFamily, FontSizeNormalize, css} from '@styles/index';

const CustomModal = ({item, onPress, state, isModal, setIsModal}) => {
  return (
    <Modal
      isVisible={isModal}
      animationIn="fadeInRight"
      animationOut="fadeOutRight"
      backdropTransitionInTiming={1200}
      backdropTransitionOutTiming={1200}
      backdropOpacity={0.4}
      onBackdropPress={() => setIsModal()}
      style={styles.modal}>
      <View style={styles.modalContainer}>
        <Text style={styles.textModal}>
          Biển số xe: {item?.vehicle?.license_plate || item?.license_plate}
        </Text>
        <View style={styles.button}>
          {(item?.state?.key === 'new' || item?.state === 'new') && (
            <>
              {item.x_is_received === false ? (
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
                      disabled={item?.check?.every(function (it) {
                        return it?.check_assignment_work === true;
                    })}
                    style={styles.btnCancel}>
                    <Text style={styles.txtCancel}>
                      Phân công kỹ thuật viên
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}
          {(item?.state?.key === 'repairing' ||
            item?.state === 'repairing') && (
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
          {(item?.state?.key === 'pause' || item?.state === 'pause') && (
            <TouchableOpacity
              onPress={() => onPress('action_resume')}
              style={styles.btnSave}>
              <Text style={styles.txtSave}>Tiếp tục sửa chữa</Text>
            </TouchableOpacity>
          )}
          {(item?.state?.key === 'verify' || item?.state === 'verify') && (
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
          <TouchableOpacity
            onPress={() => onPress('view_ro')}
            style={styles.btnSave}>
            <Text style={styles.txtSave}>Chi tiết RO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: normalize(30),
    position: 'absolute',
    bottom: 0,
    borderRadius: normalize(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: normalize(30),
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  modal: {
    marginLeft: normalize(100),
  },
  textModal: {
    color: '#000000',
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.normal,
    textAlign: 'center',
    paddingHorizontal: normalize(5),
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
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
