import {StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSizeNormalize} from '@styles/index';
import css from './css';

export const vehicleHandingStyles = StyleSheet.create({
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
    paddingTop: css.mgV10,
    paddingHorizontal: css.mgH5,
    backgroundColor: Colors.lightGray,
    flex: 1,
    paddingBottom: 60,
  },
  itemContainer: {
    // flex: 1,
    backgroundColor: Colors.lightGray,
    padding: 5,
    width: '33.33%',
  },
  itemContent: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.white,
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
    flex: 1,
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
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
    flex: 1,
    backgroundColor: Colors.main,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnReception: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.main,
  },
  txtDetail: {
    color: Colors.white,
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
  },
  txtReception: {
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
  list: {height: '100%', marginBottom: 10},
});
