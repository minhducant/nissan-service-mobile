import React, { useEffect, useState, useContext, useRef, Suspense } from 'react';
import { Spinner } from 'native-base';
import {
  View,
  Text,
  SafeAreaView,
  Animated,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { showMessage } from '@common/index';
import { setLoading } from '@stores/config/actions';
import { GET, PUT } from '@repository/repair/index';
import { Header } from '@components/headers/index';
import { LocalizationContext } from '@context/index';
import Footer from '@components/repair_order/Footer';
import ButtonTabs from '@components/quotation/ButtonTabs';
import CustomerTab from '@components/repair_order/CustomerTab';
import ManagerNote from '@components/repair_order/ManagerNote';
import PickerTechnical from '@components/repair_order/PickerTechnical';
import ServiceInformation from '@components/repair_order/ServiceInformation';
import { repairStyles as styles, css, SCREEN_WIDTH, Colors } from '@styles/index';

const DetailRepairOrder = ({ navigation, route }) => {
  const { item } = route.params;
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const { t } = useContext(LocalizationContext);
  const { isLoading } = useSelector((st) => st.conf);
  const { accessToken } = useSelector((st) => st.auth);
  const companyId = useSelector((st) => st.auth.user.company_id.id);
  const x = useRef(new Animated.Value(0)).current;
  const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
  const [detail, setDetail] = useState([]);
  const [showNote, setShowNote] = useState(false);
  const [employeeIds, setEmployeeIds] = useState([]);
  const [listEmployee, setListEmployee] = useState([]);
  const [showEmployee, setShowEmployee] = useState(false);

  useEffect(() => {
    _getDetailRepairOrder();
    _getTechnical();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _getTechnical = async () => {
    GET.getTechnical({
      company_id: companyId,
      accessToken: accessToken,
    })
      .then((res) => {
        setListEmployee(res.data);
      })
      .catch((err) => {
        showMessage(err);
        console.log(err);
      });
  };

  const _getDetailRepairOrder = async () => {
    dispatch(setLoading(true));
    GET.getDetailRepairOrder({
      repair_order_id: item?.id || item?.fleet_repair_order_id,
      accessToken: accessToken,
    })
      .then((res) => {
        setDetail(res.data);
        dispatch(setLoading(false));
      })
      .catch((err) => {
        showMessage(err);
        console.log(err);
        dispatch(setLoading(false));
      });
  };

  const onGoBack = () => {
    if (route?.params?.goBack === true) {
      navigation.goBack();
    } else {
      navigation.navigate('RepairOrderScreen');
    }
  };

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x } } }], {
    useNativeDriver: false,
  });

  const onActionChangeTab = (activeTab) => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTo({
        x: activeTab * SCREEN_WIDTH,
        y: 0,
        animate: true,
      });
    }
  };

  // eslint-disable-next-line no-shadow
  const onSelectEmployee = (item) => {
    const newList = [...employeeIds];
    const indexEmployee = newList.findIndex((it) => it.id === item.id);
    // Nếu đã tồn tại thì xoá, còn lại thêm mới
    if (indexEmployee >= 0) {
      newList.splice(indexEmployee, 1);
    } else {
      newList.push(item);
    }
    setEmployeeIds(newList);
  };

  const onDismiss = () => {
    setShowEmployee(false);
    setEmployeeIds([]);
  };

  const onDismissNote = () => {
    setShowNote(false);
    PUT.acceptanceWork({
      accessToken: accessToken,
      fleet_repair_order_id: detail.id,
    })
      .then((res) => {
        dispatch(setLoading(false));
        showMessage('Cập nhật trạng thái thành công!');
        _getDetailRepairOrder();
      })
      .catch((err) => {
        dispatch(setLoading(false));
        showMessage(err);
        console.log(err);
      });
  };

  const onChooseEmployee = () => {
    const params = {
      accessToken: accessToken,
      fleet_repair_order_id: detail.id,
      active_id: detail.id,
      active_model: 'fleet.repair.order',
      employee_ids: employeeIds.map(function (em) {
        return em.id;
      }),
      company_id: companyId,
    };
    setShowEmployee(false);
    PUT.assignWork(params)
      .then((res) => {
        dispatch(setLoading(false));
        showMessage('Cập nhật trạng thái thành công!');
        _getDetailRepairOrder();
      })
      .catch((err) => {
        dispatch(setLoading(false));
        showMessage(err);
        console.log(err);
      });
  };

  const handleButton = (key) => {
    const params = {
      accessToken: accessToken,
      fleet_repair_order_id: detail.id,
      action: key,
    };
    if (key === 'action_assign_employee_all_task') {
      setShowEmployee(true);
    } else if (key === 'button_acceptance_work') {
      if (
        detail?.service_info_material?.service_info_material.filter(function (
          material,
        ) {
          return material.qty > material.qty_received;
        }).length > 0
      ) {
        showMessage('Vật tư chưa được nghiệm thu hết. Vui lòng kiểm tra lại!');
      } else if (
        Object.fromEntries(
          detail?.service_info_labor || [],
        )?.service_info_lb?.filter(function (it) {
          return it.x_state !== 'done';
        })?.length !== 0
      ) {
        Alert.alert(
          'Xác nhận nghiệm thu công việc ?',
          'Bạn chưa nghiệm thu hết công việc. Bạn có muốn nghiệm thu tất cả không ?',
          [
            {
              text: 'Đồng ý',
              onPress: () => {
                setShowNote(true);
              },
            },
            {
              text: 'Hủy',
              onPress: () => {
                return null;
              },
            },
          ],
          { cancelable: false },
        );
      } else {
        setShowNote(true);
      }
    } else {
      PUT.repairAction(params)
        .then((res) => {
          dispatch(setLoading(false));
          showMessage('Cập nhật trạng thái thành công!');
          _getDetailRepairOrder();
        })
        .catch((err) => {
          dispatch(setLoading(false));
          showMessage(err);
          console.log(err);
        });
    }
  };

  const onAcceptNote = (note) => {
    const params = {
      accessToken: accessToken,
      fleet_repair_order_id: detail.id,
      x_note_fro: note,
    };
    setShowNote(false);
    PUT.acceptanceWorkAction(params)
      .then((res) => {
        dispatch(setLoading(false));
        showMessage('Cập nhật trạng thái thành công!');
        _getDetailRepairOrder();
      })
      .catch((err) => {
        dispatch(setLoading(false));
        showMessage(err);
        console.log(err);
      });
  };
  console.log(item?.name);
  console.log(item?.repair_order_name);
  console.log(detail?.repair_request_id);

  return (
    <SafeAreaView style={styles.containerCreate}>
      <Header
        title={
          item?.name || item?.repair_order_name || detail.repair_request_id
        }
        hasAction={false}
        cancelCreate={true}
        onGoBack={onGoBack}
      />
      {isLoading ? (
        <></>
      ) : (
        <>
          <View style={styles.titleCheckOrder}>
            <View style={css.fdR}>
              <ButtonTabs onPress={onActionChangeTab} x={x} />
                <View style={{ width: SCREEN_WIDTH / 7 }} />
              <View style={styles.numCheckOrder}>
                <View style={styles.numCheckOrderCon}>
                  <Text style={styles.txtCheckOrder}>Mã lệnh sửa chữa</Text>
                </View>
                <View style={styles.titleNumCheckOder}>
                    <Text style={styles.txtReceptionName}>{item?.name || item?.repair_order_name || detail.repair_request_id}</Text>
                </View>
                <View style={styles.numCheckOrderCon}>
                  <Text style={styles.txtCheckOrder}>
                    {t(detail?.state || '')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <AnimatedScrollView
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            horizontal
            pagingEnabled
            onScroll={onScroll}>
            <Suspense
              fallback={
                  <Spinner color={Colors.main} style={{ width: SCREEN_WIDTH }} />
              }>
              <CustomerTab item={detail} disabled={true} />
              <ServiceInformation item={detail} disabled={true} />
            </Suspense>
          </AnimatedScrollView>
          {(detail?.is_adviser === true ||
            detail?.role_repair_manage_workshop === true) && (
                <Footer
                  onPress={handleButton}
                  state={detail?.state}
                  x_is_received={detail?.x_is_received}
                  service_info_lb={
                    Object.fromEntries(detail?.service_info_labor || [])
                      ?.service_info_lb
                  }
                />
              )}
        </>
      )}
      <PickerTechnical
        visible={showEmployee}
        listEmployee={listEmployee}
        title={'Phân công kỹ thuật viên'}
        onDismiss={onDismiss}
        placeholder={'Chọn kỹ thuật viên'}
        onChooseEmployee={onChooseEmployee}
        listSelected={employeeIds}
        addEmployee={onSelectEmployee}
      />
      <ManagerNote
        title={'Ghi chú quản đốc'}
        visible={showNote}
        onDismiss={onDismissNote}
        onAccept={onAcceptNote}
      />
    </SafeAreaView>
  );
};

export default DetailRepairOrder;
