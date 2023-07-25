import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import moment from 'moment';
import normalize from 'react-native-normalize';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {IcNews} from '@common/svg/index';
import {showMessage} from '@common/index';
import {GET} from '@repository/news/index';
import SearchBar from '@pages/news/SearchBar';
import {EmptyData} from '@components/forms/index';
import {setLoading} from '@stores/config/actions';
import {ADMIN, VN_FORMAT_DATE} from '@configs/Configs';
import {Colors, FontFamily, FontSizeNormalize} from '@styles/index';

export default function News() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const today = moment().format(VN_FORMAT_DATE);
  const {accessToken} = useSelector((st) => st.auth);
  const [listNews, setListNews] = useState([]);
  const [refreshControl, setRefreshControl] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [topic, setTopic] = useState('');
  const [model, setModel] = useState('');
  const [date, setDate] = useState(today);
  const [state, setState] = useState({key: 'all', name: 'Tất cả', sequence: 1});

  useEffect(() => {
    _getListNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _getListNews = async (
    name = '',
    effective_date = '',
    type_news = '',
    category_name = '',
    page,
    loadMore = true,
  ) => {
    const params = {
      ADMIN: ADMIN,
      accessToken: accessToken,
      name: name,
      effective_date: effective_date,
      type_news: type_news,
      category: category_name,
      page: page,
    };
    dispatch(setLoading(true));
    await GET.getListNews(params)
      .then((res) => {
        if (loadMore) {
          setListNews(listNews.concat(res.data.list_data));
        } else {
          setListNews(res.data.list_data);
        }
        dispatch(setLoading(false));
        setRefreshControl(false);
        setNextPage(res.data.meta.next_page);
        if (res.data.meta.next_page === res.data.meta.current_page) {
          setIsLoadMore(false);
        } else {
          setIsLoadMore(true);
        }
      })
      .catch((err) => {
        // console.log('err', JSON.stringify(err));
        showMessage(err);
        dispatch(setLoading(false));
      });
  };

  const _onRefresh = () => {
    setRefreshControl(true);
    _getListNews('', '', '', '', 1, false);
  };

  const onEndReached = () => {
    if (isLoadMore) {
      setRefreshControl(false);
      _getListNews(topic, date, state, model, nextPage, true);
    }
  };

  const onSearch = (na, da, sta, mo) => {
    setRefreshControl(false);
    dispatch(setLoading(false));
    _getListNews(na, da, sta, mo, 1, false);
  };

  const listFooter = () => {
    return isLoadMore && <ActivityIndicator />;
  };

  const renderNewsItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.containerItem(index)}
        onPress={() => navigation.navigate('NewsDetail', {item: item})}>
        <View style={styles.txtNoHeader}>
          <Text style={styles.txtNews}>{index + 1}</Text>
        </View>
        <View style={styles.txtNameHeader('flex-start')}>
          <Text style={styles.txtNews}>{item.name}</Text>
        </View>
        <View style={styles.txtEffectiveDayHeader}>
          <Text style={styles.txtNews}>
            {moment(item.effective_date, 'YYYY-MM-DD').format('DD/MM/YYYY')}
          </Text>
        </View>
        <View style={styles.txtTypeNewsHeader}>
          <Text style={styles.txtNews}>
            {item.type_news === 'news'
              ? 'Bản tin kỹ thuật'
              : 'Tài liệu kỹ thuật'}
          </Text>
        </View>
        <View style={styles.txtModelHeader}>
          <Text style={styles.txtNews}>{item.category_id}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeaderList = () => {
    return (
      <View style={styles.titleItem}>
        <View style={styles.txtNoHeader}>
          <Text style={styles.txtHeader}>STT</Text>
        </View>
        <View style={styles.txtNameHeader('center')}>
          <Text style={styles.txtHeader}>Chủ đề</Text>
        </View>
        <View style={styles.txtEffectiveDayHeader}>
          <Text style={styles.txtHeader}>Ngày hiệu lực</Text>
        </View>
        <View style={styles.txtTypeNewsHeader}>
          <Text style={styles.txtHeader}>Loại tin</Text>
        </View>
        <View style={styles.txtModelHeader}>
          <Text style={styles.txtHeader}>Model/ Hệ thống</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <IcNews fill={Colors.main} />
        <Text style={styles.txtTitle}>Bản tin kỹ thuật</Text>
      </View>
      <SearchBar
        refreshing={refreshControl}
        onSearch={onSearch}
        name={topic}
        setName={setTopic}
        model={model}
        setModel={setModel}
        date={date}
        setDate={setDate}
        state={state}
        setState={setState}
      />
      <FlatList
        data={listNews}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderNewsItem}
        ListEmptyComponent={<EmptyData />}
        ListHeaderComponent={renderHeaderList()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={listFooter}
        onEndReached={onEndReached}
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.flatList}
        refreshControl={
          <RefreshControl
            refreshing={refreshControl}
            onRefresh={_onRefresh}
            colors={[Colors.main]}
          />
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: normalize(5),
  },
  txtTitle: {
    marginLeft: 10,
    fontFamily: FontFamily.nissanBold,
    fontSize: FontSizeNormalize.normal,
    alignSelf: 'center',
    textAlign: 'center',
  },
  containerItem: (index) => ({
    backgroundColor: index % 2 === 0 ? '#ffffff' : '#ede8e8',
    flexDirection: 'row',
    marginHorizontal: normalize(5),
    minHeight: normalize(15),
  }),
  txtHeader: {
    color: Colors.white,
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.normal,
  },
  titleItem: {
    backgroundColor: Colors.red,
    flexDirection: 'row',
    marginHorizontal: normalize(5),
    height: normalize(15),
  },
  txtNoHeader: {
    flex: 0.4,
    borderRightWidth: 1,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtNameHeader: (alignItems) => ({
    flex: 4,
    borderRightWidth: 1,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: alignItems,
    padding: normalize(5),
  }),
  txtEffectiveDayHeader: {
    flex: 1.5,
    borderRightWidth: 1,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTypeNewsHeader: {
    flex: 1.6,
    borderRightWidth: 1,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtModelHeader: {
    flex: 1.5,
    borderRightWidth: 1,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtNews: {
    color: '#000000',
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.normal,
  },
  flatList: {
    paddingBottom: normalize(30),
  },
});
