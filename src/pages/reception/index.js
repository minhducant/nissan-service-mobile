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
import {receptionStyles as styles} from '@styles/index';
import {IcReception} from '@common/svg/index';
import {Colors} from '@styles/index';
import Configs from '@configs/Configs';
import {GET} from '@repository/reception/index';
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
  setEmptyData,
  setWarrantyDate,
  setDateOrder,
  setCustomerRequest,
  setListUrlImage,
  setListImage,
  setRepState,
} from '@stores/appointment/actions';
import createStore from '@stores/index';
import {FAB} from 'react-native-paper';

export default function ReceptionScreen() {
  const {checkList, receptionFilter, listModel, today} = useSelector(
    (st) => st.conf,
  );
  const {repState} = useSelector((st) => st.appointment);
  const {t} = useContext(LocalizationContext);
  const roles = useSelector((st) => st.auth.user.roles);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [listReception, setListReception] = useState([]);
  const [receptionState, setReceptionState] = useState([]);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [stSearch, setStSearch] = useState('');

  useFocusEffect(
    useCallback(() => {
      const filter = createStore.store.getState().appointment.repState;
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
      dispatch(setRepState(filter));
    }
    dispatch(setLoading(true));
    GET.getListReception({
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
          setListReception(
            formatList({
              listData: listReception.concat(res.data.data),
              colorState: Configs.ReceptionState,
            }),
          );
        } else {
          setListReception(
            formatList({
              listData: res.data.data,
              colorState: Configs.ReceptionState,
            }),
          );
        }

        dispatch(setLoading(false));
        setReceptionState(res.data.state_total);
        setRefreshing(false);
      })
      .catch((err) => {
        if (__DEV__) {
          console.log(err);
        }
        showMessage(err);
        dispatch(setLoading(false));
        setReceptionState([]);
        setRefreshing(false);
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
  const onLoadMore = () => {
    if (isLoadMore && isScroll) {
      handleSearch(
        repState.fromDate,
        repState.toDate,
        repState.state,
        repState.customerName,
        repState.licensePlate,
        false,
        currentPage + 1,
        true,
      );
    }
  };
  const goToDetail = (item) => {
    const numColumns = item.state.key === 'draft' ? 1 : 2;
    dispatch(setLoading(true));
    const newState = {
      key: item.state.key,
      name: item.state.name,
    };
    dispatch(setState(newState));
    GET.getDetail({receptionId: item.id})
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
          imageModel: selectImageModel(veh.model.id),
        };
        dispatch(setCustomerRequest(cus.request));
        dispatch(setCheckType(res.data.request_type_ids));
        dispatch(setCheckList(res.data.checklist));
        dispatch(setInitCheckedReceive(res.data.checklist));
        dispatch(setInitCheckedHanding(res.data.checklist));
        dispatch(setCustomer(customer));
        dispatch(setVehicle(vehicle));
        dispatch(setWarrantyDate(res.data.warranty_date));
        dispatch(setDateOrder(res.data.date_order));
        dispatch(setListUrlImage(res.data.actual_image));
        dispatch(setListImage([]));
        navigation.navigate('CreateCheckOrder', {
          numColumns: numColumns,
          bookingId: '',
          receptionId: res.data.id,
          button: res.data.button,
          receptionName: res.data.name,
          adviser: res.data.adviser || {id: 0, name: ''},
          company_id: res.data.company_id,
        });
      })
      .catch((err) => {
        showMessage(err);
      });
  };
  const goToCreateCheckOrder = () => {
    dispatch(setInitCheckedReceive(checkList));
    dispatch(setInitCheckedHanding(checkList));
    dispatch(setCheckList(checkList));
    dispatch(setEmptyData());
    const state = {
      key: 'new',
      name: 'Mới',
    };
    dispatch(setState(state));
    navigation.navigate('CreateCheckOrder', {
      numColumns: 1,
      bookingId: '',
      receptionId: '',
      button: {},
      receptionName: '',
    });
  };
  const onRefresh = () => {
    setRefreshing(true);
    handleSearch(today, today);
  };
  const filterState = (item) => {
    setStSearch(item.key);
    handleSearch(
      repState.fromDate,
      repState.toDate,
      item.key,
      repState.customerName,
      repState.licensePlate,
      true,
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
          <Text style={styles.txtAdv} numberOfLines={1}>
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <IcReception fill={Colors.main} />
        <Text style={styles.txtTitle}>{t('reception')}</Text>
      </View>
      <SearchBar
        menu={receptionFilter}
        onSearch={handleSearch}
        refresh={refreshing}
        from={repState.fromDate}
        to={repState.toDate}
        lp={repState.licensePlate}
        name={repState.customerName}
        stateFilter={stSearch}
      />
      <StateBar
        color={Configs.ReceptionState}
        data={receptionState}
        onPress={filterState}
      />
      <FlatList
        data={listReception}
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
        roles?.sales_team === 'group_sale_salesman' ||
        roles?.izi_update_state_repair === 'group_manager_agency_service') && (
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => goToCreateCheckOrder()}
        />
      )}
    </SafeAreaView>
  );
}
