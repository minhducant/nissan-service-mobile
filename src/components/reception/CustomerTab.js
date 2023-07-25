import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {LocalizationContext} from '@context/index';
import {
  receptionStyles as styles,
  appointmentStyles as appStyles,
  css,
} from '@styles/index';
import {ScannerLicencePlate, RequestTypes} from '@components/reception/index';
import {Colors} from '@styles/index';
import {IcAccount, IcCar, IcInfo} from '@common/svg/index';
import {
  InputGrey,
  LineInput,
  PickerDateItem,
  PickerDateTime,
} from '@components/forms/index';
import {TouchableOpacity} from 'react-native';
import {setLoading} from '@stores/config/actions';
import {
  setVehicle,
  setCustomer,
  setDateOrder,
  setWarrantyDate,
} from '@stores/appointment/actions';
import {GET} from '@repository/appointment/index';
import {URL_PUBLIC} from '@configs/Configs';
import showMessage from '@common/showMessage';
function CustomerTab({
  showBrand,
  showModel,
  showProvince,
  showDistrict,
  showWard,
  disabled,
  isCreateCustomer = false,
  setListVehicleModel,
}) {
  const dispatch = useDispatch();
  const {customer, vehicle, dateOrder, warrantyDate} = useSelector(
    (st) => st.appointment,
  );
  const {listModel} = useSelector((st) => st.conf);
  const [isWarning, setIsWarning] = useState(false);
  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch]);
  const {t} = useContext(LocalizationContext);
  const onChangeLicensePlate = (txt) => {
    const newVehicle = {...vehicle, licensePlate: txt};
    dispatch(setVehicle(newVehicle));
  };
  const onChangeColor = (txt) => {
    const newVehicle = {...vehicle, color: txt};
    dispatch(setVehicle(newVehicle));
  };
  const onChangeVin = (txt) => {
    const newVehicle = {...vehicle, vin: txt};
    dispatch(setVehicle(newVehicle));
  };
  const onChangeOdoMeter = (txt) => {
    const newVehicle = {...vehicle, odoMeter: parseFloat(txt)};
    dispatch(setVehicle(newVehicle));
  };
  const onChangeCusName = (txt) => {
    const newCus = {...customer, name: txt, contactName: txt};
    dispatch(setCustomer(newCus));
  };
  const onChangeCusPhone = (txt) => {
    const newCus = {...customer, phone: txt, contactPhone: txt};
    dispatch(setCustomer(newCus));
  };
  const onChangeContactName = (txt) => {
    const newCus = {...customer, contactName: txt};
    dispatch(setCustomer(newCus));
  };
  const onChangeContactPhone = (txt) => {
    const newCus = {...customer, contactPhone: txt};
    dispatch(setCustomer(newCus));
  };
  const onChangeStreet = (txt) => {
    const newCus = {...customer, street: txt};
    dispatch(setCustomer(newCus));
  };
  const selectImageModel = (idModel) => {
    const itemModel = listModel.find((it) => it.id === idModel);
    if (itemModel?.image_car) {
      return itemModel?.image_car;
    } else {
      return '';
    }
  };
  const onActionScannerBar = async (scannerLicencePlate) => {
    dispatch(setLoading(true));
    await GET.searchCustomerByLicensePlate(scannerLicencePlate)
      .then((res) => {
        const cus = res.data.customer;
        const veh = res.data.vehicle;
        const cusValues = {
          id: cus.id,
          name: cus.name,
          phone: cus.phone,
          districtId: cus.district.id,
          districtName: cus.district.name,
          provinceId: cus.province.id,
          provinceName: cus.province.name,
          street: cus.street,
          contactName: cus.name,
          contactPhone: cus.phone,
          wardName: cus.ward.name,
          wardId: cus.ward.id,
        };
        const vehValues = {
          licensePlate: veh.license_plate,
          vin: veh.vin,
          modelId: veh.model.id,
          modelName: veh.model.name,
          color: veh.color,
          odoMeter: veh.odometer,
          brandId: veh.brand.id,
          brandName: veh.brand.name,
          imageModel: veh.model.id ? selectImageModel(veh.model.id) : '',
        };
        dispatch(setCustomer(cusValues));
        dispatch(setVehicle(vehValues));
        if (veh.brand.id) {
          const newListModel = listModel.filter(
            (itemModel) => itemModel.brand.id === veh.brand.id,
          );
          if (newListModel) {
            setListVehicleModel(newListModel);
          }
        }

        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        // console.log(err);
        showMessage(`${err}`);
      });
  };
  const handleDateOrder = (date) => {
    // const dateStr = moment(date).format(VN_FORMAT_DATETIME);
    dispatch(setDateOrder(date));
    // console.log(date);
  };
  const handleWarrantyDate = (dateStr, date) => {
    dispatch(setWarrantyDate(dateStr));
  };
  const onBlur = () => {
    onActionScannerBar(vehicle.licensePlate);
  };
  const onChangeEngineNum = (txt) => {
    const newVehicle = {...vehicle, engineNo: txt};
    dispatch(setVehicle(newVehicle));
  };
  const onBlurVin = () => {
    if (vehicle.vin.length !== 17) {
      setIsWarning(true);
    } else {
      setIsWarning(false);
    }
  };
  return (
    <ScrollView style={styles.customerTab}>
      <ScannerLicencePlate disabled={disabled} onPress={onActionScannerBar} />
      <View style={styles.title}>
        <IcCar fill={Colors.main} />
        <Text style={styles.txtTitle}>{t('vehicle_information')}</Text>
      </View>
      <LineInput
        leftTitle={t('license_plate')}
        rightTitle={t('vehicle_color')}
        leftValue={vehicle.licensePlate || ''}
        setLeftValue={onChangeLicensePlate}
        setRightValue={onChangeColor}
        rightValue={vehicle.color || ''}
        leftUpperCase={true}
        disabled={disabled}
        leftOnBlur={onBlur}
        lefRequire={true}
      />
      <LineInput
        leftTitle={t('vin')}
        rightTitle={t('kilometer_number')}
        leftValue={vehicle.vin || ''}
        setLeftValue={onChangeVin}
        leftOnBlur={onBlurVin}
        setRightValue={onChangeOdoMeter}
        rightValue={vehicle.odoMeter || ''}
        leftUpperCase={true}
        rightKeyBoardType="number-pad"
        disabled={disabled}
        lefRequire={true}
        rightRequire={true}
      />
      {isWarning && <Text style={styles.warnText}>{t('warn_17_cha')}</Text>}
      {isCreateCustomer && (
        <LineInput
          leftTitle={t('engine_number')}
          leftValue={vehicle.engineNo || ''}
          setLeftValue={onChangeEngineNum}
          hasRight={false}
          leftUpperCase={true}
          lefRequire={true}
        />
      )}
      <View style={styles.addressCon}>
        <Text style={styles.leftTitle}>
          {t('car_manufacturer')}
          <Text style={styles.require}>*</Text>
        </Text>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            showBrand();
          }}
          style={styles.cityCon(disabled)}>
          <Text style={styles.txtAddress}>
            {vehicle.brandName || t('car_manufacturer')}
          </Text>
        </TouchableOpacity>
        <View style={styles.model}>
          <Text style={styles.textModel}>
            {t('model')}
            <Text style={styles.require}>*</Text>
          </Text>
        </View>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            showModel();
          }}
          style={styles.cityCon(disabled)}>
          <Text style={styles.txtAddress}>
            {vehicle.modelName || t('model')}
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
        leftValue={customer.name || ''}
        setLeftValue={onChangeCusName}
        setRightValue={onChangeCusPhone}
        rightValue={customer.phone || ''}
        rightKeyBoardType="number-pad"
        disabled={disabled}
        lefRequire={true}
        rightRequire={true}
      />
      <View style={styles.addressCon}>
        <Text style={styles.leftTitle}>
          {t('province_city')} <Text style={styles.require}>*</Text>
        </Text>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => showProvince()}
          style={styles.cityCon(disabled)}>
          <Text style={styles.txtAddress}>
            {customer.provinceName || t('province_city')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => showDistrict()}
          style={styles.districtCon(disabled)}>
          <Text style={styles.txtAddress}>
            {customer.districtName || t('select_district')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            showWard();
          }}
          style={styles.cityCon(disabled)}>
          <Text style={styles.txtAddress}>
            {customer.wardName || t('select_ward')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.addressCon}>
        <Text style={styles.leftTitle}>
          {t('address')} <Text style={styles.require}>*</Text>
        </Text>
        <View style={styles.streetCon}>
          <InputGrey
            value={customer.street}
            setValue={onChangeStreet}
            disabled={disabled}
          />
        </View>
      </View>
      <LineInput
        leftTitle={t('contact_name')}
        rightTitle={t('contact_phone')}
        leftValue={customer.contactName || ''}
        setLeftValue={onChangeContactName}
        setRightValue={onChangeContactPhone}
        rightValue={customer.contactPhone || ''}
        disabled={disabled}
        lefRequire={true}
        rightRequire={true}
      />
      {!isCreateCustomer && (
        <View style={appStyles.inputContain}>
          <Text style={appStyles.leftTitle}>{t('date_order')}</Text>
          <View style={css.fx_1}>
            <PickerDateTime
              disabled={disabled}
              value={dateOrder}
              setValue={handleDateOrder}
              // title={'date_order'}
            />
          </View>
          <View style={appStyles.rightTitle}>
            <Text style={appStyles.rightTxt}>{t('warranty_date')}</Text>
          </View>
          <View style={css.fx_1}>
            <PickerDateItem
              disabled={disabled}
              value={warrantyDate}
              setValue={handleWarrantyDate}
            />
          </View>
        </View>
      )}
      {!isCreateCustomer && <RequestTypes disabled={disabled} />}
      <View style={styles.title}>
        <IcInfo fill={Colors.main} />
        <Text style={styles.txtTitle}>{t('confirmation_information')}</Text>
      </View>
      <View style={styles.sigCon}>
        <View style={css.fx_1}>
          <Text style={styles.titleSignature}>{t('signature_receive')}</Text>
          <View style={styles.signatureConReceive}>
            <Text style={styles.txtCusSignature}>{t('customer_sign')}</Text>
            <Image
              style={css.fx_1}
              resizeMode="contain"
              source={{
                uri: customer.urlImageSignatureReceive
                  ? `${URL_PUBLIC}${
                      customer.urlImageSignatureReceive
                    }?random=${Math.random().toString(36).substring(7)}`
                  : `data:image/jpeg;base64,${customer.imageSignature}`,
              }}
            />
          </View>
        </View>
        <View style={css.fx_1}>
          <Text style={styles.titleSignature}>{t('signature_handing')}</Text>
          <View style={styles.signatureConHanding}>
            <Text style={styles.txtCusSignature}>{t('customer_sign')}</Text>
            <Image
              style={css.fx_1}
              resizeMode="contain"
              source={{
                uri: `${URL_PUBLIC}${
                  customer.urlImageSignatureHanding
                }?random=${Math.random().toString(36).substring(7)}`,
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
export default React.memo(CustomerTab);
