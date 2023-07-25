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
  // ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import normalize from 'react-native-normalize';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { showMessage } from '@common/index';
import { Colors, css } from '@styles/index';
import { PUT } from '@repository/repair/index';
import { GET } from '@repository/timeline/index';
import { VN_FORMAT_DATE } from '@configs/Configs';
import { setLoading } from '@stores/config/actions';
import { EmptyData } from '@components/forms/index';
import { setWorkshopTimelineState } from '@stores/appointment/actions';
import ManagerNote from '@components/repair_order/ManagerNote';
import SearchBar from '@components/customer_timeline/SearchBar';
import CustomModal from '@components/customer_timeline/CustomModal';
import PickerTechnical from '@components/repair_order/PickerTechnical';
import TimeLineData from '@components/customer_timeline/TimeLineData';
import DataItemTimeline from '@components/workshop_timeline/TimelineItem';
import GeneralTimeline from '@components/workshop_timeline/GeneralTimeline';
import InformationModal from '@components/customer_timeline/InformationModal';
import InformationModalCustom from '@components/customer_timeline/InformationModalCustom';

const FormBody = (props, ref) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const today = moment().format(VN_FORMAT_DATE);
  const { isLoading } = useSelector((st) => st.conf);
  const { accessToken } = useSelector((st) => st.auth);
  const { wkTimelineState } = useSelector((st) => st.appointment);
  // console.log(wkTimelineState);
  const companyId = useSelector((st) => st.auth.user.company_id.id);
  const [typeDate, setTypeDate] = useState('today');
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [listTimeline, setListTimeline] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [infRepairOder, setInfRepairOder] = useState({});
  const [showNote, setShowNote] = useState(false);
  const [showEmployee, setShowEmployee] = useState(false);
  const [listEmployee, setListEmployee] = useState([]);
  const [employeeIds, setEmployeeIds] = useState([]);
  const [timer, setTimer] = useState(300);
  const [listAdvisers, setListAdvisers] = useState([]);
  const [selectedButton, setSelectedButton] = useState(0);
  const [listCompartments, setListCompartments] = useState([]);


  const type_repair =
    props.timelineType === 'mixture_timeline'
      ? {
        key: [27, 28, 29, 31, 32, 34],
        name: 'Hồn hợp',
        sequence: 1,
      }
      : props.timelineType === 'general_timeline'
        ? { key: [27, 31, 32, 34], name: 'Sửa chữa chung', sequence: 5 }
        : { key: [28, 29], name: 'Đồng sơn', sequence: 10 };

  useFocusEffect(
    useCallback(() => {
      setTypeDate('today');
      setSelectedButton(0);
      setTimer(300);
      handleSearch(
        today,
        today,
        props.timelineType === "paint_timeline" ||
          props.timelineType === "mixture_timeline" ||
          props.timelineType === "general_timeline " ? "repaired" : "all",
        '',
        '',
        1,
        false,
        type_repair.key,
        null,
        0,
        // 2,
        props.timelineType === "paint_timeline" || props.timelineType === "mixture_timeline" ? "handed" : 2,
        // props.timelineType === "general_timeline" ? 1 : 0
        1
        //truyền key : ""
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  // console.log(wkTimelineState);
  useEffect(() => {
    setIsShowSearch(true);
    _getTechnical();
    _getListAdvisers();
    _getCompartments();
    if (timer === 0) {
      handleSearch(
        wkTimelineState.fromDate,
        wkTimelineState.toDate,
        wkTimelineState.state,
        wkTimelineState.customerName,
        wkTimelineState.licensePlate,
        1,
        false,
        props.timelineType === "paint_timeline" || props.timelineType === "mixture_timeline" && wkTimelineState.repairType,
        wkTimelineState.adviserId,
        wkTimelineState.compartmentId,
        props.timelineType === "paint_timeline" || props.timelineType === "mixture_timeline" ? "handed" : 2,
        props.timelineType === "general_timeline" ? 1 : 0
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

  const _getTechnical = () => {
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

  const _getListAdvisers = () => {
    GET.getAdviser({ accessToken: accessToken, company_id: companyId })
      .then((res) => {
        setListAdvisers(
          [
            {
              id: null,
              name: 'Cố vấn dịch vụ',
            },
          ].concat(res.data),
        );
      })
      .catch((err) => {
        showMessage(err);
        // console.log(err);
      });
  };

  const _getCompartments = () => {
    GET.getCompartment({ accessToken: accessToken, company_id: companyId })
      .then((res) => {
        setListCompartments(
          [
            {
              branch_id: '',
              code: false,
              id: 0,
              location: '0',
              name: 'Tất cả khoang',
              state: true,
            },
          ].concat(res.data),
        );
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
    compartment_not_choose

  ) => {
    // console.log(compartment_not_choose);
    const filter = {
      fromDate: date_from,
      toDate: date_to,
      licensePlate: license_plate,
      state: state,
      customerName: customer_name,
      repairType: repair_type,
      adviserId: adviser_id,
      compartmentId: compartment_id,
    };
    dispatch(setWorkshopTimelineState(filter));
    dispatch(setLoading(true));
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
    GET.getWorkshopTimeline({
      accessToken: accessToken,
      dateFrom: date_from,
      dateTo: date_to,
      licensePlate: license_plate,
      customerName: customer_name,
      state: state,
      page: page,
      repairType: repair_type,
      adviserId: adviser_id,
      compartmentId: compartment_id,
      type_repair: props.timelineType,
      x_state_repair_request: stateRECEPTION_key,
      compartment_not_choose: compartment_not_choose

    })
      .then((res) => {
        // console.log(JSON.stringify(res.data));
        if (
          type_repair !== 'general_timeline' &&
          res?.data?.meta?.current_page === res?.data?.meta?.next_page
        ) {
          setIsLoadMore(false);
        } else {
          setIsLoadMore(true);
        }
        type_repair !== 'general_timeline' &&
          setCurrentPage(res?.data?.meta?.current_page);
        if (addMore) {
          setListTimeline(listTimeline.concat(res.data.data));
        } else {
          // console.log("res.data.data====================>", res.data.data);
          setListTimeline(res.data.data);
        }
        // console.log(JSON.stringify(res.data.data, null, 2));
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
        console.log(err);
      });
  };
  // console.log(wkTimelineState);
  const onLoadMore = () => {
    if (isLoadMore && isScroll) {
      handleSearch(
        wkTimelineState.fromDate,
        wkTimelineState.toDate,
        wkTimelineState.state,
        wkTimelineState.customerName,
        wkTimelineState.licensePlate,
        currentPage + 1,
        true,
        props.timelineType === "paint_timeline" ? [28, 29] : wkTimelineState.repairType,
        wkTimelineState.adviserId,
        wkTimelineState.compartmentId,
        props.timelineType === "paint_timeline" || props.timelineType === "mixture_timeline" ? "handed" : 2,
        props.timelineType === "general_timeline" ? 1 : 0

      );
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    handleSearch(
      today,
      today,
      wkTimelineState.state,
      '',
      '',
      1,
      false,
      type_repair.key,
      null,
      0,
      props.timelineType === "paint_timeline" || props.timelineType === "mixture_timeline" ? "handed" : 2,
      props.timelineType === "general_timeline" ? 1 : 0
    );
  };
  useImperativeHandle(ref, () => ({
    onSetShowSearch() {
      setIsShowSearch(!isShowSearch);
    },
  }));

  const onPress = (key, item) => {
    const params = {
      accessToken: accessToken,
      fleet_repair_order_id:
        infRepairOder.id || infRepairOder.fleet_repair_order_id,
      action: key,
    };
    setIsModal(false);
    if (key === 'action_assign_employee_all_task') {
      setShowEmployee(true);
    } else if (key === 'button_acceptance_work') {
      if (infRepairOder.check_material_qty !== null) {
        showMessage('Vật tư chưa được nghiệm thu hết. Vui lòng kiểm tra lại!');
      } else if (
        infRepairOder.check.every(function (it) {
          return it.check_acceptance_work !== 'done';
        }) === true
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
          handleSearch(
            wkTimelineState.fromDate,
            wkTimelineState.toDate,
            wkTimelineState.state,
            wkTimelineState.customerName,
            wkTimelineState.licensePlate,
            1,
            false,
            wkTimelineState.repairType,
            wkTimelineState.adviserId,
            wkTimelineState.compartmentId,
            1,
            props.timelineType === "general_timeline" ? 1 : 0

          );
        })
        .catch((err) => {
          dispatch(setLoading(false));
          showMessage(err);
          // console.log(err);
        });
    }
  };

  const onDismiss = () => {
    setShowEmployee(false);
    setEmployeeIds([]);
  };

  const onDismissNote = () => {
    setShowNote(false);
    PUT.acceptanceWork({
      accessToken: accessToken,
      fleet_repair_order_id: infRepairOder.id,
    })
      .then((res) => {
        dispatch(setLoading(false));
        showMessage('Cập nhật trạng thái thành công!');
        handleSearch(
          wkTimelineState.fromDate,
          wkTimelineState.toDate,
          wkTimelineState.state,
          wkTimelineState.customerName,
          wkTimelineState.licensePlate,
          1,
          false,
          wkTimelineState.repairType,
          wkTimelineState.adviserId,
          wkTimelineState.compartmentId,
          1,
          props.timelineType === "general_timeline" ? 1 : 0

        );
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

  const onChooseEmployee = () => {
    const params = {
      accessToken: accessToken,
      fleet_repair_order_id: infRepairOder.id,
      active_id: infRepairOder.id,
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
        handleSearch(
          wkTimelineState.fromDate,
          wkTimelineState.toDate,
          wkTimelineState.state,
          wkTimelineState.customerName,
          wkTimelineState.licensePlate,
          1,
          false,
          wkTimelineState.repairType,
          wkTimelineState.adviserId,
          wkTimelineState.compartmentId,


        );
      })
      .catch((err) => {
        dispatch(setLoading(false));
        showMessage(err);
        // console.log(err);
      });
  };

  const onAcceptNote = (note) => {
    const params = {
      accessToken: accessToken,
      fleet_repair_order_id: infRepairOder.id,
      x_note_fro: note,
    };
    setShowNote(false);
    PUT.acceptanceWorkAction(params)
      .then((res) => {
        dispatch(setLoading(false));
        showMessage('Cập nhật trạng thái thành công!');
        handleSearch(
          wkTimelineState.fromDate,
          wkTimelineState.toDate,
          wkTimelineState.state,
          wkTimelineState.customerName,
          wkTimelineState.licensePlate,
          1,
          false,
          wkTimelineState.repairType,
          wkTimelineState.adviserId,
          wkTimelineState.compartmentId,
        );
      })
      .catch((err) => {
        dispatch(setLoading(false));
        showMessage(err);
        // console.log(err);
      });
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

  const renderItem = ({ item, index }) => {
    return (
      <>
        {props.timelineType === 'general_timeline' ? (
          <GeneralTimeline
            type={props.type}
            it={item}
            idx={index}
            date={typeDate}
            isModal={isModal}
            setIsModal={setIsModal}
            setInfRepairOder={setInfRepairOder}
            timelineType={props.timelineType}
            isShowStartingPoints={props.isShowStartingPoints}
            isModalLongPress={isModalLongPress}
            setSetIsLongPress={setIsModalLongPress}
            setItemLongPress={setItemLongPress}
          // onLongPressItemClick={() => { onLongPressItemClick(item) }}

          />
        ) : (
          <DataItemTimeline
            type={props.type}
            it={item}
            idx={index}
            date={typeDate}
            isModal={isModal}
            setIsModal={setIsModal}
            setInfRepairOder={setInfRepairOder}
            timelineType={props.timelineType}
              isShowStartingPoint={props.isShowStartingPoint}
              isModalLongPress={isModalLongPress}
              setSetIsLongPress={setIsModalLongPress}
              setItemLongPress={setItemLongPress}
          />
        )}
      </>
    );
  };

  const [isModalLongPress, setIsModalLongPress] = useState(false);
  const [itemLongPress, setItemLongPress] = useState({});

  return (
    <View style={styles.container}>
      {isShowSearch && (
        <SearchBar
          onSearch={handleSearch}
          refreshing={refreshing}
          listAdvisers={listAdvisers}
          listCompartments={listCompartments}
          timelineType={props.timelineType}
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
      )}
      <TimeLineData
        type={props.type}
        state={typeDate}
        timelineType={props.timelineType}
      />
      {isLoading ? (
        <></>
      ) : (
        <FlatList
          data={
            props.timelineType === 'paint_timeline' &&
                wkTimelineState.compartmentId
              ? listTimeline
                  .filter(function (task) {
                    return task.task_detail.length !== 0;
                  })
                  .filter(function (task) {
                    return (
                      task.task_detail.filter(function (tak) {
                        return (
                          tak.compartment_id === wkTimelineState.compartmentId
                        );
                      }).length > 0
                    );
                  })
                : props.timelineType === "mixture_timeline" || props.timelineType === "paint_timeline" ? listTimeline.filter(function (task) {
                  return task.task_detail.length > 0;
                }) :
                  listTimeline.filter(function (task) {
                    return task.task_detail;
                  })
          }
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
      <InformationModalCustom
        isModal={isModalLongPress}
        // isModalLongPress={setIsModalLongPress}
        item={itemLongPress}
        onBackdropPress={() => { setIsModalLongPress(false) }}
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
  flatList: (type) => ({
    paddingBottom: type === 'normal' ? normalize(25) : normalize(5),
  }),
});
