import React, {useContext} from 'react';
import {Textarea} from 'native-base';
import {CheckBox} from 'react-native-elements';
import {View, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';

import {
  repairStyles as styles,
  appointmentStyles as appStyles,
  css,
} from '@styles/index';
import {Colors} from '@styles/index';
import {
  IcAccount,
  IcCar,
  IcCalendar,
  IcCustomerRequire,
} from '@common/svg/index';
import {LocalizationContext} from '@context/index';
import {InputGrey, LineInput, PickerDateTime} from '@components/forms/index';

function CustomerTab({
  showBrand,
  showModel,
  disabled,
  brandId,
  modelId,
  setLicensePlate,
  licensePlate,
  odometer,
  setOdometer,
  otherModel,
  setOtherModel,
  adviserId,
  setAdviserId,
  customerName,
  setCustomerName,
  phone,
  setPhone,
  address,
  setAddress,
  contactName,
  setContactName,
  contactPhone,
  setContactPhone,
  bookingDate,
  setBookingDate,
  bookingHours,
  setBookingHours,
  customerRequire,
  setCustomerRequire,
  requestTypeIds,
  setRequestTypeIds,
  showAdviser,
  isCreateRepairSchedule = false,
  searchLicensePlate,
  evaluation,
  setEvaluation,
  setBookingMinutes,
}) {
  const {t} = useContext(LocalizationContext);
  const requestTypes = [
    {code: 'repair', id: 1, name: 'Sửa chữa thông thường'},
    {code: 'repair_insurance', id: 2, name: 'Sửa chữa bảo hiểm'},
    {code: 'guarantee', id: 3, name: 'Bảo hành'},
    {code: 'repair_internal', id: 5, name: 'Sửa chữa nội bộ'},
    {code: 'pdi', id: 6, name: 'PDI'},
  ];

  const onChangeCusName = (txt) => {
    setCustomerName(txt);
    setContactName(txt);
  };
  const onChangeCusPhone = (txt) => {
    setPhone(txt);
    setContactPhone(txt);
  };
  const onChangeStreet = (txt) => {
    setAddress(txt);
  };
  const onChangeLicensePlate = (txt) => {
    setLicensePlate(txt);
  };
  const onChangeOdoMeter = (txt) => {
    setOdometer(txt);
  };
  const onChangeContactName = (txt) => {
    setContactName(txt);
  };
  const onChangeContactPhone = (txt) => {
    setContactPhone(txt);
  };

  const onChangeOtherModel = (txt) => {
    setOtherModel(txt);
  };
  const handleWarrantyDate = (dateStr) => {
    setBookingDate(dateStr);
    setBookingHours(getTimeFromDateTime(dateStr).slice(0, 2));
    setBookingMinutes(getTimeFromDateTime(dateStr).slice(3));
  };

  const onChangeCustomerRequire = (txt) => {
    setCustomerRequire(txt);
  };

  const onBlur = () => {
    searchLicensePlate(licensePlate);
  };
  // const onChangeEvaluation = (txt) => {
  //   setEvaluation(txt);
  // };

  const onSelect = (item) => {
    setRequestTypeIds((prev) =>
      requestTypeIds.includes(item.id)
        ? prev.filter((e) => e !== item.id)
        : prev.concat([item.id]),
    );
  };

  const renderCheckBox = ({item, index}) => {
    return (
      <View key={index.toString()}>
        <CheckBox
          onPress={() => {
            onSelect(item);
          }}
          checked={requestTypeIds.includes(item.id)}
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
    <ScrollView style={styles.customerTab}>
      <View style={styles.title}>
        <IcCar fill={Colors.main} />
        <Text style={styles.txtTitle}>Thông tin xe</Text>
      </View>
      <LineInput
        leftTitle={t('license_plate')}
        rightTitle={t('current_kilometer_number')}
        leftValue={licensePlate || ''}
        setLeftValue={onChangeLicensePlate}
        setRightValue={onChangeOdoMeter}
        rightValue={odometer || ''}
        leftUpperCase={true}
        disabled={disabled}
        rightKeyBoardType="numeric"
        lefRequire={true}
        leftOnBlur={onBlur}
      />
      <View style={styles.addressCon}>
        <Text style={styles.leftTitle}>{t('car_manufacturer')}</Text>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            showBrand();
          }}
          style={styles.cityCon(disabled)}>
          <Text style={styles.txtAddress}>
            {brandId.name || t('car_manufacturer')}
          </Text>
        </TouchableOpacity>
        <View style={styles.model}>
          <Text style={styles.textModel}>{t('model')}</Text>
        </View>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            showModel();
          }}
          style={styles.cityCon(disabled)}>
          <Text style={styles.txtAddress}>{modelId?.name || t('model')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.addressCon}>
        <Text style={styles.leftTitle}>{t('other_model')}</Text>
        <View style={styles.inputOtherModel}>
          <InputGrey
            value={otherModel}
            setValue={onChangeOtherModel}
            disabled={disabled}
          />
        </View>
        <View style={styles.model}>
          <Text style={styles.textModel}>Cố vấn dịch vụ</Text>
        </View>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            showAdviser(true);
          }}
          style={styles.cityCon(disabled)}>
          <Text style={styles.txtAddress}>
            {adviserId.name || 'Cố vấn dịch vụ'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <IcAccount fill={Colors.main} />
        <Text style={styles.txtTitle}>{t('customer_information')}</Text>
      </View>
      <LineInput
        leftTitle={t('customer_name')}
        rightTitle={t('phone')}
        leftValue={customerName || ''}
        setLeftValue={onChangeCusName}
        setRightValue={onChangeCusPhone}
        rightValue={phone || ''}
        rightKeyBoardType="number-pad"
        disabled={disabled}
        lefRequire={true}
        rightRequire={true}
      />
      <View style={styles.addressCon}>
        <Text style={styles.leftTitle}>{t('address')}</Text>
        <View style={styles.streetCon}>
          <InputGrey
            value={address}
            setValue={onChangeStreet}
            disabled={disabled}
          />
        </View>
      </View>
      <LineInput
        leftTitle={t('contact_name')}
        rightTitle={t('contact_phone')}
        leftValue={contactName || ''}
        setLeftValue={onChangeContactName}
        setRightValue={onChangeContactPhone}
        rightValue={contactPhone || ''}
        disabled={disabled}
        rightKeyBoardType="number-pad"
        lefRequire={true}
        rightRequire={true}
      />
      <View style={styles.title}>
        <IcCalendar fill={Colors.main} />
        <Text style={styles.txtTitle}>{t('appointment_time')}</Text>
      </View>
      <View style={styles.addressCon}>
        <Text style={appStyles.leftTitle}>
          Ngày đặt hẹn <Text style={styles.require}>*</Text>
        </Text>
        <View style={css.fx_1}>
          <PickerDateTime
            disabled={disabled}
            value={bookingDate}
            setValue={handleWarrantyDate}
          />
        </View>
        <View style={appStyles.rightTitle} />
        <View style={css.fx_1} />
      </View>
      {/* <View style={styles.addressCon}>
        <Text style={styles.leftTitle}>Đánh giá lịch hẹn</Text>
        <View style={styles.inputOtherModel}>
          <InputGrey
            value={evaluation}
            setValue={onChangeEvaluation}
            disabled={disabled}
          />
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
              <></>
            </TouchableOpacity>
          )}
        />
      </View> */}
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
      <Textarea
        bordered
        rowSpan={5}
        style={styles.requestOfCustomerText}
        placeholder={t('request_of_customer') + ' *'}
        value={customerRequire}
        disabled={disabled}
        onChangeText={onChangeCustomerRequire}
      />
      <View style={styles.title} />
    </ScrollView>
  );
}
export default React.memo(CustomerTab);

function getTimeFromDateTime(date) {
  const dateSplit = date.split(' ');
  const time = dateSplit[1].slice(0, 5);
  return time;
}
