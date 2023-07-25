import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, Text, View, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

import {LocalizationContext} from '@context/index';
import Config from '@configs/Configs';
import {setLoading} from '@stores/config/actions';
import {Colors, css} from '@styles/index';
import {
  IcAppointment,
  IcQuotation,
  IcProgress,
  IcReception,
  IcVehicleHanding,
} from '@common/svg/index';
import {styles} from '@styles/home';
import {GET} from '@repository/config/index';
import {showMessage} from '@common/index';
export default function HomeScreen() {
  const dispatch = useDispatch();
  const {accessToken} = useSelector((st) => st.auth);
  const [appointment, setAppointment] = useState([]);
  const [reception, setReception] = useState([]);
  const [quotation, setQuotation] = useState([]);
  const [progress, setProgress] = useState([]);
  const [vehicleHanding, setVehicleHanding] = useState([]);
  const {t} = useContext(LocalizationContext);

  useEffect(() => {
    getStateAndQty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getStateAndQty = () => {
    GET.getStateAndQty(accessToken)
      .then((res) => {
        // console.log('getStateAndQty', res);
        setAppointment(res.data.appointment_schedule);
        setReception(res.data.reception);
        setQuotation(res.data.quotation);
        setProgress(res.data.progress);
        setVehicleHanding(res.data.vehicle_handing);
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        showMessage(err);
        if (__DEV__) {
          // console.log('err', err);
        }
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftView}>
          {/* appointment_schedule */}
          <View style={styles.stateContain}>
            <View style={styles.title}>
              <IcAppointment fill={Colors.main} />
              <Text style={styles.txtTitle}>{t('appointment_schedule')}</Text>
            </View>
            <StateBar data={appointment} />
          </View>
          {/* quotation */}
          <View style={styles.stateContain}>
            <View style={styles.title}>
              <IcQuotation fill={Colors.main} />
              <Text style={styles.txtTitle}>{t('quotation')}</Text>
            </View>
            <StateBar data={quotation} />
          </View>
          {/* progress */}
          <View style={styles.stateContain}>
            <View style={styles.title}>
              <IcProgress fill={Colors.main} />
              <Text style={styles.txtTitle}>{t('progress')}</Text>
            </View>
            <StateBar data={progress} />
          </View>
        </View>
      </View>
      <View style={styles.rightView}>
        <View style={styles.date}>
          <IcAppointment fill={Colors.txtGray} />
          <Text style={styles.txtDate}>
            {moment().format(Config.VN_FORMAT_DATE)}
          </Text>
        </View>
        <TabView data={reception} title={'reception'} />
        <TabView data={vehicleHanding} title={'vehicle_handing'} />
      </View>
    </SafeAreaView>
  );
}
const StateBar = ({data}) => {
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.txtState}>{item.name}</Text>
        <View style={styles.valueContain}>
          <View style={styles.value}>
            <Text style={styles.txtValue}>{item.total}</Text>
          </View>
        </View>
      </View>
    );
  };
  const renderSeparator = () => <View style={styles.separator} />;
  return (
    <FlatList
      ItemSeparatorComponent={renderSeparator}
      horizontal
      data={data}
      renderItem={renderItem}
      style={styles.list}
      keyExtractor={(_item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
};
const TabView = ({data, title}) => {
  const {t} = useContext(LocalizationContext);
  const renderItem = ({item, index}) => (
    <View style={styles.itemContain}>
      <Text style={css.fx_1}>{item.name}</Text>
      <View style={styles.value}>
        <Text>{item.total}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.receptionContain}>
      <View style={styles.tabTitle}>
        {title === 'reception' && <IcReception fill={Colors.main} />}
        {title === 'vehicle_handing' && <IcVehicleHanding fill={Colors.main} />}
        <Text style={styles.txtTitle}>{t(title)}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_item, index) => index.toString()}
        style={css.fx_1}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
