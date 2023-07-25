import React, {
  useState,
  useContext,
  // , useEffect
} from 'react';
import {
  StyleSheet,
  View,
  // Dimensions,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Container} from 'native-base';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Svg, {Line} from 'react-native-svg';
// import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {captureScreen} from 'react-native-view-shot';

import {showMessage} from '@common/index';
import {Header} from '@components/headers/index';
import {LocalizationContext} from '@context/index';
import {
  Colors,
  FontFamily,
  FontSizeNormalize,
  css,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '@styles/index';
import {setCustomer} from '@stores/appointment/actions';
import {PUT} from '@repository/reception/index';
import {PUT as handedPut} from '@repository/vehicle_handing/index';
import {setLoading} from '@stores/config/actions';

export default function SignatureScreen({route}) {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const {customer, state} = useSelector((st) => st.appointment);
  const {t} = useContext(LocalizationContext);
  const [location, setLocation] = useState([]);
  const [isCapture, setIsCapture] = useState(false);

  const onCapture = () => {
    setIsCapture(true);
    setTimeout(() => {
      captureScreen({
        format: 'jpg',
        quality: 1.0,
        result: 'data-uri',
      })
        .then((uri) => {
          if (!route?.params?.receptionId) {
            const newCustomer = {
              ...customer,
              imageSignature: uri.slice(23),
            };
            showMessage('Cập nhật chữ kí thành công!');
            dispatch(setCustomer(newCustomer));
          } else {
            if (state.key === 'draft') {
              dispatch(setLoading(true));
              PUT.updateSignature({
                receptionId: route.params.receptionId,
                signatureReceived: uri.slice(23),
              })
                .then((res) => {
                  dispatch(setLoading(false));
                  showMessage('Cập nhật chữ kí thành công!');
                  const newCustomer = {
                    ...customer,
                    urlImageSignatureReceive: res.data.img_link,
                  };
                  if (__DEV__) {
                    console.log(res);
                  }
                  dispatch(setCustomer(newCustomer));
                })
                .catch((err) => {
                  dispatch(setLoading(false));
                  showMessage(err);
                });
            }
            if (state.key === 'handing') {
              dispatch(setLoading(true));

              handedPut
                .updateSignature({
                  receptionId: route.params.receptionId,
                  signatureHanded: uri.slice(23),
                })
                .then((res) => {
                  dispatch(setLoading(false));
                  const newCustomer = {
                    ...customer,
                    urlImageSignatureHanding: res.data.img_link,
                  };
                  if (__DEV__) {
                    console.log(res);
                  }
                  showMessage('Cập nhật chữ kí thành công!');
                  dispatch(setCustomer(newCustomer));
                })
                .catch((err) => {
                  dispatch(setLoading(false));
                  showMessage(err);
                });
            }
          }
          setIsCapture(false);
          // navigation.goBack();
        })
        .catch((error) => {
          console.error('Lỗi. hãy thử lại!', error);
          setIsCapture(false);
        });
    }, 1000);
  };
  const _touchX = new Animated.Value(0);
  const _touchY = new Animated.Value(0);
  const clearSign = () => {
    setLocation([]);
  };
  return (
    <Container>
      {!isCapture && <Header title={t('signature')} hasAction={false} />}
      <View style={css.fx_1}>
        <PanGestureHandler
          onGestureEvent={(e) => {
            const newLocation = {
              x: e.nativeEvent.x,
              y: e.nativeEvent.y,
              transX: e.nativeEvent.translationX,
            };
            setLocation([...location, newLocation]);
          }}>
          <Animated.View style={styles.container}>
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      translateY: Animated.add(
                        _touchY,
                        new Animated.Value(-(SCREEN_HEIGHT / 2.3)),
                      ),
                    },
                    {
                      translateX: Animated.add(
                        _touchX,
                        new Animated.Value(-(SCREEN_WIDTH / 100)),
                      ),
                    },
                  ],
                },
              ]}
            />
            <Svg width="100%" height="100%">
              {location &&
                location.map((item, index) => (
                  <Line
                    x1={
                      location[location.indexOf(item) - 1]
                        ? location[location.indexOf(item)].transX === 0
                          ? location[location.indexOf(item)].x
                          : location[location.indexOf(item) - 1].x
                        : location[location.indexOf(item)].x
                    }
                    y1={
                      location[location.indexOf(item) - 1]
                        ? location[location.indexOf(item)].transX === 0
                          ? location[location.indexOf(item)].y
                          : location[location.indexOf(item) - 1].y
                        : location[location.indexOf(item)].y
                    }
                    x2={location[location.indexOf(item)].x}
                    y2={location[location.indexOf(item)].y}
                    stroke="black"
                    strokeWidth="3"
                    key={`sign ${index}`}
                  />
                ))}
            </Svg>
          </Animated.View>
        </PanGestureHandler>
      </View>
      {!isCapture && (
        <View style={styles.btnCon}>
          <TouchableOpacity onPress={clearSign} style={styles.btnCancel}>
            <Text style={styles.txtBtn}>{t('clear')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCapture} style={styles.btnSave}>
            <Text style={styles.txtBtn}>{t('save')}</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* {isShowPreview && (
                <View style={styles.imagePreview}>
                    <Image
                        source={{uri: imageRelease || null}}
                        style={styles.imageCon}
                    />
                </View>
            )} */}
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
  },
  btnSave: {
    height: 40,
    width: 70,
    backgroundColor: Colors.main,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  btnCancel: {
    height: 40,
    width: 100,
    backgroundColor: Colors.main,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  txtBtn: {
    color: Colors.white,
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.normal,
  },
  btnCon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 0.5,
    paddingVertical: 10,
    borderTopColor: Colors.lightGray,
  },
  imagePreview: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    borderColor: Colors.lightGray,
    borderWidth: 0.5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  imageCon: {
    width: 320,
    height: 180,
  },
});
