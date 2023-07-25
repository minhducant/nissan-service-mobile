import normalize from 'react-native-normalize';
import {StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSizeNormalize, css} from '@styles/index';

export const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'row'},
  content: {
    flex: 3,
    backgroundColor: Colors.lightGray,
    paddingVertical: css.mgV20,
  },
  leftView: {
    flex: 1,
    marginLeft: css.mgH5,
    marginTop: 40,
  },
  rightView: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: css.mgH10,
    paddingVertical: css.mgV20,
  },
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
  itemContainer: {
    width: 100,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.gray,
    backgroundColor: Colors.white,
  },
  separator: {
    width: 10,
  },
  txtState: {
    alignSelf: 'center',
    flex: 0.7,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginHorizontal: 5,
  },
  valueContain: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    width: normalize(40, 'height'),
    height: normalize(40, 'height'),
    borderRadius: normalize(20, 'height'),
    backgroundColor: Colors.lightGray,
    shadowColor: Colors.gray,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtValue: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.xSmall,
    color: Colors.txtGray,
  },
  stateContain: {
    // flex: 1,
    justifyContent: 'center',
    height: '31%',
    width: '100%',
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: css.mgV10,
  },
  txtDate: {
    marginLeft: 10,
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    color: Colors.txtGray,
  },
  receptionContain: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    marginBottom: css.mgV30,
    borderRadius: 20,
    padding: css.mgV10,
  },
  itemContain: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: css.mgV10,
    paddingHorizontal: css.mgH10,
  },
  tabTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
  },
  list: {flex: 1, paddingVertical: 15},
});
