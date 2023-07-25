import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {showMessage} from '@common/index';
import {css, SCREEN_WIDTH} from '@styles/index';
import Footer from '@components/schedule/Footer';
import {Header} from '@components/headers/index';
import {setLoading} from '@stores/config/actions';
import {GET, POST} from '@repository/quotation/index';
import {quickQuoteStyles as styles} from '@styles/index';
import CustomerTab from '@pages/quick_quotation/CustomerTab';
import PickerTechnical from '@components/repair_order/PickerTechnical';
import {setServiceLabor, setServiceMaterial} from '@stores/appointment/actions';

const CreateQuickQuote = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {accessToken} = useSelector((st) => st.auth);
  const {
    customerSignature,
    advisorSignature,
    serviceLabor,
    serviceMaterial,
  } = useSelector((st) => st.appointment);
  const [listServices, setListServices] = useState([]);
  const [showService, setShowService] = useState(false);
  const [carServices, setCarServices] = useState([]);
  const [dateHandPlan, setDateHandPlan] = useState(null);

  useEffect(() => {
    _getCarServices();
    dispatch(setServiceLabor([]));
    dispatch(setServiceMaterial([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _getCarServices = async () => {
    dispatch(setLoading(true));
    GET.getCarService({
      accessToken: accessToken,
      company_id: route.params.company_id,
      license_plate: route.params.vehicle.licensePlate,
    })
      .then((res) => {
        setListServices(res.data);
        dispatch(setLoading(false));
      })
      .catch((err) => {
        // console.log(err);
        showMessage(err);
        dispatch(setLoading(false));
      });
  };

  const handleButton = (key) => {
    dispatch(setLoading(true));
    const params = {
      accessToken: accessToken,
      reception_id: route.params.receptionId,
      date_hand_plan: dateHandPlan,
      car_service_ids: carServices.map((item) => item.id),
      signature_quotation_client: customerSignature,
      signature_quotation_adviser: advisorSignature,
      adviser_id: route.params.adviser.id,
      license_plate: route.params.vehicle.licensePlate,
      request_type_ids: route.params.checkType,
      origin: route.params.receptionName,
      car_service_lines: serviceLabor
        .map(function (x) {
          return {
            id: x.id,
            record: {
              product_id: x.record.product_id,
              name: x.record.product_name,
              task_type_id: x.record.task_type_id,
              price_unit: x.record.price_unit,
              product_uom_qty: parseFloat(x.record.product_uom_qty),
              product_uom: x.record.product_uom,
              x_total_undiscount: x.record.x_total_undiscount,
              discount: x.record.discount,
              price_subtotal: x.record.price_subtotal,
              tax_id: x.record.tax_id,
              price_tax: x.record.price_tax,
              price_total: x.record.price_total,
              x_service_type: 'labor',
            },
          };
        })
        .concat(
          serviceMaterial.map(function (x) {
            return {
              id: x.id,
              record: {
                product_id: x.record.product_id,
                name: x.record.product_name,
                task_type_id: x.record.task_type_id,
                price_unit: x.record.price_unit,
                product_uom_qty: parseFloat(x.record.product_uom_qty),
                product_uom: x.record.product_uom,
                x_total_undiscount: x.record.x_total_undiscount,
                discount: x.record.discount,
                price_subtotal: x.record.price_subtotal,
                tax_id: x.record.tax_id,
                price_tax: x.record.price_tax,
                price_total: x.record.price_total,
                x_service_type: 'material',
              },
            };
          }),
        ),
    };

    if (key === 'cancel') {
      dispatch(setLoading(false));
      navigation.goBack();
      dispatch(setServiceLabor([]));
      dispatch(setServiceMaterial([]));
    }
    if (key === 'save') {
      if (dateHandPlan === null) {
        showMessage('Trường ngày dự kiến giao xe là bắt buộc!');
        dispatch(setLoading(false));
      } else if (customerSignature === '' && advisorSignature !== '') {
        showMessage('Thiếu chữ ký khách hàng!');
        dispatch(setLoading(false));
      } else if (customerSignature !== '' && advisorSignature === '') {
        showMessage('Thiếu chữ ký cố vấn dịch vụ!');
        dispatch(setLoading(false));
      } else {
        POST.crateQuotation(params)
          .then((res) => {
            showMessage(res.message);
            navigation.navigate('Report', {
              item: res.data.quotation,
            });
            dispatch(setLoading(false));
          })
          .catch((err) => {
            // console.log(err);
            showMessage(err);
            dispatch(setLoading(false));
          });
      }
    }
  };

  const onChooseServices = () => {
    setShowService(false);
  };

  const onSelectServices = (item) => {
    const newList = [...carServices];
    const indexService = newList.findIndex((it) => it.id === item.id);
    // Nếu đã tồn tại thì xoá, còn lại thêm mới
    if (indexService >= 0) {
      newList.splice(indexService, 1);
    } else {
      newList.push(item);
    }
    setCarServices(newList);
  };

  const onDismiss = () => {
    setShowService(false);
  };

  const onPressUse = () => {
    dispatch(setLoading(true));
    const params = {
      accessToken: accessToken,
      car_service_ids: carServices.map((car_services) => car_services.id),
    };
    POST.getServiceInformation(params)
      .then((res) => {
        dispatch(
          setServiceLabor(
            serviceLabor.concat(
              Object.fromEntries(res.data.data.service_information)
                .service_info_labor,
            ),
          ),
        );
        dispatch(
          setServiceMaterial(
            serviceMaterial.concat(
              Object.fromEntries(res.data.data.service_information)
                .service_info_material,
            ),
          ),
        );
        setCarServices([]);
        dispatch(setLoading(false));
      })
      .catch((err) => {
        // console.log(err);
        showMessage(err);
        dispatch(setLoading(false));
      });
  };

  return (
    <SafeAreaView style={styles.containerCreate}>
      <Header title={'Tạo báo giá nhanh'} hasAction={false} />
      <View style={styles.titleCheckOrder}>
        <View style={css.fdR}>
          <View style={{width: SCREEN_WIDTH / 1.75}} />
          <View style={styles.numCheckOrder}>
            <View style={styles.numCheckOrderCon}>
              <Text style={styles.txtCheckOrder}>Số báo giá</Text>
            </View>
            <View style={styles.titleNumCheckOder}>
              <Text style={styles.txtReceptionName}>Mới</Text>
            </View>
          </View>
        </View>
      </View>
      <CustomerTab
        item={route}
        disabled={false}
        onPressUse={onPressUse}
        showService={setShowService}
        carServices={carServices}
        setCarServices={setCarServices}
        setDateHandPlan={setDateHandPlan}
        dateHandPlan={dateHandPlan}
      />
      <Footer onPress={handleButton} />
      <PickerTechnical
        visible={showService}
        listEmployee={listServices}
        title={'Gói dịch vụ'}
        onDismiss={onDismiss}
        placeholder={'Chọn gói dịch vụ'}
        onChooseEmployee={onChooseServices}
        listSelected={carServices}
        addEmployee={onSelectServices}
      />
    </SafeAreaView>
  );
};
export default CreateQuickQuote;
