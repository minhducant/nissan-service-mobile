import React, {useContext, useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

import {css} from '@styles/index';
import {InputGrey} from '@components/forms/index';
import {LocalizationContext} from '@context/index';
import {receptionStyles as styles} from '@styles/index';
import {POST} from '@repository/reception/index';
import {setLoading} from '@stores/config/actions';
import {showMessage} from '@common/index';
import {IcSearch, IcScan} from '@common/svg/index';
import {setVehicle} from '@stores/appointment/actions';

const ScannerLicencePlate = ({onPress, disabled}) => {
  const {t} = useContext(LocalizationContext);
  const {vehicle} = useSelector((st) => st.appointment);
  const dispatch = useDispatch();
  //   const {vehicle, state} = useSelector((st) => st.appointment);
  const [scannerLicensePlate, setScannerLicensePlate] = useState('');

  const takeAPhoto = async () => {
    dispatch(setLoading(true));
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: false,
      includeBase64: true,
    })
      .then((image) => {
        POST.getLicensePlates({image: image.data})
          .then((res) => {
            if (!res) {
              showMessage('Không nhận diện được biển số xe, vui lòng thử lại!');
            } else {
              setScannerLicensePlate(res.data);
              const newVehicle = {
                ...vehicle,
                licensePlate: res.data,
              };
              dispatch(setVehicle(newVehicle));
            }
            dispatch(setLoading(false));
          })
          .catch((err) => {
            showMessage('Không nhận diện được biển số xe, vui lòng thử lại!');
            if (__DEV__) {
              // console.log(`In dev mode err ${err}`);
            }
            dispatch(setLoading(false));
          });
      })
      .catch(() => {
        showMessage('Không nhận diện được biển số xe, vui lòng thử lại!');
        dispatch(setLoading(false));
      });
  };
  const requireView = () => {
    return <Text style={styles.txtRequire}>*</Text>;
  };
  return (
    <View style={styles.scanContain}>
      <View style={styles.licensePlateContainer}>
        <View style={styles.licensePlateCon}>
          <Text style={{...css.txtBlackColor}}>
            {t('licence_plate')} {requireView()}
          </Text>
        </View>
        <View style={styles.inputGreyCon}>
          <InputGrey
            value={scannerLicensePlate}
            setValue={setScannerLicensePlate}
            placeholder={t('license_plate')}
            // disabled={state.key === 'handed'}
            isUppercase={true}
            disabled={disabled}
          />
        </View>
      </View>
      <View style={{...css.fdR}}>
        <TouchableOpacity
          disabled={disabled}
          activeOpacity={0.7}
          onPress={takeAPhoto}
          style={styles.scannerBtn}>
          <IcScan />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          activeOpacity={0.7}
          onPress={() => onPress(scannerLicensePlate)}
          style={styles.scannerBtn}>
          <IcSearch />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(ScannerLicencePlate);
