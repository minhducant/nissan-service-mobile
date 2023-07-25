import normalize from 'react-native-normalize';
import {StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSizeNormalize, IconSize} from '@styles/index';

export const authenticationStyles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.white,
    elevation: 0,
  },
  containerStyles: {
    height: '90%',
    width: '90%',
    borderRadius: 20,
    alignSelf: 'center',
  },
  contentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: normalize(20, 'width'),
    marginVertical: normalize(10, 'width'),
    alignSelf: 'center',
  },
  iconInput: {
    fontSize: IconSize.normal,
    color: Colors.black,
  },
  titleHeader: {
    color: Colors.black,
    fontFamily: FontFamily.nissanBold,
    fontSize: normalize(9),
    textAlign: 'center',
  },
  checkBoxCon: {
    borderWidth: 0,
  },
  iconPass: {
    fontSize: normalize(20, 'height'),
    color: Colors.black,
  },
  textInput: {
    fontFamily: FontFamily.nissanRegular,
    color: Colors.black,
    fontSize: FontSizeNormalize.normal,
    width: normalize(180, 'width'),
  },
  rememberText: {
    color: Colors.black,
    fontFamily: FontFamily.nissanBold,
    fontSize: FontSizeNormalize.small,
  },
  rememberContainer: {
    height: '40%',
    width: '100%',
    left: normalize(4, 'width'),
    top: normalize(4, 'width'),
  },
  buttonContainer: {
    alignSelf: 'center',
  },
  button: {
    width: normalize(70, 'width'),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontFamily: FontFamily.nissanBold,
    fontSize: FontSizeNormalize.normal,
  },
  contentLogo: {
    resizeMode: 'contain',
    width: '80%',
    height: '80%',
    borderRadius: 1000,
  },
  contentHeader: {
    backgroundColor: Colors.white,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 22,
  },
  contentInput: {
    justifyContent: 'center',
  },
  contentButton: {
    flex: 1.5,
  },
  content: {
    height: '100%',
    width: '70%',
    marginHorizontal: normalize(10, 'width'),
  },
  image: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: 'cover',
  },
  imgContainer: {
    width: '100%',
  },
  mainContent: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 26,
    backgroundColor: '#FFF',
    marginVertical: 2,
    overflow: 'hidden',
  },
});
