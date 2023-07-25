import React, {useState, Fragment, useEffect} from 'react';
import {
  View,
  Linking,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import normalize from 'react-native-normalize';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {showMessage} from '@common/index';
import {EmptyData} from '@components/forms/index';
import {GET} from '@repository/document/index';
import {setLoading} from '@stores/config/actions';
import SearchBar from '@pages/document/SearchBar';
import {IcPdf, IcDownload} from '@common/svg/index';
import {ADMIN, URL_PUBLIC} from '@configs/Configs';
import {Colors, FontFamily, FontSizeNormalize} from '@styles/index';

export default function Document() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {accessToken} = useSelector((st) => st.auth);
  const [listDocuments, setListDocuments] = useState([]);
  const [refreshControl, setRefreshControl] = useState(false);
  const companyId = useSelector((st) => st.auth.user.company_id.id);

  useEffect(() => {
    _getListDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _getListDocuments = async (name = '') => {
    dispatch(setLoading(true));
    await GET.getListDocuments({
      ADMIN: ADMIN,
      accessToken: accessToken,
      name: name,
    })
      .then((res) => {
        setListDocuments(res.data.list_document);
        dispatch(setLoading(false));
        setRefreshControl(false);
      })
      .catch((err) => {
        // console.log('err', JSON.stringify(err));
        showMessage(err);
        dispatch(setLoading(false));
      });
  };

  const _onRefresh = () => {
    dispatch(setLoading(true));
    setRefreshControl(true);
    _getListDocuments();
  };

  const onSearch = (name) => {
    setRefreshControl(false);
    _getListDocuments(name);
  };

  const renderFooter = () => {
    return <Fragment />;
  };

  const checkPermission = (url) => {
    Linking.openURL(`${URL_PUBLIC}${url}`);
  };

  const renderHeaderList = () => {
    return (
      <View style={styles.titleItem}>
        <View style={styles.txtNoHeader}>
          <Text style={styles.txtHeader}>STT</Text>
        </View>
        <View style={styles.txtNameHeader}>
          <Text style={styles.txtHeader}>Tên File</Text>
        </View>
        <View style={styles.txtDownloadHeader}>
          <Text style={styles.txtHeader}> </Text>
        </View>
      </View>
    );
  };

  const renderDocumentItem = ({item, index}) => {
    return (
      <View style={styles.containerItem(index)}>
        <View style={styles.txtNoHeader}>
          <Text style={styles.txtDocument}>{index + 1}</Text>
        </View>
        <View style={styles.txtName}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ViewFile', {item: item})}>
            <Text style={styles.txtDocument}>{item.name}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.txtDownloadHeader}>
          {companyId === 1 && (
            <TouchableOpacity onPress={() => checkPermission(item?.url)}>
              <IcDownload fill={Colors.main} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <IcPdf fill={Colors.main} />
        <Text style={styles.txtTitle}>Tài liệu</Text>
      </View>
      <SearchBar refreshing={refreshControl} onSearch={onSearch} />
      <FlatList
        data={listDocuments}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderDocumentItem}
        ListEmptyComponent={<EmptyData />}
        ListHeaderComponent={renderHeaderList()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        stickyHeaderIndices={[0]}
        style={styles.FlatList}
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
  titleItem: {
    backgroundColor: Colors.red,
    flexDirection: 'row',
    marginHorizontal: normalize(5),
    height: normalize(15),
  },
  txtHeader: {
    color: Colors.white,
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.normal,
  },
  txtNoHeader: {
    // height: normalize(15),
    // width: normalize(30),
    flex: 0.9,
    borderRightWidth: 1,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtNameHeader: {
    // height: normalize(15),
    // width: normalize(225),
    borderRightWidth: 1,
    flex: 8.05,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtDownloadHeader: {
    // height: normalize(15),
    borderRightWidth: 1,
    flex: 1,
    // width: normalize(30),
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerItem: (index) => ({
    backgroundColor: index % 2 === 0 ? '#ffffff' : '#ede8e8',
    flexDirection: 'row',
    marginHorizontal: normalize(5),
    height: normalize(15),
  }),
  txtDocument: {
    color: '#000000',
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.normal,
  },
  txtName: {
    borderRightWidth: 1,
    flex: 7.9,
    borderColor: Colors.white,
    justifyContent: 'center',
    paddingHorizontal: normalize(5),
  },
  FlatList: {
    marginBottom: normalize(20),
  },
});
