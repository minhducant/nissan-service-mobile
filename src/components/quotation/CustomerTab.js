import React, {useContext, forwardRef, useImperativeHandle} from 'react';
import {CheckBox} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';

import {
  repairStyles as styles,
  appointmentStyles as appStyles,
  css,
} from '@styles/index';
import {
  setCustomerSignature,
  setAdvisorSignature,
} from '@stores/appointment/actions';
import {Colors} from '@styles/index';
import {showMessage} from '@common/index';
import {formatDate} from '@services/utils';
import {URL_PUBLIC} from '@configs/Configs';
import {PUT} from '@repository/quotation/index';
import {setLoading} from '@stores/config/actions';
import {LocalizationContext} from '@context/index';
import {InputGrey, LineInput} from '@components/forms/index';
import {IcAccount, IcCar, IcRepair, IcInfo} from '@common/svg/index';

const CustomerTab = (props, ref) => {
  const data = props.item;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useContext(LocalizationContext);
  const {accessToken} = useSelector((st) => st.auth);
  const {customerSignature, advisorSignature} = useSelector(
    (st) => st.appointment,
  );

  useImperativeHandle(ref, () => ({
    updateSignature() {
      const params = {
        accessToken: accessToken,
        quotationId: data.id,
        signature_quotation_client: customerSignature,
        signature_quotation_adviser: advisorSignature,
      };
      if (customerSignature === '' && advisorSignature !== '') {
        showMessage('Thiếu chữ ký khách hàng!');
        dispatch(setLoading(false));
      } else if (customerSignature !== '' && advisorSignature === '') {
        showMessage('Thiếu chữ ký cố vấn dịch vụ!');
        dispatch(setLoading(false));
      } else {
        PUT.updateSignature(params)
          .then((res) => {
            dispatch(setLoading(false));
            dispatch(setCustomerSignature(''));
            dispatch(setAdvisorSignature(''));
            showMessage('Cập nhật chữ ký thành công!');
            props._getDetailQuotation();
            props.setIsSign(false);
          })
          .catch((err) => {
            dispatch(setLoading(false));
            showMessage(err);
            // console.log(err);
          });
      }
    },
  }));

  return (
    <ScrollView
      style={styles.customerTab}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <LineInput
        leftTitle={'Tiếp nhận'}
        rightTitle={'Ngày đặt hàng'}
        leftValue={data?.repair_request_id || ''}
        rightValue={
          formatDate(data?.date_order === '' ? '   ' : data?.date_order) || ''
        }
        leftUpperCase={true}
        disabled={true}
      />
      <View style={styles.addressCon}>
        <Text style={styles.leftTitle}>Báo giá trực tiếp</Text>
        <View style={styles.cityCon(true)}>
          <Text style={styles.txtAddress}>{data?.order_immediate_id}</Text>
        </View>
        <View style={appStyles.rightTitle}>
          <Text style={styles.leftTitle}>Có lịch hẹn</Text>
        </View>
        <View style={css.fx_1}>
          <CheckBox
            Component={() => (
              <TouchableOpacity
                activeOpacity={0.6}
                disabled={true}
                style={[styles.checkBoxItem]}>
                {data?.x_have_booking ? (
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
      </View>
      <View style={styles.title}>
        <IcCar fill={Colors.main} />
        <Text style={styles.txtTitle}>Thông tin xe</Text>
      </View>
      <LineInput
        leftTitle={t('license_plate')}
        rightTitle={t('current_kilometer_number')}
        leftValue={data?.vehicle?.license_plate || data?.car_id}
        rightValue={data?.vehicle?.odometer || data?.odometer}
        leftUpperCase={true}
        disabled={true}
      />
      <LineInput
        leftTitle={t('car_manufacturer')}
        rightTitle={t('model')}
        leftValue={data?.vehicle?.brand?.name || data?.brand_id}
        rightValue={data?.vehicle?.model?.name || data?.model_id}
        leftUpperCase={true}
        disabled={true}
      />
      <LineInput
        leftTitle={'Model khác'}
        rightTitle={'Số VIN'}
        leftValue={data?.vehicle?.model_other || data?.model_other}
        rightValue={data?.vehicle?.vin || data?.vin_sn}
        leftUpperCase={true}
        disabled={true}
      />
      <LineInput
        leftTitle={'Số máy'}
        rightTitle={'Mã màu'}
        leftValue={data?.vehicle?.engine_no || data?.engine_no}
        rightValue={data?.vehicle?.color || data?.color}
        leftUpperCase={true}
        disabled={true}
      />
      <View style={styles.title}>
        <IcAccount fill={Colors.main} />
        <Text style={styles.txtTitle}>{t('customer_information')}</Text>
      </View>
      <LineInput
        leftTitle={'Tên khách hàng'}
        rightTitle={'Số điện thoại'}
        leftValue={data?.customer?.name || ''}
        rightValue={data?.customer?.phone || ''}
        leftUpperCase={true}
        disabled={true}
      />
      <View style={styles.addressCon}>
        <Text style={styles.leftTitle}>{t('province_city')}</Text>
        <TouchableOpacity disabled={true} style={styles.cityCon(true)}>
          <Text style={styles.txtAddress}>
            {data?.customer?.province?.name || t('province_city')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={true} style={styles.districtCon(true)}>
          <Text style={styles.txtAddress}>
            {data?.customer?.district?.name || t('select_district')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={true} style={styles.cityCon(true)}>
          <Text style={styles.txtAddress}>
            {data?.customer?.ward?.name || t('select_ward')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.addressCon}>
        <Text style={styles.leftTitle}>{t('address')}</Text>
        <View style={styles.streetCon}>
          <InputGrey value={data?.customer?.street} disabled={true} />
        </View>
      </View>
      <LineInput
        leftTitle={'Người liên hệ'}
        rightTitle={'Số điện thoại liên hệ'}
        leftValue={data?.x_contact_name || ''}
        rightValue={data?.x_contact_phone || ''}
        leftUpperCase={true}
        disabled={true}
      />
      <View style={styles.title}>
        <IcRepair fill={Colors.main} />
        <Text style={styles.txtTitle}>Thông tin sửa chữa</Text>
      </View>
      <LineInput
        leftTitle={'Loại sửa chữa'}
        rightTitle={'Ngày dự kiến giao'}
        leftValue={data?.request_type_name?.join(', ') || ''}
        rightValue={
          formatDate(
            data?.date_hand_plan === '' ? '   ' : data?.date_hand_plan,
          ) || ''
        }
        leftUpperCase={true}
        disabled={true}
      />
      <LineInput
        leftTitle={'Hãng bảo hiểm'}
        rightTitle={'Hợp đồng bảo hiểm'}
        leftValue={data?.insurance_provider || ''}
        rightValue={data?.x_insurance_number || ''}
        leftUpperCase={true}
        disabled={true}
      />
      <LineInput
        leftTitle={'Ngày bắt đầu Bảo hiểm'}
        rightTitle={'Ngày kết thúc bảo hiểm'}
        leftValue={
          data?.x_insure_start_date === ''
            ? '  '
            : formatDate(data?.x_insure_start_date) || ''
        }
        rightValue={
          data?.x_insure_end_date === ''
            ? '  '
            : formatDate(data?.x_insure_end_date) || ''
        }
        leftUpperCase={true}
        disabled={true}
      />
      <LineInput
        leftTitle={'Đơn vị bảo hành'}
        rightTitle={'Việc cần làm lần trước'}
        leftValue={data?.guarantee_provider || ''}
        rightValue={data?.x_reminder || ''}
        leftUpperCase={true}
        disabled={true}
      />
      <View style={styles.addressCon}>
        <Text style={styles.leftTitle}>Rửa xe</Text>
        <CheckBox
          Component={() => (
            <TouchableOpacity
              activeOpacity={0.6}
              disabled={true}
              style={[styles.checkBoxItem]}>
              {data?.x_is_car_wash ? (
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
        <View style={appStyles.rightTitle}>
          <Text style={appStyles.rightTxt}>Lưu ý của quản đốc</Text>
        </View>
        <View style={styles.cityCon(true)}>
          <Text style={styles.txtAddress}>{data?.x_note}</Text>
        </View>
      </View>
      <View style={styles.addressCon}>
        <Text style={styles.leftTitle}>KH lấy phụ tùng cũ</Text>
        <CheckBox
          Component={() => (
            <TouchableOpacity
              activeOpacity={0.6}
              disabled={true}
              style={[styles.checkBoxItem]}>
              {data?.x_old_spare_parts ? (
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
        <View style={appStyles.rightTitle}>
          <Text style={appStyles.rightTxt}>Khách hàng chờ</Text>
        </View>
        <View style={css.fx_1}>
          <CheckBox
            Component={() => (
              <TouchableOpacity
                activeOpacity={0.6}
                disabled={true}
                style={[styles.checkBoxItem]}>
                {data?.x_is_wait_car ? (
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
      </View>
      <View style={styles.title}>
        <IcInfo fill={Colors.main} />
        <Text style={styles.txtTitle}>{t('confirmation_information')}</Text>
      </View>
      <View style={styles.sigCon}>
        <View style={css.fx_1}>
          <Text style={styles.titleSignature}>Chữ ký xác nhận báo giá</Text>
          <TouchableOpacity
            style={styles.signatureConReceive}
            activeOpacity={1}
            onPress={() => {
              props.isSign &&
                data.have_signature_client !== true &&
                navigation.navigate('SignatureQuotation', {
                  type: 'customer',
                });
            }}>
            <Text style={styles.txtCusSignature}>Khách hàng ký</Text>
            <Image
              style={css.fx_1}
              resizeMode="contain"
              source={{
                uri:
                  data.have_signature_client === true
                    ? data.check_date_sign_client === false
                      ? `${URL_PUBLIC}${data.img_link_1}`
                      : `data:image/jpeg;base64,${customerSignature}`
                    : `data:image/jpeg;base64,${customerSignature}`,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={css.fx_1}>
          <Text style={styles.titleSignature}>Chữ ký cố vấn dịch vụ</Text>
          <TouchableOpacity
            style={styles.signatureConHanding}
            activeOpacity={1}
            onPress={() => {
              props.isSign &&
                data.have_signature_adviser !== true &&
                navigation.navigate('SignatureQuotation', {
                  type: 'advisor',
                });
            }}>
            <Text style={styles.txtCusSignature}>Cố vấn dịch vụ ký</Text>
            <Image
              style={css.fx_1}
              resizeMode="contain"
              source={{
                uri:
                  data.have_signature_adviser === true
                    ? data.check_date_sign_adviser === false
                      ? `${URL_PUBLIC}${data.img_link_2}`
                      : `data:image/jpeg;base64,${advisorSignature}`
                    : `data:image/jpeg;base64,${advisorSignature}`,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default forwardRef(CustomerTab);
