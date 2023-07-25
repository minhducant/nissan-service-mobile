import React, {useContext, useState, useRef, Suspense, lazy} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image as ImageReact,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import {
  TapGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Svg, {Image} from 'react-native-svg';

import {setShowVehicleBodyModal} from '@stores/appointment/actions';
import {SCREEN_HEIGHT, vehicleBodyStyle as styles, css} from '@styles/index';
import {ImageBackground} from 'react-native';

const IMAGE_VEHICLE_BODY = require('@assets/images/anh_than_xe.png');
const VehicleBodyModal = ({}) => {
  const dispatch = useDispatch();
  const {showVehicleModal} = useSelector((st) => st.appointment);
  const [location, setLocation] = useState([]);
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
  const hideModal = () => dispatch(setShowVehicleBodyModal(false));
  const onSingleTap = (e) => {
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
    <Modal
      transparent={true}
      supportedOrientations={['landscape-left', 'landscape-right', 'landscape']}
      animationType="none"
      onRequestClose={() => hideModal()}
      visible={showVehicleModal}
      onDismiss={hideModal}>
      <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
        <TouchableOpacity onPress={() => hideModal()}>
          <AntDesign name="close" size={30} color="red" />
        </TouchableOpacity>
        <GestureHandlerRootView
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <ImageBackground
            source={IMAGE_VEHICLE_BODY}
            style={styles.bgImage}
            resizeMode="contain">
            <TapGestureHandler
              numberOfTaps={2}
              onHandlerStateChange={onSingleTap}>
              <View style={[css.fx_1, {borderWidth: 1}]}>
                <Svg width="100%" height="100%">
                  {location &&
                    location.map((item, index) => (
                      <Image
                        x={item.x}
                        y={item.y}
                        width="10"
                        height="10"
                        href={item.img}
                        // eslint-disable-next-line react/no-array-index-key
                        key={`index ${index}`}
                      />
                    ))}
                </Svg>
              </View>
            </TapGestureHandler>
          </ImageBackground>
          <View style={styles.noteCon}>
            <Text style={styles.txtErr}>Lỗi</Text>
            <FlatList data={arrayErr} renderItem={renderItem} numColumns={2} />
          </View>
        </GestureHandlerRootView>
      </View>
    </Modal>
  );
};
export default React.memo(VehicleBodyModal);
