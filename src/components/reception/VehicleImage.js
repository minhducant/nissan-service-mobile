import React, {useContext, useState} from 'react';
import {Image, FlatList, StyleSheet, View, Text} from 'react-native';
import {Container, Content} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from 'react-native-paper';

import {
  SCREEN_WIDTH,
  Colors,
  FontFamily,
  FontSizeNormalize,
} from '@styles/index';
import {showMessage} from '@common/index';
import {setLoading} from '@stores/config/actions';
import {LocalizationContext} from '@context/index';
import {POST} from '@repository/reception/index';
import {URL_PUBLIC} from '@configs/Configs';
import {setListImage, setListUrlImage} from '@stores/appointment/actions';

const NEW = 'new';
const DRAFT = 'draft';
export default function VehicleImage({receptionId}) {
  const {t} = useContext(LocalizationContext);
  const {state, listImageVehicle, listUrlImageVehicle} = useSelector(
    (st) => st.appointment,
  );
  const {accessToken} = useSelector((st) => st.auth);
  const dispatch = useDispatch();
  const takeAPhoto = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      includeBase64: true,
      compressImageQuality: 0.1,
    })
      .then((image) => {
        // if (__DEV__) {
        //     console.log(image.size);
        // }
        const newListImage = [
          ...listImageVehicle,
          {image: image.data, note: 'Ảnh thực tế xe'},
        ];
        dispatch(setListImage(newListImage));
      })
      .catch(() => {
        showMessage('Chụp ảnh thất bại, hãy thử lại!');
      });
  };
  const renderItem = ({item, index}) => {
    return (
      <Image
        source={{uri: `data:image/jpg;base64,${item.image}`}}
        style={styles.imageView}
      />
    );
  };
  const renderImage = ({item, index}) => {
    return (
      <Image
        source={{uri: `${URL_PUBLIC}${item.url}`}}
        style={styles.imageView}
      />
    );
  };
  const handleUpdateImage = () => {
    dispatch(setLoading(true));
    if (receptionId) {
      POST.createImageVehicle({
        accessToken,
        repairRequestId: receptionId,
        imageList: listImageVehicle,
      })
        .then((response) => {
          dispatch(setLoading(false));
          showMessage('Cập nhật thành công!');
          dispatch(setListImage([]));
          const newListUrl = [...listUrlImageVehicle];
          response.data.data.url.forEach((item) => {
            const urlImage = {url: item};
            newListUrl.push(urlImage);
          });
          dispatch(setListUrlImage(newListUrl));
        })
        .catch((err) => {
          showMessage(err);
          if (__DEV__) {
            // console.log(err);
          }
          dispatch(setLoading(false));
          dispatch(setListImage([]));
        });
    }
  };
  const renderEmpty = () => {
    return (
      state.key !== NEW && <Text style={styles.txtErr}>{t('no_image')}</Text>
    );
  };
  return (
    <Container>
      <Content>
        <FlatList
          style={{width: SCREEN_WIDTH}}
          data={listUrlImageVehicle}
          renderItem={renderImage}
          numColumns={4}
          keyExtractor={(_item, index) => index.toString()}
          ListEmptyComponent={renderEmpty}
        />
        <View style={styles.space} />
        <FlatList
          style={{width: SCREEN_WIDTH}}
          data={listImageVehicle}
          renderItem={renderItem}
          numColumns={4}
          keyExtractor={(_item, index) => index.toString()}
        />
      </Content>

      <View style={styles.btnTakePhoto}>
        {(state.key === NEW || state.key === DRAFT) && (
          <AntDesign size={40} name="camera" onPress={takeAPhoto} />
        )}
        {listImageVehicle.length > 0 && state.key !== NEW && (
          <Button
            uppercase={false}
            mode="contained"
            icon="content-save-all"
            style={styles.btnSave}
            onPress={() => handleUpdateImage()}
            color={Colors.main}
            labelStyle={{color: Colors.white}}>
            {t('update')}
          </Button>
        )}
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  imageView: {
    width: (SCREEN_WIDTH - 20) / 6,
    height: (SCREEN_WIDTH - 20) / 6,
    marginRight: 5,
    marginBottom: 5,
  },
  btnTakePhoto: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    width: (SCREEN_WIDTH - 20) / 4,
    justifyContent: 'center',
  },
  btnSave: {
    justifyContent: 'center',
    height: 40,
    marginLeft: 20,
  },
  space: {
    height: 5,
  },
  txtErr: {
    textAlign: 'center',
    fontSize: FontSizeNormalize.small,
    fontFamily: FontFamily.nissanBold,
    color: Colors.black,
  },
});
