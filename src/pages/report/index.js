import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import ServicesChart from '@pages/report/services/ServicesChart';
import RevenueChart from '@pages/report/revenue/RevenueChart';
import AppointmentChart from './AppointmentChart';
import {reportMenu} from '@data/index';
import {Colors, reportStyles as styles} from '@styles/index';
import {IcReport} from '@common/svg/index';
import {LocalizationContext} from '@context/index';
import {GET} from '@repository/report/index';
import {setListCompany} from '@stores/config/actions';
import {useDispatch} from 'react-redux';
export default function ReportScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    GET.getListCompany()
      .then((res) => {
        dispatch(setListCompany(res.data.list_company));
      })
      .catch((err) => {
        console.log('err company', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigation = useNavigation();
  const {t} = useContext(LocalizationContext);
  const [listTitle, setListTitle] = useState(reportMenu);
  const selectChart = (item, index) => {
    let newList = [...listTitle];
    newList.forEach((it, idx) => {
      if (idx === index) {
        newList[idx].isSelect = true;
      } else {
        newList[idx].isSelect = false;
      }
    });
    setListTitle(newList);
    navigation.navigate(item.key);
  };
  return (
    <View style={styles.containerScreen}>
      <View style={styles.content}>
        <View style={styles.title}>
          <IcReport fill={Colors.main} />
          <Text style={styles.txtTitle}>{t('report')}</Text>
        </View>
        <View style={styles.titleContain}>
          {listTitle.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => selectChart(item, index)}
                key={index.toString()}
                style={styles.btnTitle(item.isSelect)}>
                <Text style={styles.txtBtn(item.isSelect)}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.screenContain}>
          <ScreenContainer />
        </View>
      </View>
    </View>
  );
}
const Stack = createStackNavigator();
const ScreenContainer = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ServicesChart" component={ServicesChart} />
      <Stack.Screen name="RevenueChart" component={RevenueChart} />
      <Stack.Screen name="AppointmentChart" component={AppointmentChart} />
    </Stack.Navigator>
  );
};
