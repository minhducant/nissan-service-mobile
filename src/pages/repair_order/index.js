import React, {useState, useCallback, useContext} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import Configs from '@configs/Configs';
import createStore from '@stores/index';
import {IcRepair} from '@common/svg/index';
import {GET} from '@repository/repair/index';
import {VN_FORMAT_DATE} from '@configs/Configs';
import {setLoading} from '@stores/config/actions';
import {LocalizationContext} from '@context/index';
import {setRepairOrderState} from '@stores/appointment/actions';
import {Colors, appointmentStyles as styles} from '@styles/index';
import {formatList, gradientColor, showMessage} from '@common/index';
import {SearchBar, StateBar, EmptyData} from '@components/forms/index';

export default function Progress() {
  const {t} = useContext(LocalizationContext);
  const {repairOrderState} = useSelector((st) => st.appointment);
  const {today} = useSelector((st) => st.conf);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [stSearch, setStSearch] = useState('');
  const [listRepair, setListRepair] = useState([]);
  const [repairState, setRepairState] = useState([]);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const repairFilter = [
    {key: 'all', name: 'Tất cả', sequence: 1},
    {key: 'new', name: 'Mới', sequence: 5},
    {key: 'repairing', name: 'Đang sửa chữa', sequence: 10},
    {key: 'pause', name: 'Tạm dừng', sequence: 15},
    {key: 'verify', name: 'Xác nhận', sequence: 20},
    {key: 'repaired', name: 'Sửa chữa xong', sequence: 25},
    {key: 'cancel', name: 'Huỷ', sequence: 30},
  ];

  useFocusEffect(
    useCallback(() => {
      const filter = createStore.store.getState().appointment.repairOrderState;
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
      dispatch(setRepairOrderState(filter));
    }
    dispatch(setLoading(true));
    GET.getListRepairOrders({
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
          setListRepair(
            formatList({
              listData: listRepair.concat(res.data.data),
              colorState: Configs.RepairState,
            }),
          );
        } else {
          setListRepair(
            formatList({
              listData: res.data.data,
              colorState: Configs.RepairState,
            }),
          );
        }
        dispatch(setLoading(false));
        setRepairState(res.data.state_total);
        setRefreshing(false);
      })
      .catch((err) => {
        if (__DEV__) {
          console.log(err);
        }
        showMessage(err);
        dispatch(setLoading(false));
        setRepairState([]);
        setRefreshing(false);
      });
  };

  const onLoadMore = () => {
    if (isLoadMore && isScroll) {
      handleSearch(
        repairOrderState.fromDate,
        repairOrderState.toDate,
        repairOrderState.state,
        repairOrderState.customerName,
        repairOrderState.licensePlate,
        false,
        currentPage + 1,
        true,
      );
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    handleSearch(today, today);
  };

  const filterState = (item) => {
    setStSearch(item.key);
    handleSearch(
      repairOrderState.fromDate,
      repairOrderState.toDate,
      item.key,
      repairOrderState.customerName,
      repairOrderState.licensePlate,
      true,
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

  const renderItem = ({item, index}) => {
    const mainColor =
      item.state.key === 'new'
        ? 'rgba(255, 207, 27, 1)'
        : item.state.key === 'pause'
        ? 'rgba(153, 153, 255, 1)'
        : item.state.key === 'repaired'
        ? 'rgba(0, 255, 0, 1)'
        : item.state.key === 'repairing'
        ? 'rgba(255, 0, 102, 1)'
        : item.state.key === 'verify'
        ? 'rgba(255, 117, 0, 1)'
        : 'rgba(208, 0, 0, 1)';
    return (
      <View style={styles.itemContainer}>
        <View
          style={[
            styles.itemContent,
            {
              borderColor: mainColor,
              backgroundColor: gradientColor(mainColor),
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
                  backgroundColor: mainColor,
                },
              ]}
            />
          </View>
          <View style={styles.customer}>
            <Text style={styles.txtName} numberOfLines={1}>
              {item.name}
            </Text>
          </View>
          <Text style={styles.txtAdv} numberOfLines={1}>
            {item.customer.name}
          </Text>
          <Text style={styles.txtL}>{item.vehicle.license_plate}</Text>
          <View style={styles.customer}>
            <Text style={styles.txtAdv}>{item.state.name}</Text>
            <Text style={styles.txtModel}>{item.vehicle.brand.name}</Text>
          </View>
          <TouchableOpacity
            style={styles.btnDetail}
            onPress={() =>
              navigation.navigate('DetailRepairOrder', {
                item: item,
              })
            }>
            <Text style={styles.txtDetail}>{t('detail')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <IcRepair fill={Colors.main} />
        <Text style={styles.txtTitle}>Lệnh sửa chữa</Text>
      </View>
      <SearchBar
        menu={repairFilter}
        onSearch={handleSearch}
        stateFilter={stSearch}
      />
      <StateBar
        data={repairState}
        color={Configs.RepairState}
        onPress={filterState}
      />
      <FlatList
        data={listRepair}
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
    </SafeAreaView>
  );
}
