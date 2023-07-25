import React from 'react';
import moment from 'moment';
import normalize from 'react-native-normalize';
import {
  View,
  StyleSheet,
  Text,
  Linking,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

import {Header} from '@components/headers/index';
import {IcDownload} from '@common/svg/index';
import {URL_PUBLIC} from '@configs/Configs';
import {Colors, FontFamily, FontSizeNormalize} from '@styles/index';

export default function NewsDetail({route}) {
  const {item} = route.params;
  const file = Object.assign({}, item.document_file);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={item.name} hasAction={false} />
      <ScrollView style={styles.ScrollView}>
        <ItemLine
          title={'Loại tin'}
          value={
            item.type_news === 'news' ? 'Bản tin kỹ thuật' : 'Tài liệu kỹ thuật'
          }
          required
        />
        <ItemLine title={'Model/ Hệ thống'} value={item.category_id} required />
        <ItemLine
          title={'Ngày hiệu lực'}
          value={moment(item.effective_date, 'YYYY-MM-DD').format('DD/MM/YYYY')}
          file={file}
          required
        />
        <ItemLine
          title={'Tệp tài liệu'}
          value={item.document_name}
          required
          file={file}
        />
        <View style={styles.viewItem}>
          <Text style={styles.txtActive}>Kích hoạt</Text>
          <View style={styles.checkbox}>
            <CheckBox
              checked={item.active}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              containerStyle={styles.IcCheckbox}
              uncheckedIcon="checkbox-blank-outline"
              checkedColor={Colors.main}
              disabled={true}
            />
          </View>
        </View>
        {item.type_news === 'news' ? (
          <>
            <ItemLine title={'Gói dịch vụ'} value={item.news_tsb} required />
            <ItemLine
              title={'Nội dung'}
              value={item.content.replace(/<[^>]+>/g, '')}
              required
            />
          </>
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export function ItemLine({title, value, required = false, file}) {
  const navigation = useNavigation();
  const checkPermission = (url) => {
    Linking.openURL(`${URL_PUBLIC}${url}`);
  };
  const detailFile = (url, name) => {
    if (name.includes('zip')) {
      Linking.openURL(`${URL_PUBLIC}${url.document_link}`);
    } else if (name.includes('pdf')) {
      navigation.navigate('ViewFile', {item: url});
    } else {
      navigation.navigate('ViewDocsFile', {item: url});
    }
  };
  return (
    <View style={styles.viewItem}>
      <Text style={styles.txtTitleItem}>
        {title}
        {required && <Text style={styles.required}>(*)</Text>}
      </Text>
      {title === 'Tệp tài liệu' ? (
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => detailFile(file[0], value)}>
          <Text style={styles.txTouchableOpacity}>{value}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.content}>{value}</Text>
      )}
      <View style={styles.download}>
        {title === 'Tệp tài liệu' ? (
          <TouchableOpacity
            onPress={() => checkPermission(file[0].document_link)}>
            <IcDownload fill={Colors.main} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  ScrollView: {
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(10),
  },
  viewItem: {flexDirection: 'row', marginBottom: normalize(5)},
  txtTitleItem: {
    fontFamily: FontFamily.nissanBold,
    fontSize: FontSizeNormalize.normal,
    flex: 2,
  },
  content: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.normal,
    flex: 8,
    textAlign: 'justify',
    marginRight: normalize(10),
  },
  required: {color: Colors.main},
  touchableOpacity: {flex: 8},
  txTouchableOpacity: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.normal,
    color: '#007A77',
  },
  checkbox: {flex: 8},
  IcCheckbox: {padding: 0, marginRight: normalize(5)},
  txtActive: {
    marginTop: normalize(3),
    fontFamily: FontFamily.nissanBold,
    fontSize: FontSizeNormalize.normal,
    flex: 2,
  },
  WebView: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    backgroundColor: 'red',
  },
});
