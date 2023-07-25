import normalize from 'react-native-normalize';
import {StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSizeNormalize} from '@styles/index';
import css from './css';

export const quotationStyles = StyleSheet.create({
  iconReload: {alignSelf: 'center', flex: 1},
  list: {flex: 1, marginBottom: 60},
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: css.mgV10,
  },
  txtTitle: {
    marginLeft: 10,
    fontFamily: FontFamily.nissanBold,
    fontSize: FontSizeNormalize.normal,
  },
  container: {
    paddingVertical: css.mgV10,
    paddingHorizontal: css.mgH5,
    backgroundColor: Colors.lightGray,
    flex: 1,
  },
  itemContainer: {
    // flex: 1,
    padding: 5,
    width: '33.33%',
  },
  itemContent: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 0.5,
  },
  dateView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  txtDate: {
    flex: 1,
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
  },
  customer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  txtName: {
    flex: 2,
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    marginRight: 10,
  },
  txtModel: {
    flex: 1,
    textAlign: 'right',
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
  },
  txtL: {
    textAlign: 'center',
    marginVertical: 5,
    fontFamily: FontFamily.nissanBold,
    fontSize: FontSizeNormalize.normal,
  },
  btnDetail: {
    borderColor: Colors.main,
    borderWidth: 1,
    backgroundColor: Colors.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },
  txtDetail: {
    color: Colors.main,
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
  },

  state: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  txtAdv: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    marginVertical: 5,
  },
  content: {
    flex: 1,
    paddingVertical: 10,
  },
  errorText: {
    fontFamily: FontFamily.nissanBold,
    color: Colors.black,
    fontSize: FontSizeNormalize.normal,
  },
  containerReport: {flex: 1},
  contentWebView: {width: '100%', height: '100%'},
});
