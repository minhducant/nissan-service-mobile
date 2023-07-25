import React, {useState, useContext, useEffect, Fragment} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Container} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {Divider, ProgressBar} from 'react-native-paper';
// import moment from 'moment';

import {Colors} from '@styles/index';
import {ProgressState} from '@configs/Configs';
import {LocalizationContext} from '@context/index';
import {showMessage} from '@common/index';
import {EmptyData, SearchBar, StateBar} from '@components/forms/index';
import {GET} from '@repository/progress/index';
import {setLoading} from '@stores/config/actions';
import {progressStyle as styles} from '@styles/index';
// import {VN_FORMAT_DATE} from '@configs/Configs';
import Configs from '@configs/Configs';
import {IcProgress} from '@common/svg/index';

export default function Progress() {
  const dispatch = useDispatch();
  const {progressFilter, today} = useSelector((st) => st.conf);
  const {t} = useContext(LocalizationContext);
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);
  const [licencePlate, setLicencePlate] = useState('');
  const [customer, setCustomer] = useState('');
  // const [adviser, setAdviser] = useState('');
  const [state, setState] = useState('');
  const [progressState, setProgressState] = useState([]);
  const [listProgress, setListProgress] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadData, setIsLoadData] = useState(false);
  const [stSearch, setStSearch] = useState('');

  useEffect(() => {
    findListProgress({
      page: 1,
      addMore: false,
      fromDate: dateFrom,
      toDate: dateTo,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSearch = (fromDate, toDate, st, customerName, licensePlate) => {
    setDateFrom(fromDate);
    setDateTo(toDate);
    setState('');
    setLicencePlate(licensePlate);
    setCustomer(customerName);
    findListProgress({
      page: 1,
      addMore: false,
      stateFilter: st,
      licensePlate,
      customerName,
      fromDate,
      toDate,
    });
  };
  const findListProgress = ({
    page,
    addMore,
    stateFilter,
    licensePlate,
    customerName,
    adviserName,
    fromDate,
    toDate,
  }) => {
    dispatch(setLoading(true));
    GET.getListProgress({
      fromDate,
      toDate,
      page,
      itemsPerPage: 24,
      state: stateFilter,
      adviserName,
      licensePlate,
      customerName,
    })
      .then((res) => {
        dispatch(setLoading(false));
        setIsLoadData(false);
        if (addMore) {
          setListProgress(listProgress.concat(res.data.data));
        } else {
          setListProgress(res.data.data);
        }
        setProgressState(res.data.state_total);
        // console.log(res.data.state_total);
        setCurrentPage(res.data.meta.current_page);
        setNextPage(res.data.meta.next_page);
      })
      .catch((err) => {
        showMessage(err);
        if (__DEV__) {
          // console.log(err);
        }
        dispatch(setLoading(false));
        setIsLoadData(false);
      });
  };
  const loadMoreData = () => {
    if (currentPage < nextPage && !isLoadData) {
      setIsLoadData(true);
      findListProgress({
        page: nextPage,
        addMore: true,
        state: state,
        licensePlate: licencePlate,
        customerName: customer,
        fromDate: dateFrom,
        toDate: dateTo,
      });
    } else {
      setIsLoadData(false);
    }
  };
  const filterState = (item) => {
    setStSearch(item.key);
    handleSearch(dateFrom, dateTo, item.key, customer, licencePlate);
  };
  const renderFooter = () => {
    if (isLoadData) {
      return (
        <View>
          <ActivityIndicator size="large" color={Colors.main} />
        </View>
      );
    } else {
      return <Fragment />;
    }
  };
  const renderProgressItem = ({item, index}) => {
    return (
      <View style={styles.containerItem}>
        <Text style={[styles.txtFl05, {color: ProgressState[item.state.key]}]}>
          {index + 1}
        </Text>
        <Text style={[styles.txtFl15, {color: ProgressState[item.state.key]}]}>
          {item.vehicle.license_plate}
        </Text>
        <Text style={[styles.txtFl15, {color: ProgressState[item.state.key]}]}>
          {item.state.name}
        </Text>
        <View style={styles.containProgress}>
          <View style={styles.progressCon}>
            <ProgressBar
              style={styles.progress}
              progress={item.progress_bar / 100}
              color={ProgressState[item.state.key]}
            />
          </View>
          <Text
            style={[
              styles.txtProgress,
              {color: ProgressState[item.state.key]},
            ]}>{`${item.progress_bar} %`}</Text>
        </View>
        <Text style={[styles.txtFl15, {color: ProgressState[item.state.key]}]}>
          {item.date_hand_plan}
        </Text>
        <Text style={[styles.txtFl15, {color: ProgressState[item.state.key]}]}>
          {item.adviser.name}
        </Text>
        <View style={styles.adviserContain}>
          <View style={styles.adviserView}>
            {item.employee.map((employee, idx) => {
              return (
                <Text key={idx.toString()} style={[styles.txtAdv]}>
                  {employee.name}
                </Text>
              );
            })}
          </View>
        </View>

        <Text style={[styles.txtFl1, {color: ProgressState[item.state.key]}]}>
          {item.vehicle.model.name}
        </Text>
      </View>
    );
  };
  const renderSeparator = () => <Divider />;

  const renderHeaderList = () => {
    return (
      <View style={styles.titleItem}>
        <Text style={styles.txtFl05}>{t('numerical_order')}</Text>
        <Text style={styles.txtFl15}>{t('license_plate')}</Text>
        <Text style={styles.txtFl15}>{t('state')}</Text>
        <Text style={styles.txtFl15}>{t('progress')}</Text>
        <Text style={styles.txtFl15}>{t('date_hand_plan')}</Text>
        <Text style={styles.txtFl15}>{t('service_advisor')}</Text>
        <Text style={styles.txtFl15}>{t('technicians')}</Text>
        <Text style={styles.txtFl1}>{t('model')}</Text>
      </View>
    );
  };
  return (
    <Container style={styles.container}>
      <View style={styles.title}>
        <IcProgress fill={Colors.main} />
        <Text style={styles.txtTitle}>{t('progress')}</Text>
      </View>
      <SearchBar
        menu={progressFilter}
        onSearch={handleSearch}
        stateFilter={stSearch}
      />
      <StateBar
        data={progressState}
        color={Configs.ProgressState}
        onPress={filterState}
      />
      <ScrollView horizontal>
        <FlatList
          data={listProgress}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderProgressItem}
          ListEmptyComponent={<EmptyData />}
          ListHeaderComponent={renderHeaderList()}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ItemSeparatorComponent={renderSeparator}
          stickyHeaderIndices={[0]}
        />
      </ScrollView>
    </Container>
  );
}
