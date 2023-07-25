import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image as ImageReact,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import Svg, {Image} from 'react-native-svg';
import {Icon} from 'native-base';
import {captureScreen} from 'react-native-view-shot';

import {URL_PUBLIC} from '@configs/Configs';
import {LocalizationContext} from '@context/index';
import {vehicleBodyStyle as styles, css} from '@styles/index';
import {showMessage} from '@common/index';
import {setVehicle} from '@stores/appointment/actions';
const IMAGE_VEHICLE_BODY = require('@assets/images/anh_than_xe.png');
const VehicleBody = ({setIsCapture, disabled}) => {
  const {t} = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const {vehicle} = useSelector((st) => st.appointment);
  const [hidden, setHidden] = useState(false);
  const arrayErr = [
    {
      key: 0,
      name: 'Vết xước',
      img: require('@assets/icons/vet_xuoc.png'),
    },
    {
      key: 1,
      name: 'Bụi sơn',
      img: require('@assets/icons/bui_son.png'),
    },
    {
      key: 2,
      name: 'Biến màu',
      img: require('@assets/icons/bien_mau.png'),
    },
    {
      key: 3,
      name: 'Lồi lõm',
      img: require('@assets/icons/loi_lom.png'),
    },
    {
      key: 4,
      name: 'Tróc',
      img: require('@assets/icons/troc.png'),
    },
    {
      key: 5,
      name: 'Khác',
      img: require('@assets/icons/khac.png'),
    },
  ];
  const [err, setErr] = useState(arrayErr[0]);
  const [location, setLocation] = useState([]);
  const onSingleTap = (e) => {
    if (e.nativeEvent.state === State.ACTIVE) {
      const newLocation = {
        x: e.nativeEvent.x,
        y: e.nativeEvent.y,
      };
      const newArr = [...location];
      if (newArr.length === 0) {
        newArr.push({...newLocation, displayErr: err.key, img: err.img});
      }
      if (newLocation.x !== newArr[newArr.length - 1].x) {
        newArr.push({...newLocation, displayErr: err.key, img: err.img});
      }
      setLocation(newArr);
    }
  };
  const handleUndo = async () => {
    const currentLocation = await [...location];
    currentLocation.pop();
    await setLocation(currentLocation);
  };
  const handleCapture = async () => {
    await setHidden(true);
    await setIsCapture(true);
    setTimeout(() => {
      onCapture();
    }, 1000);
  };
  const onCapture = () => {
    captureScreen({
      format: 'jpg',
      quality: 1,
      result: 'data-uri',
    }).then(
      (uri) => {
        // console.log(uri);
        setHidden(false);
        setIsCapture(false);
        const newVehicle = {...vehicle, imageCar: uri.slice(23)};
        dispatch(setVehicle(newVehicle));
        showMessage('Lưu ảnh vào bộ nhớ tạm thành công!');
      },
      (error) => console.error('Lỗi hệ thống, hãy thử lại', error),
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setErr({
            key: item.key,
            name: item.name,
            img: item.img,
          });
        }}
        style={styles.itemContain}>
        <View style={styles.iconContain}>
          <ImageReact source={item.img} style={styles.icon} />
        </View>
        <Text style={styles.txtNote}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.checkOrderTab}>
      <View style={css.fx_1}>
        {!vehicle.urlImageCar && disabled ? (
          <Text style={styles.txtNoImage}>{t('no_image')}</Text>
        ) : null}
        <ImageBackground
          source={
            disabled
              ? {
                  uri: `${URL_PUBLIC}${
                    vehicle.urlImageCar
                  }?random=${Math.random().toString(36).substring(7)}`,
                }
              : vehicle.imageModel
              ? {
                  uri: `${URL_PUBLIC}${vehicle.imageModel}`,
                }
              : IMAGE_VEHICLE_BODY
          }
          resizeMode="contain"
          style={styles.bgImg}>
          {!disabled && (
            <TapGestureHandler onHandlerStateChange={onSingleTap}>
              <View style={css.fx_1}>
                <Svg width="100%" height="100%">
                  {location &&
                    location.map((item, index) => (
                      <Image
                        x={item.x}
                        y={item.y}
                        width="15"
                        height="15"
                        href={item.img}
                        key={`index ${index}`}
                      />
                    ))}
                </Svg>
              </View>
            </TapGestureHandler>
          )}
        </ImageBackground>
      </View>
      {!hidden && (
        <View style={styles.noteCon}>
          <Text style={styles.txtErr}>Lỗi</Text>
          <FlatList data={arrayErr} renderItem={renderItem} numColumns={2} />
          {!disabled && (
            <View style={styles.btnContain}>
              <View style={styles.btnReload}>
                <ImageReact source={err.img} style={styles.icon} />
              </View>
              <TouchableOpacity onPress={handleUndo} style={styles.btnReload}>
                <Icon name="undo" type="FontAwesome" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnReload}
                onPress={handleCapture}>
                <Icon name="camera" type="AntDesign" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};
export default React.memo(VehicleBody);
