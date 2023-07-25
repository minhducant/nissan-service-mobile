import React, {useContext, useState, useEffect} from 'react';
import moment from 'moment';
import {SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {LocalizationContext} from '@context/index';
import {POST, GET} from '@repository/appointment/index';
import {CustomerTab} from '@components/schedule/index';
import Footer from '@components/schedule/Footer';
import {Header} from '@components/headers/index';
import {SearchModal} from '@components/modals/index';
import {receptionStyles as styles} from '@styles/index';
import {setLoading} from '@stores/config/actions';
import {showMessage} from '@common/index';
import {GL_FORMAT_DATETIME} from '@configs/Configs';
import {setEmptyData} from '@stores/appointment/actions';

const CreateRepairSchedule = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {accessToken} = useSelector((st) => st.auth);
  const {listBrand, listModel} = useSelector((st) => st.conf);
  const companyId = useSelector((st) => st.auth.user.company_id.id);
  const {t} = useContext(LocalizationContext);
  const [showBrand, setShowBrand] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showAdviser, setShowAdviser] = useState(false);
  const [listVehicleModel, setListVehicleModel] = useState([]);
  const [brandId, setBrandId] = useState([]);
  const [modelId, setModelId] = useState([]);
  const [licensePlate, setLicensePlate] = useState('');
  const [odometer, setOdometer] = useState(0);
  const [otherModel, setOtherModel] = useState('');
  const [adviserId, setAdviserId] = useState([]);
  const [customerName, setCustomerName] = useState(0);
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [bookingDate, setBookingDate] = useState(
    moment(moment().toDate().getTime()).format(GL_FORMAT_DATETIME),
  );
  const [bookingHours, setBookingHours] = useState('');
  const [bookingMinutes, setBookingMinutes] = useState('');
  const [onTime, setOnTime] = useState(false);
  const [customerRequire, setCustomerRequire] = useState('');
  const [requestTypeIds, setRequestTypeIds] = useState([]);
  const [listAdvisers, setListAdvisers] = useState([]);
  const [evaluation, setEvaluation] = useState('');

  useEffect(() => {
    _getCarServices();
    return () => {
      dispatch(setEmptyData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _getCarServices = async () => {
    dispatch(setLoading(true));
    GET.getAdviser({accessToken: accessToken, company_id: companyId})
      .then((res) => {
        setListAdvisers(res.data);
        dispatch(setLoading(false));
      })
      .catch((err) => {
        showMessage(err);
        dispatch(setLoading(false));
      });
  };

  const onChangeModelBrand = (item) => {
    setShowBrand(false);
    setBrandId(item);
    const newListModel = listModel.filter(
      (itemModel) => itemModel.brand.id === item.id,
    );
    setListVehicleModel(newListModel);
    setModelId([]);
  };

  const onChangeModel = (item) => {
    setShowModel(false);
    setModelId(item);
  };

  const onChangeAdviser = (item) => {
    setShowAdviser(false);
    setAdviserId(item);
  };

  const searchLicensePlate = async (license_plate) => {
    dispatch(setLoading(true));
    await GET.searchCustomerByLicensePlate(license_plate)
      .then((res) => {
        // console.log(res.data);
        setOdometer(res.data.vehicle.odometer);
        setBrandId(res.data.vehicle.brand);
        setModelId(res.data.vehicle.model);
        setAddress(res.data.address);
        setPhone(res.data.customer_phone);
        setCustomerName(res.data.customer_name);
        setContactName(res.data.contact_name);
        setContactPhone(res.data.phone);
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        // console.log(err);
        showMessage(`${err}`);
      });
  };

  const handleButton = (key) => {
    dispatch(setLoading(true));
    const params = {
      accessToken: accessToken,
      license_plate: licensePlate,
      x_current_kilometer: odometer,
      x_brand_id: brandId?.id,
      model_id: modelId?.id,
      adviser_id: adviserId.id,
      x_contact_phone: contactPhone,
      x_contact_name: contactName,
      contact_name: customerName,
      phone: phone,
      street: address,
      booking_date: bookingDate,
      booking_hour:
        bookingHours || getTimeFromDateTime(bookingDate).slice(0, 2),
      booking_minute:
        bookingMinutes || getTimeFromDateTime(bookingDate).slice(3),
      customer_require: customerRequire,
      request_type_ids: requestTypeIds,
      x_appointment_evaluation: evaluation,
    };
    // console.log(params);
    if (key === 'cancel') {
      dispatch(setLoading(false));
      navigation.goBack();
    }
    if (key === 'save') {
      if (
        licensePlate === '' ||
        customerName === '' ||
        phone === 0 ||
        contactName === '' ||
        contactPhone === 0 ||
        bookingDate === ' ' ||
        customerRequire === ''
      ) {
        showMessage('Thông tin nhập bị thiếu');
        dispatch(setLoading(false));
      } else if (phone.length !== 10 || contactPhone.length !== 10) {
        showMessage('Số điện thoại phải có 10 chữ số');
        dispatch(setLoading(false));
      } else {
        POST.createRepairSchedule(params)
          .then((res) => {
            navigation.navigate('Information', {
              item: res.data.appointment,
            });
            showMessage(res.message);
            dispatch(setLoading(false));
          })
          .catch((err) => {
            dispatch(setLoading(false));
            showMessage(err);
            // console.log(err);
          });
      }
    }
  };

  return (
    <SafeAreaView style={styles.containerCreate}>
      <Header title={'Tạo lịch hẹn'} hasAction={false} />
      <CustomerTab
        isCreateRepairSchedule={true}
        showBrand={setShowBrand}
        showModel={setShowModel}
        showAdviser={setShowAdviser}
        brandId={brandId}
        modelId={modelId}
        licensePlate={licensePlate}
        setLicensePlate={setLicensePlate}
        odometer={odometer}
        setOdometer={setOdometer}
        otherModel={otherModel}
        setOtherModel={setOtherModel}
        adviserId={adviserId}
        setAdviserId={setAdviserId}
        customerName={customerName}
        setCustomerName={setCustomerName}
        phone={phone}
        setPhone={setPhone}
        address={address}
        setAddress={setAddress}
        contactName={contactName}
        setContactName={setContactName}
        contactPhone={contactPhone}
        setContactPhone={setContactPhone}
        bookingDate={bookingDate}
        setBookingDate={setBookingDate}
        bookingHours={bookingHours}
        setBookingHours={setBookingHours}
        onTime={onTime}
        setOnTime={setOnTime}
        customerRequire={customerRequire}
        setCustomerRequire={setCustomerRequire}
        requestTypeIds={requestTypeIds}
        setRequestTypeIds={setRequestTypeIds}
        searchLicensePlate={searchLicensePlate}
        setEvaluation={setEvaluation}
        evaluation={evaluation}
        setBookingMinutes={setBookingMinutes}
      />
      <Footer onPress={handleButton} disabled={false} />
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
        visible={showAdviser}
        data={listAdvisers}
        title={'Cố vấn dịch vụ'}
        onDismiss={setShowAdviser}
        placeholder={'Cố vấn dịch vụ'}
        setValue={onChangeAdviser}
      />
    </SafeAreaView>
  );
};
export default CreateRepairSchedule;

function getTimeFromDateTime(date) {
  const dateSplit = date.split(' ');
  const time = dateSplit[1].slice(0, 5);
  return time;
}
