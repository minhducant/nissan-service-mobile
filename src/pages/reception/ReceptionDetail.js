import React, {useContext, useEffect, lazy, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Spinner} from 'native-base';

import {receptionDetailStyles as styles} from '@styles/index';
import {Header} from '@components/headers/index';
import {LocalizationContext} from '@context/index';
import {setLoading} from '@stores/config/actions';
import {SCREEN_WIDTH, Colors} from '@styles/index';
import {ScrollView} from 'react-native';
import {
  TableCheckOrder,
  VehicleBody,
  VehicleImage,
} from '@components/reception/index';
const ReceptionDetail = () => {
  const dispatch = useDispatch();
  const {t} = useContext(LocalizationContext);
  const {checkListTypes} = useSelector((st) => st.conf);
  const {checkList} = useSelector((st) => st.appointment);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    dispatch(setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('reception_detail')} />
      <ScrollView style={{flex: 1}}>
        {checkListTypes.map((item, index) => {
          return (
            <View key={index.toString()}>
              {item.key !== 'image_car' && item.key !== 'actual_image_ids' && (
                <>
                  <Text>{item.name}</Text>
                  <TableCheckOrder
                    data={checkList[item.key]}
                    section={item.key}
                    numColumns={2}
                    disabled={disabled}
                    hasTitle={false}
                  />
                </>
              )}
            </View>
          );
        })}
        <VehicleBody />
        <VehicleImage />
      </ScrollView>
    </SafeAreaView>
  );
};
export default ReceptionDetail;
