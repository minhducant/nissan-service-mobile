import React, {useState, useContext} from 'react';
import {Container} from 'native-base';
import {useDispatch} from 'react-redux';
import Svg, {Line} from 'react-native-svg';
import {captureScreen} from 'react-native-view-shot';
import {useNavigation} from '@react-navigation/native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {StyleSheet, View, Text, TouchableOpacity, Animated} from 'react-native';

import {showMessage} from '@common/index';
import {Header} from '@components/headers/index';
import {
  setCustomerSignature,
  setAdvisorSignature,
} from '@stores/appointment/actions';
import {LocalizationContext} from '@context/index';
import {
  css,
  Colors,
  FontFamily,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  FontSizeNormalize,
} from '@styles/index';

export default function SignatureQuotation({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const signatureType = route.params.type;
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
          showMessage('Cập nhật chữ kí thành công!');
          setIsCapture(false);
          navigation.goBack();
          signatureType === 'customer'
            ? dispatch(setCustomerSignature(uri.slice(23)))
            : dispatch(setAdvisorSignature(uri.slice(23)));
        })
        .catch((error) => {
          console.error('Lỗi. Hãy thử lại!', error);
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
      {!isCapture && (
        <Header
          title={
            signatureType === 'customer'
              ? 'Chữ ký xác nhận báo giá'
              : 'Chữ ký cố vấn dịch vụ'
          }
          hasAction={false}
        />
      )}
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
          <TouchableOpacity onPress={onCapture} style={styles.btnCancel}>
            <Text style={styles.txtBtn}>{t('save')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearSign} style={styles.btnSave}>
            <Text style={styles.txtBtn}>{t('clear')}</Text>
          </TouchableOpacity>
        </View>
      )}
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
    width: 100,
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
