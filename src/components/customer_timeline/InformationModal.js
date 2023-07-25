import React from 'react';
import Modal from 'react-native-modal';
import normalize from 'react-native-normalize';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors, FontFamily, FontSizeNormalize, css } from '@styles/index';
import moment from 'moment';

const InformationModal = ({ item, onPress, isModal, setIsModal }) => {
  console.log(item);
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
        <View style={styles.styleViewText}>
          <Text style={styles.stylesText}>Cố vấn dịch vụ: </Text>
          <Text style={styles.textTitle}>
            {item?.adviser || item?.adviser_name}
          </Text>
        </View>
        <View style={styles.styleViewText}>
          <Text style={styles.stylesText}>Biển số xe: </Text>
          <Text style={styles.textModal}>
            {item?.vehicle?.license_plate}
          </Text>
        </View>
        <View style={styles.styleViewText}>
          <Text style={styles.stylesText}>
            Thời gian bắt đầu dự kiến: </Text>
          <Text style={styles.textModal}>
            {moment(item?.start_time_expected).add(7, "hours").format("DD-MM-YYYY HH:mm:ss")}
          </Text>
        </View>
        <View style={styles.styleViewText}>
          <Text style={styles.stylesText}>Thời gian kết thúc dự kiến:</Text>
          <Text style={styles.textModal}>
            {moment(item?.end_time_expected).add(7, "hours").format("DD-MM-YYYY HH:mm:ss")}
          </Text>
        </View>

        <View style={styles.styleViewText}>
          <Text style={styles.stylesText}>Thời gian bắt đầu thực tế: </Text>
          <Text style={styles.textModal}>
            {moment(item?.start_time_reality).add(7, "hours").format("DD-MM-YYYY HH:mm:ss")}
          </Text>
        </View>
        <View style={styles.styleViewText}>
          <Text style={styles.stylesText}>Thời gian kết thúc thực tế: </Text>
          <Text style={styles.textModal}>
            {item?.end_time_reality !== "False" || "" ? moment(item?.end_time_reality).add(7, "hours").format("DD-MM-YYYY HH:mm:ss") : ""}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default InformationModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 0,
    borderRadius: normalize(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: normalize(30),
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    paddingHorizontal: 24,
    paddingBottom: 18


  },
  modal: {
    justifyContent: 'center',
    alignItems: "center"
  },
  textTitle: {
    color: '#000000',
    fontFamily: FontFamily.nissanBold,
    fontSize: FontSizeNormalize.normal,
    textAlign: 'center',
    paddingTop: 12,
    paddingBottom: 16,
  },
  textModal: {
    color: '#000000',
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.normal,
    lineHeight: 32
  },
  styleViewText: {
    flexDirection: "row",
    alignItems: "center"
  },
  stylesText: {
    fontSize: 16,
    fontWeight: "700"
  }
});
