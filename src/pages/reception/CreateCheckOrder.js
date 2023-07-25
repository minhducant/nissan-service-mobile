import React, {
  useContext,
  useRef,
  Suspense,
  lazy,
  useState,
  useEffect,
} from 'react';
import {Spinner} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, Animated, View, ScrollView, Text} from 'react-native';

import {
  setVehicle,
  setEmptyData,
  setCustomer,
  setState,
  setListUrlImage,
  setListImage,
} from '@stores/appointment/actions';
import {showMessage} from '@common/index';
import {Header} from '@components/headers/index';
import {SCREEN_WIDTH, css} from '@styles/index';
import {LocalizationContext} from '@context/index';
import {setLoading} from '@stores/config/actions';
import {POST, GET, PUT} from '@repository/reception/index';
import {GET as appGet} from '@repository/appointment/index';
import {ButtonTabs, Footer} from '@components/reception/index';
import {receptionStyles as styles, Colors} from '@styles/index';
import {PUT as handedPut} from '@repository/vehicle_handing/index';
import {SearchModal, WarningCheckOrder} from '@components/modals/index';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const CustomerTab = lazy(() => import('@components/reception/CustomerTab'));
const CheckOrderTab = lazy(() => import('@components/reception/CheckOrderTab'));

export default function CreateCheckOrder({route}) {
  const NEW = 'new';
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useContext(LocalizationContext);
  const {accessToken} = useSelector((st) => st.auth);
  const {
    numColumns,
    bookingId,
    receptionId,
    button,
    receptionName,
    adviser,
    company_id,
  } = route.params;
  const {
    dateOrder,
    vehicle,
    customer,
    listCheckedReceive,
    listCheckedHanding,
    checkType,
    customerRequest,
    warrantyDate,
    state,
    listImageVehicle,
  } = useSelector((st) => st.appointment);
  const {
    listBrand,
    listModel,
    listVNProvince,
    listDistrict,
    listWard,
  } = useSelector((st) => st.conf);
  const scrollRef = useRef(null);
  const [isCapture, setIsCapture] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showAdviser, setShowAdviser] = useState(false);
  const [showProvince, setShowProvince] = useState(false);
  const [showDistrict, setShowDistrict] = useState(false);
  const [showWard, setShowWard] = useState(false);
  const [listVehicleModel, setListVehicleModel] = useState([]);
  const [listDistrictSelected, setListDistrictSelected] = useState([]);
  const [listWardSelected, setListWardSelected] = useState([]);
  const [buttonAction, setButtonAction] = useState(button);
  const [repairRequestId, setRepairRequestId] = useState(receptionId);
  const x = useRef(new Animated.Value(0)).current;
  const [disabled, setDisabled] = useState(false);
  const [warningData, setWarningData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [repName, setRepName] = useState(receptionName);
  const [listAdvisers, setListAdvisers] = useState([]);
  const [adviserId, setAdviserId] = useState(adviser || {id: 0, name: ''});
  const [companyId, setCompanyId] = useState(company_id);

  useEffect(() => {
    if (state.key !== NEW) {
      dispatch(setLoading(false));
      setDisabled(true);
    } else {
      if (vehicle.licensePlate) {
        searchLicensePlate(vehicle.licensePlate);
      }
    }
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

  const onScroll = Animated.event([{nativeEvent: {contentOffset: {x}}}], {
    useNativeDriver: false,
  });

  const searchLicensePlate = async (scannerLicencePlate) => {
    await appGet
      .searchCustomerByLicensePlate(scannerLicencePlate)
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
          imageModel: selectImageModel(veh.model.id),
        };
        dispatch(setCustomer(cusValues));
        dispatch(setVehicle(vehValues));
        const newListModel = listModel.filter(
          (itemModel) => itemModel.brand.id === veh.brand.id,
        );
        setListVehicleModel(newListModel);
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };

  const onActionChangeTab = (activeTab) => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTo({
        x: activeTab * SCREEN_WIDTH,
        y: 0,
        animate: true,
      });
    }
  };

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
    const newVehicle = {
      ...vehicle,
      modelName: item.name,
      modelId: item.id,
      imageModel: selectImageModel(item.id),
    };
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
    const checkTypeBool = createError(
      !checkType.length,
      'Thiếu loại yêu cầu sửa chữa',
      [],
    );
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
    const customerRequestBool = createError(
      !customerRequest,
      'Thiếu yêu cầu của khách hàng',
      [],
    );
    // const checkLastOdoMeter = createError(
    //   vehicle.odoMeter <= vehicle.lastOdoMeter,
    //   'Số km hiện tại phải lớn hớn số km cuối!',
    //   [],
    // );
    const finalChecked = [
      checkTypeBool,
      nameBool,
      phoneBool,
      licensePlateBool,
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
      customerRequestBool,
      // checkLastOdoMeter,
    ].some((e) => e === true);
    if (finalChecked) {
      setIsShow(true);
      return true;
    } else {
      return false;
    }
  };

  const handleButton = (key) => {
    dispatch(setLoading(true));
    const params = {
      bookingId: bookingId,
      customerRequest: customerRequest,
      odoMeter: vehicle.odoMeter,
      checkList: listCheckedReceive,
      licensePlate: vehicle.licensePlate,
      dateOrder: dateOrder,
      modelId: vehicle.modelId,
      brandId: vehicle.brandId,
      customerId: customer.id,
      customerName: customer.name,
      phone: customer.phone,
      imageCar: vehicle.imageCar,
      requestTypeIds: checkType,
      vin: vehicle.vin,
      color: vehicle.color,
      warrantyDate: warrantyDate,
      provinceId: customer.provinceId,
      districtId: customer.districtId,
      wardsId: customer.wardId,
      street: customer.street,
      contactName: customer.contactName,
      contactPhone: customer.contactPhone,
      signatureReceived: customer.imageSignature,
    };
    if (key === 'save') {
      const checked = checkRequire();
      if (!checked) {
        POST.createReception(params)
          .then((res) => {
            setRepairRequestId(res.data.data.id);
            const newState = {
              key: 'draft',
              name: 'Nháp',
            };
            dispatch(setState(newState));
            showMessage(`Tạo đơn tiếp nhận thành công: ${res.data.data.name}`);
            setRepName(res.data.data.name);
            setDisabled(true);
            getDetail(res.data.data.id);
            if (listImageVehicle.length > 0) {
              POST.createImageVehicle({
                repairRequestId: res.data.data.id,
                imageList: listImageVehicle,
              })
                .then((response) => {
                  dispatch(setListImage([]));
                  const newListUrl = [];
                  response.data.data.url.forEach((item) => {
                    const urlImage = {url: item};
                    newListUrl.push(urlImage);
                  });
                  dispatch(setListUrlImage(newListUrl));
                })
                .catch((err) => {
                  if (__DEV__) {
                    console.log(err);
                  }
                  showMessage(err);
                });
            }
          })
          .catch((err) => {
            dispatch(setLoading(false));
            showMessage(err);
          });
      } else {
        dispatch(setLoading(false));
      }
    }
    if (key === 'signature') {
      dispatch(setLoading(false));
      navigation.navigate('SignatureScreen', {
        receptionId: repairRequestId || '',
      });
    }
    if (key === 'edit') {
      dispatch(setLoading(false));
      setDisabled(false);
    }
    if (key === 'update') {
      const checked = checkRequire();
      if (!checked) {
        if (repairRequestId) {
          params.repairRequestId = repairRequestId;
          POST.createReception(params)
            .then((res) => {
              if (__DEV__) {
                console.log(res);
              }
              setRepairRequestId(res.data.data.id);
              getDetail(res.data.data.id);
              showMessage(`Cập nhật thành công!: ${res.data.data.name}`);
              setDisabled(true);
            })
            .catch((err) => {
              showMessage(err);
              dispatch(setLoading(false));
            });
        }
      } else {
        dispatch(setLoading(false));
      }
    }
    if (key === 'receive_car') {
      if (!customer.urlImageSignatureReceive) {
        dispatch(setLoading(false));
        showMessage('Thiếu chữ kí khách hàng!');
      } else if (!vehicle.urlImageCar) {
        dispatch(setLoading(false));
        showMessage('Thiếu hình ảnh thân xe!');
      } else {
        PUT.updateAction({
          receptionId: repairRequestId,
          action: buttonAction.button_receive,
        })
          .then(() => {
            dispatch(setLoading(false));
            getDetail(repairRequestId);
            showMessage('Nhận xe thành công!');
            const newState = {
              key: 'received',
              name: 'Đã tiếp nhận',
            };
            dispatch(setState(newState));
          })
          .catch((err) => {
            dispatch(setLoading(false));
            showMessage(err);
            console.log(err);
          });
      }
    }
    if (key === 'update_checklist') {
      handedPut
        .updateCheckList({
          receptionId: repairRequestId,
          checkList: listCheckedHanding,
        })
        .then((res) => {
          dispatch(setLoading(false));
          showMessage('Cập nhật thành công!');
        })
        .catch((err) => {
          dispatch(setLoading(false));
          showMessage(err);
        });
    }
    if (key === 'vehicle_handing') {
      if (!customer.urlImageSignatureHanding) {
        dispatch(setLoading(false));
        showMessage('Thiếu chữ kí khách hàng!');
      } else {
        PUT.updateAction({
          receptionId: repairRequestId,
          action: buttonAction?.button_handed,
        })
          .then((rsp) => {
            dispatch(setLoading(false));
            getDetail(repairRequestId);
            showMessage('Giao xe thành công!');
            const newState = {
              key: 'handed',
              name: 'Giao xe',
            };
            dispatch(setState(newState));
          })
          .catch((err) => {
            dispatch(setLoading(false));
            showMessage(err);
          });
      }
    }
    if (key === 'assign_accepted') {
      dispatch(setLoading(false));
      setDisabled(false);
      navigation.navigate('CreateQuickQuote', {
        receptionId: repairRequestId,
        receptionName: repName,
        customer: customer,
        dateOrder: dateOrder,
        vehicle: vehicle,
        bookingId: bookingId,
        adviser: adviserId,
        checkType: checkType,
        company_id: companyId,
      });
    }
    if (key === 'action_assign_advisor') {
      if (adviserId.id === 0) {
        setShowAdviser(true);
        dispatch(setLoading(false));
        console.log(adviserId);
      } else {
        PUT.actionAssignAdvisor({
          receptionId: repairRequestId,
          action: 'assign',
          adviserId: adviserId.id || adviser.id,
        })
          .then((rsp) => {
            dispatch(setLoading(false));
            getDetail(repairRequestId);
            showMessage('Giao xe cho CVDV thành công!');
            const newState = {
              key: 'assigned',
              name: 'Đã điều phối',
            };
            dispatch(setState(newState));
          })
          .catch((err) => {
            dispatch(setLoading(false));
            showMessage(err);
          });
      }
    }
    if (key === 'action_accept_assign') {
      PUT.actionAssignAdvisor({
        receptionId: repairRequestId,
        action: 'accept',
        adviserId: adviserId.id || adviser.id,
      })
        .then((rsp) => {
          dispatch(setLoading(false));
          getDetail(repairRequestId);
          showMessage('cập nhật trạng thái thành công!');
          const newState = {
            key: 'assign_accepted',
            name: 'Đã nhận điều phối',
          };
          dispatch(setState(newState));
        })
        .catch((err) => {
          dispatch(setLoading(false));
          showMessage(err);
        });
    }
  };

  const onChangeAdviser = (item) => {
    dispatch(setLoading(true));
    setAdviserId(item);
    setShowAdviser(false);
    PUT.actionAssignAdvisor({
      receptionId: repairRequestId,
      action: 'assign',
      adviserId: item.id,
    })
      .then((rsp) => {
        dispatch(setLoading(false));
        getDetail(repairRequestId);
        showMessage('Giao xe cho CVDV thành công!');
        const newState = {
          key: 'assigned',
          name: 'Đã điều phối',
        };
        dispatch(setState(newState));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        showMessage(err);
      });
  };

  const getDetail = (id) => {
    GET.getDetail({receptionId: id})
      .then((res) => {
        const cusValues = {
          ...customer,
          urlImageSignatureReceive: res?.data?.signature_received,
          urlImageSignatureHanding: res?.data?.signature_handed,
        };
        dispatch(setCustomer(cusValues));
        const vehValues = {...vehicle, urlImageCar: res?.data?.image_car};
        dispatch(setVehicle(vehValues));
        dispatch(setListImage([]));
        setButtonAction(res?.data?.button);
        dispatch(setLoading(false));
        setAdviserId(res.data.adviser);
        setCompanyId(res.data.company_id);
      })
      .catch((err) => {
        showMessage(err);
        if (__DEV__) {
          console.log(err);
        }
        dispatch(setLoading(false));
      });
  };

  const goToCreateCustomer = () => {
    navigation.navigate('CreateCustomerScreen');
  };

  const selectImageModel = (idModel) => {
    const itemModel = listModel.find((it) => it.id === idModel);
    if (itemModel?.image_car) {
      return itemModel?.image_car;
    } else {
      return '';
    }
  };

  return (
    <SafeAreaView style={styles.checkOrderContainer}>
      {!isCapture && (
        <>
          <Header
            title={repName || 'Tạo phiếu kiểm tra'}
            hasAction={state.key === 'new'}
            onAction={goToCreateCustomer}
          />
          <View style={styles.titleCheckOrder}>
            <View style={css.fdR}>
              <ButtonTabs onPress={onActionChangeTab} x={x} />
              <View style={{width: SCREEN_WIDTH / 7}} />
              <View style={styles.numCheckOrder}>
                <View style={styles.numCheckOrderCon}>
                  <Text style={styles.txtCheckOrder}>Số phiếu báo giá</Text>
                </View>
                <View style={styles.titleNumCheckOder}>
                  <Text style={styles.txtReceptionName}>
                    {repName || 'Mới'}
                  </Text>
                </View>
                <View style={styles.numCheckOrderCon}>
                  <Text style={styles.txtCheckOrder}>{dateOrder}</Text>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
      <AnimatedScrollView
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        horizontal
        pagingEnabled
        onScroll={onScroll}>
        <Suspense
          fallback={
            <Spinner color={Colors.main} style={{width: SCREEN_WIDTH}} />
          }>
          <CustomerTab
            showBrand={setShowBrand}
            showModel={setShowModel}
            showProvince={setShowProvince}
            showDistrict={setShowDistrict}
            showWard={setShowWard}
            disabled={disabled}
            setListVehicleModel={setListVehicleModel}
          />
          <CheckOrderTab
            disabled={disabled}
            setIsCapture={setIsCapture}
            numColumns={numColumns}
            receptionId={repairRequestId}
          />
        </Suspense>
      </AnimatedScrollView>
      {!isCapture && <Footer onPress={handleButton} disabled={disabled} />}
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
      <SearchModal
        visible={showAdviser}
        data={listAdvisers}
        title={'Cố vấn dịch vụ'}
        onDismiss={setShowAdviser}
        placeholder={'Cố vấn dịch vụ'}
        setValue={onChangeAdviser}
      />
      <WarningCheckOrder
        {...{isShow, setIsShow}}
        warningData={warningData}
        setWarningData={setWarningData}
      />
    </SafeAreaView>
  );
}
