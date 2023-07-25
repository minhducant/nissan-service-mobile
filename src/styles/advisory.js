import {StyleSheet} from 'react-native';
import {
  Colors,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  FontFamily,
  FontSizeNormalize,
  css,
} from '@styles/index';
export const advisoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: css.mgV10,
  },
  ScrollView: {marginRight: 5},
  txtTitle: {
    marginLeft: 10,
    fontFamily: FontFamily.nissanBold,
    fontSize: FontSizeNormalize.normal,
  },
  itemContain: {
    width: '32%',
    padding: 5,
    height: 200,
    margin: 5,
  },
  imagePlay: {width: '60%', height: '60%'},
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderWidth: 0.1,
    borderColor: Colors.txtGray,
    elevation: 3,
  },
  txtName: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
  },
  videoYt: {
    height: SCREEN_HEIGHT - 100,
    width: SCREEN_WIDTH,
  },
  videoContain: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContain: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  WebView: {width: '100%', height: '100%'},
});
