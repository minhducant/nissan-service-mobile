import React from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Colors} from '@styles/index';
import {repairStyles as styles} from '@styles/index';
import {LineInput} from '@components/forms/index';
import {IcAccount, IcCar, IcAppointment} from '@common/svg/index';

function CustomerTab(params) {
  const data = params.item;

  return (
    <ScrollView style={styles.customerTab}>
      <View style={styles.title}>
        <IcAppointment fill={Colors.main} />
        <Text style={styles.txtTitle}>Thông tin tiếp nhận</Text>
      </View>
      <View style={styles.addressCon}>
        <Text style={styles.leftTitle}>Tiếp nhận</Text>
        <View style={styles.cityCon(true)}>
          <Text style={styles.txtAddress}>{data?.repair_request_id}</Text>
        </View>
        <View style={styles.model}>
          <Text style={styles.textModel}>Có lịch hẹn</Text>
        </View>
        <CheckBox
          Component={() => (
            <TouchableOpacity
              activeOpacity={0.6}
              disabled={true}
              style={[styles.checkBoxItem]}>
              {data?.have_booking ? (
                <Ionicons
                  name="md-checkmark-sharp"
                  color={Colors.green}
                  size={20}
                />
              ) : (
                <></>
              )}
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.title}>
        <IcCar fill={Colors.main} />
        <Text style={styles.txtTitle}>Thông tin xe</Text>
      </View>
      <LineInput
        leftTitle={'Biển số xe'}
        rightTitle={'Số VIN'}
        leftValue={data?.vehicle?.license_plate || ''}
        rightValue={data?.vehicle?.vin || ''}
        leftUpperCase={true}
        disabled={true}
      />
      <LineInput
        leftTitle={'Hãng sản xuất'}
        rightTitle={'Model xe'}
        leftValue={data?.vehicle?.brand?.name || ''}
        rightValue={data?.vehicle?.model?.name || ''}
        leftUpperCase={true}
        disabled={true}
      />
      <LineInput
        leftTitle={'Model khác'}
        rightTitle={'Số km'}
        leftValue={data?.vehicle?.other_model || ''}
        rightValue={data?.vehicle?.odometer || ''}
        leftUpperCase={true}
        disabled={true}
      />
      <LineInput
        leftTitle={'Số máy'}
        rightTitle={'Mã màu'}
        leftValue={data?.vehicle?.engine_no || ''}
        rightValue={data?.vehicle?.color || ''}
        leftUpperCase={true}
        disabled={true}
      />
      <View style={styles.title}>
        <IcAccount fill={Colors.main} />
        <Text style={styles.txtTitle}>Thông tin khách hàng</Text>
      </View>
      <LineInput
        leftTitle={'Khách hàng'}
        rightTitle={'Ghi chú quản đốc'}
        leftValue={data?.customer?.name || ''}
        rightValue={data?.x_note_fro || ''}
        leftUpperCase={true}
        disabled={true}
      />
    </ScrollView>
  );
}
export default React.memo(CustomerTab);
