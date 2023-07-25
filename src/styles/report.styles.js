import normalize from 'react-native-normalize';
import {StyleSheet} from 'react-native';
import {
  Colors,
  FontFamily,
  FontSizeNormalize,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '@styles/index';
import css from './css';

export const reportStyles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: Colors.white,
  },
  legendContain: {flexDirection: 'row', alignItems: 'center'},
  legendBox: (color) => ({
    height: 20,
    width: 20,
    backgroundColor: color,
  }),
  itemLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
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
  btnTitle: (isSelect) => ({
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.main,
    paddingVertical: 10,
    backgroundColor: isSelect ? Colors.main : Colors.white,
  }),
  txtBtn: (isSelect) => ({
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    color: isSelect ? Colors.white : Colors.black,
    textAlign: 'center',
  }),
  titleContain: {
    flexDirection: 'row',
  },
  btnTitleChild: (isSelect) => ({
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.white,
    paddingVertical: 10,
    backgroundColor: isSelect ? Colors.white : Colors.heightGray,
  }),
  txtBtnChild: (isSelect) => ({
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    color: isSelect ? Colors.main : Colors.white,
    textAlign: 'center',
  }),
  checkOrderTabCon: {width: SCREEN_WIDTH, flex: 1},
  tabContent: {
    padding: 10,
    width: SCREEN_WIDTH,
  },
  headerItemCon: {
    flex: 1,
    paddingVertical: normalize(12, 'height'),
    paddingHorizontal: normalize(5, 'width'),
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // height: normalize(50, 'height'),
    borderColor: Colors.white,
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: Colors.gray,
    overflow: 'hidden',
  },
  indicator: {
    position: 'absolute',
    height: 100,
    backgroundColor: Colors.main,
    zIndex: -1,
  },
  indicatorAddress: {
    position: 'absolute',
    height: 5,
    backgroundColor: Colors.main,
    zIndex: -1,
    top: 35,
  },
  containerAddress: {
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  txtTab: {
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
  },
  screenContain: {height: '100%'},
  containerScreen: {
    backgroundColor: Colors.white,
  },
  content: {padding: 10},
  icon: {color: 'white', width: 30, height: 30},
  btnSearch: {
    backgroundColor: Colors.main,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 5,
    borderRadius: 3,
    marginHorizontal: normalize(2, 'width'),
  },
  txtLegend: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    marginLeft: 10,
  },
  chartContain: {
    alignItems: 'center',
    flex: 1,
  },
  contain: {marginBottom: 200, flex: 1},
});
