import React, {
  useState,
  useEffect,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from 'react';
import {
  View,
  Alert,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import { FAB } from 'react-native-paper';
import normalize from 'react-native-normalize';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import createStore from '@stores/index';
import { showMessage } from '@common/index';
import { Colors, css } from '@styles/index';
import { PUT } from '@repository/repair/index';
import { GET } from '@repository/timeline/index';
import { VN_FORMAT_DATE } from '@configs/Configs';
import { setLoading } from '@stores/config/actions';
import { EmptyData } from '@components/forms/index';
import ManagerNote from '@components/repair_order/ManagerNote';
import SearchBar from '@components/customer_timeline/SearchBar';
import CustomModal from '@components/customer_timeline/CustomModal';
import { setCustomerTimelineState } from '@stores/appointment/actions';
import PickerTechnical from '@components/repair_order/PickerTechnical';
import TimeLineData from '@components/customer_timeline/TimeLineData';
import DataItemTimeline from '@components/customer_timeline/TimelineItem';
import InformationModal from '@components/customer_timeline/InformationModal';

const FormBody = (props, ref) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const today = moment().format(VN_FORMAT_DATE);
  const { isLoading } = useSelector((st) => st.conf);
  const { accessToken } = useSelector((st) => st.auth);
  const roles = useSelector((st) => st.auth.user.roles);
  const { cusTimelineState } = useSelector((st) => st.appointment);
  const companyId = useSelector((st) => st.auth.user.company_id.id);
  const [typeDate, setTypeDate] = useState('today');
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [listTimeline, setListTimeline] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [infRepairOder, setInfRepairOder] = useState({});
  const [showNote, setShowNote] = useState(false);
  const [showEmployee, setShowEmployee] = useState(false);
  const [listEmployee, setListEmployee] = useState([]);
  const [employeeIds, setEmployeeIds] = useState([]);
  const [timer, setTimer] = useState(300);
  const [selectedButton, setSelectedButton] = useState(0);
  const [isShowInfoModal, setIsShowInfoModal] = useState(false);
  const [stateValueSearch, setStateValueSearch] = useState(2);

  useFocusEffect(
    useCallback(() => {
      const filter = createStore.store.getState().appointment.cusTimelineState;
      setTypeDate(
        CalculateNumberOfDays(filter.fromDate, filter.toDate) === 0
          ? 'today'
          : 5
            ? 'week'
            : 'month',
      );
      setSelectedButton(
        CalculateNumberOfDays(filter.fromDate, filter.toDate) === 0
          ? 0
          : 5
            ? 1
            : 2,
      );
      setIsEdit(true);
      setTimer(300);
      handleSearch(
        filter.fromDate,
        filter.toDate,
        filter.state || 'all',
        filter.customerName,
        filter.licensePlate,
        1,
        false,
        null,
        null,
        null,
        2

      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useEffect(() => {
    setIsShowSearch(true);
    _getTechnical();
    if (timer === 0) {
      handleSearch(
        cusTimelineState.fromDate,
        cusTimelineState.toDate,
        cusTimelineState.state,
        cusTimelineState.customerName,
        cusTimelineState.licensePlate,
        false,
        false,
        null,
        null,
        null,
        2

      );
    }
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 50;
      });
    }, 50000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

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
        // console.log(err);
      });
  };

  const handleSearch = (
    date_from,
    date_to,
    state,
    customer_name,
    license_plate,
    page = 1,
    addMore = false,
    repair_type,
    adviser_id,
    compartment_id,
    stateRECEPTION_key,
  ) => {
    // console.log("=>>>>>>>>>>>>>>>>>>>>>>>>>x_state_repair_request", stateRECEPTION_key);

    setStateValueSearch(stateRECEPTION_key)
    const filter = {
      fromDate: date_from,
      toDate: date_to,
      licensePlate: license_plate || '',
      state: state || '',
      customerName: customer_name || '',
    };
    dispatch(setCustomerTimelineState(filter));
    dispatch(setLoading(true));
    setIsEdit(true);
    setTimer(300);
    if (CalculateNumberOfDays(date_from, date_to) === 0) {
      setTypeDate('today');
      setSelectedButton(0);
    }
    if (
      CalculateNumberOfDays(date_from, date_to) > 0 &&
      CalculateNumberOfDays(date_from, date_to) < 10
    ) {
      setTypeDate('week');
      setSelectedButton(1);
    }
    if (CalculateNumberOfDays(date_from, date_to) >= 10) {
      setTypeDate('month');
      setSelectedButton(2);
    }
    GET.getCustomerTimeline({
      dateFrom: date_from,
      dateTo: date_to,
      licensePlate: license_plate,
      customerName: customer_name,
      state: state,
      page: page,
      addMore: false,
      x_state_repair_request: stateRECEPTION_key

    })
      .then((res) => {
        // console.log(JSON.stringify(res.data, null, 2));
        if (res.data.meta.current_page === res.data.meta.next_page) {
          setIsLoadMore(false);
        } else {
          setIsLoadMore(true);
        }
        setCurrentPage(res.data.meta.current_page);
        if (addMore) {
          setListTimeline(listTimeline.concat(res.data.data));
        } else {
          setListTimeline(res.data.data);
        }
        dispatch(setLoading(false));
        setRefreshing(false);
      })
      .catch((err) => {
        if (__DEV__) {
          // console.log(err);
        }
        showMessage(err);
        dispatch(setLoading(false));
        setListTimeline([]);
        setRefreshing(false);
      });
  };

  const onLoadMore = () => {
    if (isLoadMore && isScroll) {
      handleSearch(
        cusTimelineState.fromDate,
        cusTimelineState.toDate,
        cusTimelineState.state,
        cusTimelineState.customerName,
        cusTimelineState.licensePlate,
        currentPage + 1,
        true,
        null,
        null,
        null,
        stateValueSearch

      );
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    handleSearch(today, today,
      null,
      null,
      null,
      null, null,
      null,
      null,
      null,
      stateValueSearch
    );

  };

  useImperativeHandle(ref, () => ({
    onSetShowSearch() {
      setIsShowSearch(!isShowSearch);
    },
  }));

  const _onPressFAB = () => {
    if (isEdit === true) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };

  const onPress = (key, item) => {
    const params = {
      accessToken: accessToken,
      fleet_repair_order_id: infRepairOder.fleet_repair_order_id,
      action: key,
    };
    setIsModal(false);
    if (key === 'action_assign_employee_all_task') {
      setShowEmployee(true);
    } else if (key === 'button_acceptance_work') {
      if (infRepairOder.check_material_qty === false) {
        showMessage('Vật tư chưa được nghiệm thu hết. Vui lòng kiểm tra lại!');
      } else if (infRepairOder.check_acceptance_work !== 'done') {
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
    } else if (key === 'view_ro') {
      navigation.navigate('DetailRepairOrder', {
        item: infRepairOder,
        goBack: true,
      });
    } else {
      PUT.repairAction(params)
        .then((res) => {
          dispatch(setLoading(false));
          showMessage('Cập nhật trạng thái thành công!');
          handleSearch(today, today);
        })
        .catch((err) => {
          dispatch(setLoading(false));
          showMessage(err);
          // console.log(err);
        });
    }
  };

  const onChooseEmployee = () => {
    const params = {
      accessToken: accessToken,
      fleet_repair_order_id: infRepairOder.fleet_repair_order_id,
      active_id: infRepairOder.fleet_repair_order_id,
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
        handleSearch(today, today);
      })
      .catch((err) => {
        dispatch(setLoading(false));
        showMessage(err);
        // console.log(err);
      });
  };

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

  const onAcceptNote = (note) => {
    const params = {
      accessToken: accessToken,
      fleet_repair_order_id: infRepairOder.fleet_repair_order_id,
      x_note_fro: note,
    };
    setShowNote(false);
    PUT.acceptanceWorkAction(params)
      .then((res) => {
        dispatch(setLoading(false));
        showMessage('Cập nhật trạng thái thành công!');
        handleSearch(today, today);
      })
      .catch((err) => {
        dispatch(setLoading(false));
        showMessage(err);
        // console.log(err);
      });
  };

  const onDismissNote = () => {
    setShowNote(false);
    if (infRepairOder.check_acceptance_work !== 'done') {
      PUT.acceptanceWork({
        accessToken: accessToken,
        fleet_repair_order_id: infRepairOder.fleet_repair_order_id,
      })
        .then((res) => {
          dispatch(setLoading(false));
          showMessage('Cập nhật trạng thái thành công!');
          setShowNote(true);
          handleSearch(today, today);
        })
        .catch((err) => {
          dispatch(setLoading(false));
          showMessage(err);
          // console.log(err);
        });
    } else {
      const params = {
        accessToken: accessToken,
        fleet_repair_order_id: infRepairOder.fleet_repair_order_id,
        action: 'button_acceptance_work',
      };
      PUT.acceptanceWorkAction(params)
        .then((res) => {
          dispatch(setLoading(false));
          showMessage('Cập nhật trạng thái thành công!');
          handleSearch(today, today);
        })
        .catch((err) => {
          dispatch(setLoading(false));
          showMessage(err);
          // console.log(err);
        });
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <DataItemTimeline
        type={props.type}
        item={item}
        index={index}
        isEdit={isEdit}
        date={typeDate}
        isModal={isModal}
        setIsModal={setIsModal}
        setInfRepairOder={setInfRepairOder}
        setIsShowInfoModal={setIsShowInfoModal}
      />
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
    <View style={styles.container}>
      {isShowSearch && (
        <SearchBar
          onSearch={handleSearch}
          refreshing={refreshing}
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
      )}
      <TimeLineData type={props.type} state={typeDate} />
      {isLoading ? (
        <></>
      ) : (
        <FlatList
          data={listTimeline}
          extraData={isLoading}
          renderItem={renderItem}
          keyExtractor={(_item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={<EmptyData />}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.1}
          onMomentumScrollBegin={() => {
            setIsScroll(true);
          }}
          contentContainerStyle={styles.flatList(props.type)}
          refreshControl={
            <RefreshControl
              colors={[Colors.main]}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      )}
      <CustomModal
        isModal={isModal}
        setIsModal={setIsModal}
        onPress={onPress}
        item={infRepairOder}
      />
      <InformationModal
        item={infRepairOder}
        isModal={isShowInfoModal}
        setIsModal={setIsShowInfoModal}
      />
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
      {(roles?.izi_security === 'group_service_adviser' ||
        roles?.izi_security === 'group_repair_manage_workshop') &&
        props.type === 'full' && (
          <FAB
            icon={
              isEdit === false
                ? 'content-save-edit-outline'
                : 'tooltip-edit-outline'
            }
            style={styles.edit}
            onPress={_onPressFAB}
          />
        )}
    </View>
  );
};

export default forwardRef(FormBody);

function CalculateNumberOfDays(date_from, date_to) {
  var dateFrom_split = date_from.split('-');
  var dateTo_split = date_to.split('-');
  var dateFrom = new Date(
    dateFrom_split[2],
    dateFrom_split[1],
    dateFrom_split[0],
  );
  var dateTo = new Date(dateTo_split[2], dateTo_split[1], dateTo_split[0]);
  var Difference_In_Time = dateTo.getTime() - dateFrom.getTime();
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return Difference_In_Days;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: css.mgH5,
    backgroundColor: Colors.white,
    flex: 1,
  },
  timeline: { flexDirection: 'row' },
  edit: {
    position: 'absolute',
    margin: normalize(18),
    right: normalize(10),
    bottom: normalize(-3),
    backgroundColor: Colors.main,
    height: normalize(20),
    width: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: (type) => ({
    paddingBottom: type === 'normal' ? normalize(25) : normalize(5),
  }),
});
