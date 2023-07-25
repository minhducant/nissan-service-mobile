import React, {useCallback, useContext, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {FAB} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
// import moment from 'moment';

import {LocalizationContext} from '@context/index';
import {SearchBar, EmptyData, StateBar} from '@components/forms/index';
import {IcAppointment} from '@common/svg/index';
import {Colors, appointmentStyles as styles} from '@styles/index';
import {GET} from '@repository/appointment/index';
import {setLoading} from '@stores/config/actions';
import {formatList, gradientColor, showMessage} from '@common/index';
import Configs from '@configs/Configs';
// import {VN_FORMAT_DATE} from '@configs/Configs';
import {
  setInitCheckedReceive,
  setInitCheckedHanding,
  setState,
  setCustomer,
  setVehicle,
  setCheckType,
  setCheckList,
  setCustomerRequest,
  setAppointmentState,
} from '@stores/appointment/actions';
import createStore from '@stores/index';

export default function AppointmentScreen() {
  const {t} = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {checkList, appointmentFilter, listModel, today} = useSelector(
    (st) => st.conf,
  );
  const {appointmentState} = useSelector((st) => st.appointment);
  const [listAppointment, setListAppointment] = useState([]);
  const [appState, setAppState] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [stSearch, setStSearch] = useState('');
  const roles = useSelector((st) => st.auth.user.roles);

  useFocusEffect(
    useCallback(() => {
      const filter = createStore.store.getState().appointment.appointmentState;
      handleSearch(
        filter.fromDate,
        filter.toDate,
        filter.state,
        filter.customerName,
        filter.licensePlate,
        false,
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  const handleSearch = (
    dateFrom,
    dateTo,
    state,
    customerName,
    licensePlate,
    saveState = true,
    page = 1,
    addMore = false,
  ) => {
    if (saveState) {
      const filter = {
        fromDate: dateFrom,
        toDate: dateTo,
        licensePlate: licensePlate,
        state: state,
        customerName: customerName,
      };
      dispatch(setAppointmentState(filter));
    }
    dispatch(setLoading(true));
    GET.getListAppointment({
      dateFrom,
      dateTo,
      licensePlate,
      customerName,
      state,
      page,
    })
      .then((res) => {
        if (res.data.meta.current_page === res.data.meta.next_page) {
          setIsLoadMore(false);
        } else {
          setIsLoadMore(true);
        }
        setCurrentPage(res.data.meta.current_page);
        if (addMore) {
          setListAppointment(
            formatList({
              listData: listAppointment.concat(res.data.data),
              colorState: Configs.AppointmentScheduleState,
            }),
          );
        } else {
          setListAppointment(
            formatList({
              listData: res.data.data,
              colorState: Configs.AppointmentScheduleState,
            }),
          );
        }

        dispatch(setLoading(false));
        setAppState(res.data.state_total);
        setRefreshing(false);
      })
      .catch((err) => {
        showMessage(err);
        dispatch(setLoading(false));
        setAppState([]);
        setRefreshing(false);
      });
  };
  const goToDetail = (item) => {
    navigation.navigate('Information', {
      item: item,
    });
  };
  const selectImageModel = (idModel) => {
    const itemModel = listModel.find((it) => it.id === idModel);
    if (itemModel?.image_car) {
      return itemModel?.image_car;
    } else {
      return '';
    }
  };
  const goToCreateCheckOrder = (item) => {
    dispatch(setLoading(true));
    const cus = {
      id: null,
      name: item.customer.name,
      phone: item.customer.phone,
      districtId: null,
      districtName: '',
      provinceId: null,
      provinceName: '',
      street: item.customer.street,
      imageSignature: '',
      contactName: item.contact_person.name,
      contactPhone: item.contact_person.phone,
      wardName: '',
      wardId: null,
      urlImageSignatureReceive: '',
      urlImageSignatureHanded: '',
    };
    const veh = {
      licensePlate: item.vehicle.license_plate,
      vin: item.vehicle.vin,
      modelId: item.vehicle.model.id,
      modelName: item.vehicle.model.name,
      color: item.vehicle.color,
      odoMeter: item.vehicle.odometer,
      brandId: item.vehicle.brand.id,
      brandName: item.vehicle.brand.name,
      imageCar: '',
      urlImageCar: '',
      engineNo: '',
      lastOdoMeter: item.vehicle.odometer,
      imageModel: selectImageModel(item.vehicle.model.id),
    };
    dispatch(setCustomerRequest(item.customer_require));
    dispatch(setCustomer(cus));
    dispatch(setVehicle(veh));
    dispatch(setInitCheckedReceive(checkList));
    dispatch(setInitCheckedHanding(checkList));
    dispatch(setCheckList(checkList));
    dispatch(setCheckType(item.request_type_ids));
    // dispatch(setEmptyData());
    const state = {
      key: 'new',
      name: 'Mới',
    };
    dispatch(setState(state));
    navigation.navigate('CreateCheckOrder', {
      numColumns: 1,
      bookingId: item.id,
      receptionId: '',
      button: {},
    });
  };
  const onRefresh = () => {
    setRefreshing(true);
    handleSearch(today, today);
  };
  const onLoadMore = () => {
    if (isLoadMore && isScroll) {
      handleSearch(
        appointmentState.fromDate,
        appointmentState.toDate,
        appointmentState.state,
        appointmentState.customerName,
        appointmentState.licensePlate,
        false,
        currentPage + 1,
        true,
      );
    }
  };
  const filterState = (item) => {
    setStSearch(item.key);
    handleSearch(
      appointmentState.fromDate,
      appointmentState.toDate,
      item.key,
      appointmentState.customerName,
      appointmentState.licensePlate,
      true,
    );
  };
  const _onPressFAB = () => {
    navigation.navigate('CreateRepairSchedule', {});
  };
  const renderFooter = () => {
    return (
      <>
        {isLoadMore && (
          <ActivityIndicator
            color={Colors.main}
            style={styles.icon}
            size="large"
          />
        )}
      </>
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <View
          style={[
            styles.itemContent,
            {
              backgroundColor: gradientColor(item.state.color),
              borderColor: item.state.color,
            },
          ]}>
          <View style={styles.dateView}>
            <Text style={styles.txtDate}>{item.datetime}</Text>
            <View
              style={[
                styles.state,
                {
                  backgroundColor: item.state.color,
                },
              ]}
            />
          </View>
          <Text style={styles.txtState}>{item.state.name}</Text>
          <View style={styles.customer}>
            <Text style={styles.txtName} numberOfLines={1}>
              {item.customer.name}
            </Text>
            <Text style={styles.txtModel}>{item.vehicle.brand.name}</Text>
          </View>
          <Text style={styles.txtL}>{item.vehicle.license_plate}</Text>
          <Text style={styles.txtAdv}>{item.name}</Text>
          <Text style={styles.txtAdv}>{item.adviser.name}</Text>
          <View style={styles.btnContain}>
            <TouchableOpacity
              onPress={() => goToDetail(item)}
              style={styles.btnDetail}>
              <Text style={styles.txtDetail}>{t('detail')}</Text>
            </TouchableOpacity>
            {item.state.key === 'confirmed' && (
              <TouchableOpacity
                onPress={() => goToCreateCheckOrder(item)}
                style={styles.btnReception}>
                <Text style={styles.txtReception}>{t('reception')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <IcAppointment fill={Colors.main} />
        <Text style={styles.txtTitle}>{t('appointment_schedule')}</Text>
      </View>
      <SearchBar
        onSearch={handleSearch}
        menu={appointmentFilter}
        refresh={refreshing}
        stateFilter={stSearch}
        from={appointmentState.fromDate}
        to={appointmentState.toDate}
        lp={appointmentState.licensePlate}
        name={appointmentState.customerName}
      />
      <StateBar
        color={Configs.AppointmentScheduleState}
        data={appState}
        onPress={filterState}
      />
      <FlatList
        data={listAppointment}
        numColumns={3}
        renderItem={renderItem}
        keyExtractor={(_item, index) => index.toString()}
        ListEmptyComponent={<EmptyData />}
        ListFooterComponent={renderFooter}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
        style={styles.list}
        onMomentumScrollBegin={() => {
          setIsScroll(true);
        }}
        refreshControl={
          <RefreshControl
            colors={[Colors.main]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
      {(roles?.izi_security === 'group_service_adviser' ||
        roles?.izi_security === 'group_repair_manage_workshop' ||
        roles?.izi_security === 'group_customer_care' ||
        roles?.izi_security === 'group_leader_customer_before_care' ||
        roles?.sales_team === 'group_sale_manager' ||
        roles?.izi_update_state_repair === 'group_manager_agency_service') && (
        <FAB icon="plus" style={styles.fab} onPress={_onPressFAB} />
      )}
    </SafeAreaView>
  );
}
