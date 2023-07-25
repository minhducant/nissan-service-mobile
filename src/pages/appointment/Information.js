import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Textarea} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {CheckBox} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {setLoading} from '@stores/config/actions';
import {LocalizationContext} from '@context/index';
import {Header} from '@components/headers/index';
import {repairStyles as styles, Colors, css, SCREEN_WIDTH} from '@styles/index';
import {
  IcAccount,
  IcCar,
  IcCalendar,
  IcCustomerRequire,
} from '@common/svg/index';
import {InputGrey, LineInput} from '@components/forms/index';
import {showMessage} from '@common/index';
import {GET} from '@repository/appointment/index';

export default function Information({route, navigation}) {
  const dispatch = useDispatch();
  const {requestTypes} = useSelector((st) => st.conf);
  const {t} = useContext(LocalizationContext);
  const {accessToken} = useSelector((st) => st.auth);
  const {item} = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    _getAppointment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGoBack = () => {
    navigation.navigate('AppointmentScreen');
  };

  const _getAppointment = async () => {
    dispatch(setLoading(true));
    GET.getAppointment({appointment_id: item.id, accessToken: accessToken})
      .then((res) => {
        setData(res.data);
        dispatch(setLoading(false));
      })
      .catch((err) => {
        showMessage(err);
        // console.log('err', err);
        dispatch(setLoading(false));
      });
  };

  // eslint-disable-next-line no-shadow
  const renderCheckBox = ({item, index}) => {
    return (
      <View key={index.toString()}>
        <CheckBox
          checked={data?.request_type_ids?.includes(item.id)}
          title={item.name}
          activeOpacity={0.8}
          key={index.toString()}
          iconType="material-community"
          checkedIcon="checkbox-marked"
          containerStyle={styles.checkItemCon}
          uncheckedIcon="checkbox-blank-outline"
          checkedColor={Colors.main}
          textStyle={styles.txtCheckBox}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.containerCreate}>
      <Header
        title={t('appointment_information')}
        hasAction={false}
        cancelCreate={true}
        onGoBack={onGoBack}
      />
      <View style={styles.titleCheckOrder}>
        <View style={css.fdR}>
          <View style={{width: SCREEN_WIDTH / 3}} />
          <View style={styles.numCheckOrder}>
            <View style={styles.numCheckOrderCon}>
              <Text style={styles.txtCheckOrder}>Số đặt lịch</Text>
            </View>
            <View style={styles.titleNumCheckOder}>
              <Text style={styles.txtReceptionName}>{data?.booking_name}</Text>
            </View>
            <View style={styles.numCheckOrderCon}>
              <Text style={styles.txtCheckOrder}>{t(data.state || '')}</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={styles.customerTab}>
        <View style={styles.title}>
          <IcCar fill={Colors.main} />
          <Text style={styles.txtTitle}>Thông tin xe</Text>
        </View>
        <LineInput
          leftTitle={t('license_plate')}
          rightTitle={t('current_kilometer_number')}
          leftValue={data?.vehicle?.license_plate || data?.license_plate}
          rightValue={data?.vehicle?.odometer || data?.x_current_kilometer}
          leftUpperCase={true}
          disabled={true}
          rightKeyBoardType="numeric"
        />
        <LineInput
          leftTitle={t('car_manufacturer')}
          rightTitle={t('model')}
          leftValue={data?.vehicle?.brand?.name || data?.x_brand_id}
          rightValue={data?.vehicle?.model?.name || data?.model_id}
          leftUpperCase={true}
          disabled={true}
          rightKeyBoardType="numeric"
        />
        <LineInput
          leftTitle={t('other_model')}
          rightTitle={'Cố vấn dịch vụ'}
          leftValue={data?.vehicle?.brand?.name || ''}
          rightValue={data?.adviser_id?.name || data?.adviser}
          leftUpperCase={true}
          disabled={true}
          rightKeyBoardType="numeric"
        />
        <View style={styles.title}>
          <IcAccount fill={Colors.main} />
          <Text style={styles.txtTitle}>{t('customer_information')}</Text>
        </View>
        <LineInput
          leftTitle={t('customer_name')}
          rightTitle={t('phone')}
          leftValue={data?.contact_name || ''}
          rightValue={data?.phone || ''}
          rightKeyBoardType="number-pad"
          disabled={true}
        />
        <View style={styles.addressCon}>
          <Text style={styles.leftTitle}>{t('address')}</Text>
          <View style={styles.streetCon}>
            <InputGrey value={data?.street} disabled={true} />
          </View>
        </View>
        <LineInput
          leftTitle={t('contact_name')}
          rightTitle={t('contact_phone')}
          leftValue={data?.x_contact_name || ''}
          rightValue={data?.x_contact_phone || ''}
          disabled={true}
          rightKeyBoardType="number-pad"
        />
        <View style={styles.title}>
          <IcCalendar fill={Colors.main} />
          <Text style={styles.txtTitle}>{t('appointment_time')}</Text>
        </View>
        <LineInput
          leftTitle={'Ngày hẹn'}
          rightTitle={'Thời gian hẹn'}
          leftValue={data?.datetime?.slice(0, 10) || ''}
          rightValue={
            data?.booking_minute === 'False'
              ? data?.booking_hour
              : `${data?.booking_hour}${' : '}${data?.booking_minute}` || ''
          }
          disabled={true}
          rightKeyBoardType="number-pad"
        />
        <View style={styles.addressCon}>
          <Text style={styles.leftTitle}>Đánh giá lịch hẹn</Text>
          <View style={styles.inputOtherModel}>
            <InputGrey value={data?.x_appointment_evaluation} disabled={true} />
          </View>
          <View style={styles.model}>
            <Text style={styles.textModel}>Đúng giờ</Text>
          </View>
          <CheckBox
            Component={() => (
              <TouchableOpacity
                activeOpacity={0.6}
                disabled={true}
                style={[styles.checkBoxItem]}>
                {data.x_on_time ? (
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
          <IcCustomerRequire fill={Colors.main} />
          <Text style={styles.txtTitle}>{t('request_of_customer')}</Text>
        </View>
        <FlatList
          horizontal
          data={requestTypes}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderCheckBox}
        />
        <LineInput
          leftTitle={'Lý do hủy'}
          rightTitle={'Mô tả'}
          leftValue={data?.x_reason_cancel_ids?.reason_cancel || ''}
          rightValue={data?.x_reason_cancel_ids?.description || ''}
          disabled={true}
          rightKeyBoardType="number-pad"
        />
        <Textarea
          bordered
          rowSpan={5}
          style={styles.requestOfCustomerText}
          placeholder={t('request_of_customer') + ' *'}
          value={data?.customer_require}
          disabled={true}
        />
        <View style={styles.addressCon} />
      </ScrollView>
    </SafeAreaView>
  );
}
