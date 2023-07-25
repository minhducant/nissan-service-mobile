import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {SearchBar, StateBar, EmptyData} from '@components/forms/index';
import {quotationStyles as styles} from '@styles/index';
import {Colors} from '@styles/index';
import {IcQuotation} from '@common/svg/index';
import {LocalizationContext} from '@context/index';
import {GET} from '@repository/quotation/index';
import {setLoading} from '@stores/config/actions';
import {formatList, gradientColor} from '@common/index';
import Configs from '@configs/Configs';
import {VN_FORMAT_DATE} from '@configs/Configs';

export default function QuotationScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useContext(LocalizationContext);
  const {quotationFilter, today} = useSelector((st) => st.conf);
  const [listQuotation, setListQuotation] = useState([]);
  const [quotationState, setQuotationState] = useState([]);
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [keyState, setKeyState] = useState('');
  const [name, setName] = useState('');
  const [lp, setLp] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [stSearch, setStSearch] = useState('');

  useEffect(() => {
    handleSearch(today, today);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSearch = (
    dateFrom,
    dateTo,
    state,
    customerName,
    licensePlate,
    page = 1,
    addMore = false,
  ) => {
    setFromDate(dateFrom);
    setToDate(dateTo);
    setKeyState(state);
    setLp(licensePlate);
    setName(customerName);
    dispatch(setLoading(true));
    GET.getListQuotations({
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
          setListQuotation(
            formatList({
              listData: res.data.data.concat(listQuotation),
              colorState: Configs.QuotationState,
            }),
          );
        } else {
          setListQuotation(
            formatList({
              listData: res.data.data,
              colorState: Configs.QuotationState,
            }),
          );
        }
        dispatch(setLoading(false));
        setQuotationState(res.data.state_total);
        setRefreshing(false);
        setCurrentPage(res.data.meta.current_page);
      })
      .catch((err) => {
        if (__DEV__) {
          // console.log(err);
        }
        dispatch(setLoading(false));
        setQuotationState([]);
        setRefreshing(false);
      });
  };
  const goToDetail = (item) => {
    navigation.navigate('Report', {
      item: item,
    });
  };
  const onRefresh = () => {
    setRefreshing(true);
    handleSearch(today, today);
  };
  const onLoadMore = () => {
    if (isLoadMore && isScroll) {
      handleSearch(fromDate, toDate, keyState, name, lp, currentPage + 1, true);
    }
  };
  const filterState = (item) => {
    setStSearch(item.key);
    handleSearch(fromDate, toDate, item.key, name, lp);
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
          <Text style={styles.txtAdv}>{item.name}</Text>
          <Text style={styles.txtL}>{item.vehicle.license_plate}</Text>
          <View style={styles.customer}>
            <Text style={styles.txtName} numberOfLines={1}>
              {item.customer.name}
            </Text>
            <Text style={styles.txtModel} numberOfLines={1}>
              {item.vehicle.model.name}
            </Text>
          </View>
          <Text style={styles.txtAdv}>{item.adviser.name}</Text>
          <TouchableOpacity
            onPress={() => goToDetail(item)}
            style={styles.btnDetail}>
            <Text style={styles.txtDetail}>{t('view_quotation')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <IcQuotation fill={Colors.main} />
        <Text style={styles.txtTitle}>{t('quotation')}</Text>
      </View>
      <SearchBar
        menu={quotationFilter}
        onSearch={handleSearch}
        refresh={refreshing}
        stateFilter={stSearch}
      />
      <StateBar
        color={Configs.QuotationState}
        data={quotationState}
        onPress={filterState}
      />
      <FlatList
        data={listQuotation}
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
