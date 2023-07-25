import React, {useContext, useState, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import moment from 'moment';

import {SearchBar, StateBar, EmptyData} from '@components/forms/index';
import {LocalizationContext} from '@context/index';
import {vehicleHandingStyles as styles} from '@styles/index';
import {IcVehicleHanding} from '@common/svg/index';
import {Colors} from '@styles/index';
import Configs from '@configs/Configs';
import {GET} from '@repository/vehicle_handing/index';
import {GET as repGet} from '@repository/reception/index';

import {setLoading} from '@stores/config/actions';
import {formatList, gradientColor, showMessage} from '@common/index';
import {VN_FORMAT_DATE} from '@configs/Configs';
import {
  setInitCheckedReceive,
  setInitCheckedHanding,
  setState,
  setCustomer,
  setVehicle,
  setCheckType,
  setCheckList,
  setWarrantyDate,
  setDateOrder,
  setCustomerRequest,
  setListImage,
  setListUrlImage,
  setHandingState,
} from '@stores/appointment/actions';
import createStore from '@stores/index';

export default function VehicleHandingScreen() {
  const {t} = useContext(LocalizationContext);
  const {vehicleHandingFilter, today} = useSelector((st) => st.conf);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {handingState} = useSelector((st) => st.appointment);
  const [listVehicleHanding, setListVehicleHanding] = useState([]);
  const [vehicleHandingState, setVehicleHandingState] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [stSearch, setStSearch] = useState('');
  useFocusEffect(
    useCallback(() => {
      const filter = createStore.store.getState().appointment.handingState;
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
      dispatch(setHandingState(filter));
    }
    dispatch(setLoading(true));
    GET.getLisVehicleHanding({
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
        if (addMore) {
          setListVehicleHanding(
            formatList({
              listData: res.data.data.concat(listVehicleHanding),
              colorState: Configs.ReceptionState,
            }),
          );
        } else {
          setListVehicleHanding(
            formatList({
              listData: res.data.data,
              colorState: Configs.ReceptionState,
            }),
          );
        }
        setRefreshing(false);
        dispatch(setLoading(false));
        setVehicleHandingState(res.data.state_total);
        setCurrentPage(res.data.meta.current_page);
      })
      .catch((err) => {
        setRefreshing(false);
        showMessage(err);
        dispatch(setLoading(false));
        setVehicleHandingState([]);
      });
  };
  const goToDetail = (item) => {
    dispatch(setLoading(true));
    const newState = {
      key: item.state.key,
      name: item.state.name,
    };
    dispatch(setState(newState));
    repGet
      .getDetail({receptionId: item.id})
      .then((res) => {
        const cus = res.data.customer;
        const veh = res.data.vehicle;
        const customer = {
          id: cus.id,
          name: cus.name,
          phone: cus.phone,
          districtId: cus.district.id,
          districtName: cus.district.name,
          provinceId: cus.province.id,
          provinceName: cus.province.name,
          street: cus.street,
          request: cus.request,
          imageSignature: '',
          contactName: res.data.contact_person.name,
          contactPhone: res.data.contact_person.phone,
          wardName: cus.ward.name,
          wardId: cus.ward.id,
          urlImageSignatureReceive: res.data.signature_received,
          urlImageSignatureHanding: res.data.signature_handed,
        };
        const vehicle = {
          licensePlate: veh.license_plate,
          vin: veh.vin,
          modelId: veh.model.id,
          modelName: veh.model.name,
          color: veh.color,
          odoMeter: veh.odometer,
          brandId: veh.brand.id,
          brandName: veh.brand.name,
          imageCar: '',
          urlImageCar: res.data.image_car,
          engineNo: '',
          lastOdoMeter: res.data.last_odometer,
        };
        dispatch(setCustomerRequest(cus.request));
        dispatch(setCheckType(res.data.request_type_ids));
        dispatch(setCheckList(res.data.checklist));
        dispatch(setInitCheckedReceive(res.data.checklist));
        dispatch(setInitCheckedHanding(res.data.checklist));
        dispatch(setCustomer(customer));
        dispatch(setVehicle(vehicle));
        dispatch(setCheckType(res.data.request_type_ids));
        dispatch(setWarrantyDate(res.data.warranty_date));
        dispatch(setDateOrder(res.data.date_order));
        dispatch(setListUrlImage(res.data.actual_image));
        dispatch(setListImage([]));
        navigation.navigate('CreateCheckOrder', {
          numColumns: 2,
          bookingId: '',
          receptionId: res.data.id,
          button: {
            button_handed: 'action_handed',
          },
          receptionName: res.data.name,
        });
      })
      .catch((err) => {
        showMessage(err);
      });
  };
  const onRefresh = () => {
    setRefreshing(true);
    handleSearch(today, today);
  };
  const onLoadMore = () => {
    if (isLoadMore && isScroll) {
      handleSearch(
        handingState.fromDate,
        handingState.toDate,
        handingState.state,
        handingState.customerName,
        handingState.licensePlate,
        false,
        currentPage + 1,
        true,
      );
    }
  };
  const filterState = (item) => {
    setStSearch(item.key);
    handleSearch(
      handingState.fromDate,
      handingState.toDate,
      item.key,
      handingState.customerName,
      handingState.licensePlate,
      true,
    );
  };
  const renderFooter = () => {
    return (
      <>
        {isLoadMore && (
          <ActivityIndicator
            color={Colors.main}
            style={styles.iconReload}
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
              borderColor: item.state.color,
              backgroundColor: gradientColor(item.state.color),
            },
          ]}>
          <View style={styles.dateView}>
            <Text style={styles.txtDate}>
              {moment(item.date_order).format(VN_FORMAT_DATE)}
            </Text>
            <View
              style={[
                styles.state,
                {
                  backgroundColor: item.state.color,
                },
              ]}
            />
          </View>
          <View style={styles.customer}>
            <Text style={styles.txtName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.txtModel}>{item.vehicle.brand.name}</Text>
          </View>
          <Text numberOfLines={1} style={styles.txtAdv}>
            {item.customer.name}
          </Text>
          <Text style={styles.txtL}>{item.vehicle.license_plate}</Text>
          <Text style={styles.txtAdv}>{item.adviser.name}</Text>
          <TouchableOpacity
            onPress={() => goToDetail(item)}
            style={styles.btnDetail}>
            <Text style={styles.txtDetail}>{t('detail')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <IcVehicleHanding fill={Colors.main} />
        <Text style={styles.txtTitle}>{t('vehicle_handing')}</Text>
      </View>
      <SearchBar
        from={handingState.fromDate}
        to={handingState.toDate}
        lp={handingState.licensePlate}
        name={handingState.customerName}
        menu={vehicleHandingFilter}
        onSearch={handleSearch}
        refresh={refreshing}
        stateFilter={stSearch}
      />
      <StateBar
        color={Configs.HandingState}
        data={vehicleHandingState}
        onPress={filterState}
      />
      <FlatList
        data={listVehicleHanding}
        numColumns={3}
        renderItem={renderItem}
        keyExtractor={(_item, index) => index.toString()}
        ListEmptyComponent={<EmptyData />}
        style={styles.list}
        ListFooterComponent={renderFooter}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
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
    </SafeAreaView>
  );
}
