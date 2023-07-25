import React, {useContext, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {LocalizationContext} from '@context/index';
import {CustomerTab} from '@components/reception/index';
import {Header} from '@components/headers/index';
import {receptionStyles as styles} from '@styles/index';
import {POST} from '@repository/reception/index';
import {WarningCheckOrder, SearchModal} from '@components/modals/index';
import {setLoading} from '@stores/config/actions';
import {showMessage} from '@common/index';
import {setVehicle, setCustomer} from '@stores/appointment/actions';

const CreateCustomerScreen = () => {
  const navigation = useNavigation();
  const {t} = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const {vehicle, customer} = useSelector((st) => st.appointment);
  const {
    listBrand,
    listModel,
    listVNProvince,
    listDistrict,
    listWard,
  } = useSelector((st) => st.conf);
  const [warningData, setWarningData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showProvince, setShowProvince] = useState(false);
  const [showDistrict, setShowDistrict] = useState(false);
  const [showWard, setShowWard] = useState(false);
  const [listVehicleModel, setListVehicleModel] = useState([]);
  const [listDistrictSelected, setListDistrictSelected] = useState([]);
  const [listWardSelected, setListWardSelected] = useState([]);

  const onChangeModelBrand = (item) => {
    const newVehicle = {
      ...vehicle,
      brandName: item.name,
      brandId: item.id,
      modelName: '',
      modelId: null,
    };
    dispatch(setVehicle(newVehicle));
    const newListModel = listModel.filter(
      (itemModel) => itemModel.brand.id === item.id,
    );
    setListVehicleModel(newListModel);
    setShowBrand(false);
  };
  const onChangeModel = (item) => {
    const newVehicle = {...vehicle, modelName: item.name, modelId: item.id};
    dispatch(setVehicle(newVehicle));
    setShowModel(false);
  };
  const onChangeProvince = (item) => {
    const newListDistrict = listDistrict.filter(
      (it) => it.state.id === item.id,
    );
    setListDistrictSelected(newListDistrict);
    const newCustomer = {
      ...customer,
      provinceId: item.id,
      provinceName: item.name,
    };
    dispatch(setCustomer(newCustomer));
    setShowProvince(false);
  };
  const onChangeDistrict = (item) => {
    const newListWard = listWard.filter((it) => it.district_id === item.id);
    const newCustomer = {
      ...customer,
      districtId: item.id,
      districtName: item.name,
    };
    setListWardSelected(newListWard);
    dispatch(setCustomer(newCustomer));
    setShowDistrict(false);
  };
  const onChangeWard = (item) => {
    const newCustomer = {
      ...customer,
      wardId: item.id,
      wardName: item.name,
    };
    dispatch(setCustomer(newCustomer));
    setShowWard(false);
  };
  const createError = (typeError, title, data) => {
    if (typeError) {
      setWarningData((prev) => prev.concat([{title, data}]));
      return true;
    }
    return false;
  };
  const checkRequire = () => {
    const nameBool = createError(!customer.name, 'Thiếu tên khách hàng', []);
    const phoneBool = createError(
      !customer.phone,
      'Thiếu số điện thoại khách hàng',
      [],
    );
    const licensePlateBool = createError(
      !vehicle.licensePlate,
      'Thiếu biển số xe',
      [],
    );
    const engNoBool = createError(!vehicle.engineNo, 'Thiếu số máy', []);
    const modelIdBool = createError(!vehicle.modelId, 'Thiếu model xe', []);
    const odoMeterBool = createError(!vehicle.odoMeter, 'Thiếu số Km', []);
    const brandIdBool = createError(!vehicle.brandId, 'Thiếu hãng xe', []);
    const vinBool = createError(!vehicle.vin, 'Thiếu số vin', []);
    const provinceIdBool = createError(
      !customer.provinceId,
      'Thiếu tỉnh/thành',
      [],
    );
    const districtIdBool = createError(
      !customer.districtId,
      'Thiếu quận/huyện',
      [],
    );
    const wardIdBool = createError(!customer.wardId, 'Thiếu xã/phường', []);
    const streetBool = createError(!customer.street, 'Thiếu tên đường/phố', []);
    const contactNameBool = createError(
      !customer.contactName,
      'Thiếu tên người liên hệ',
      [],
    );
    const contactPhoneBool = createError(
      !customer.contactPhone,
      'Thiếu số điện thoại người liên hệ',
      [],
    );

    const finalChecked = [
      nameBool,
      phoneBool,
      licensePlateBool,
      engNoBool,
      modelIdBool,
      odoMeterBool,
      brandIdBool,
      vinBool,
      provinceIdBool,
      districtIdBool,
      wardIdBool,
      streetBool,
      contactNameBool,
      contactPhoneBool,
    ].some((e) => e === true);
    if (finalChecked) {
      setIsShow(true);
      return true;
    } else {
      return false;
    }
  };
  const createCustomer = () => {
    const checked = checkRequire();
    if (!checked) {
      dispatch(setLoading(true));
      POST.createCustomer({
        name: customer.name,
        phone: customer.phone,
        districtId: customer.districtId,
        stateId: customer.provinceId,
        wardId: customer.wardId,
        licensePlate: vehicle.licensePlate,
        brandId: vehicle.brandId,
        modelId: vehicle.modelId,
        vin: vehicle.vin,
        color: vehicle.color,
        odometer: vehicle.odoMeter,
        street: customer.street,
        engineNo: vehicle.engineNo,
      })
        .then((res) => {
          dispatch(setLoading(false));
          showMessage('Tạo mới khách hàng thành công!');
          const newCus = {...customer, id: res.data.customer.id};
          dispatch(setCustomer(newCus));
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        })
        .catch((err) => {
          dispatch(setLoading(false));
          showMessage(err);
        });
    }
  };
  return (
    <SafeAreaView style={styles.containerCreate}>
      <Header title={t('create_customer')} hasAction={false} />
      <CustomerTab
        isCreateCustomer={true}
        showBrand={setShowBrand}
        showModel={setShowModel}
        showProvince={setShowProvince}
        showDistrict={setShowDistrict}
        showWard={setShowWard}
      />
      <TouchableOpacity
        onPress={() => createCustomer()}
        style={styles.btnCreate}>
        <Text style={styles.txtUpdate}>{t('save')}</Text>
      </TouchableOpacity>
      <WarningCheckOrder
        {...{isShow, setIsShow}}
        warningData={warningData}
        setWarningData={setWarningData}
      />
      <SearchModal
        visible={showBrand}
        data={listBrand}
        title={t('car_manufacturer')}
        onDismiss={setShowBrand}
        placeholder={t('car_manufacturer')}
        setValue={onChangeModelBrand}
      />
      <SearchModal
        visible={showModel}
        data={listVehicleModel}
        title={t('model')}
        onDismiss={setShowModel}
        placeholder={t('model')}
        setValue={onChangeModel}
      />
      <SearchModal
        visible={showProvince}
        data={listVNProvince}
        title={t('province_city')}
        onDismiss={setShowProvince}
        placeholder={t('province_city')}
        setValue={onChangeProvince}
      />
      <SearchModal
        visible={showDistrict}
        data={listDistrictSelected}
        title={t('select_district')}
        onDismiss={setShowDistrict}
        placeholder={t('select_district')}
        setValue={onChangeDistrict}
      />
      <SearchModal
        visible={showWard}
        data={listWardSelected}
        title={t('select_ward')}
        onDismiss={setShowWard}
        placeholder={t('select_ward')}
        setValue={onChangeWard}
      />
    </SafeAreaView>
  );
};
export default CreateCustomerScreen;
