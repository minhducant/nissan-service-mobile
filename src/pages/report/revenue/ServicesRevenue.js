// Doanh thu dịch vụ
import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {StackedBarChart} from 'react-native-chart-kit';
import {FilterBar} from '@components/forms/index';
import {useDispatch} from 'react-redux';

import {
  SCREEN_WIDTH,
  reportStyles as styles,
  SCREEN_HEIGHT,
  FontFamily,
  Colors,
} from '@styles/index';
import {setLoading} from '@stores/config/actions';
import {EmptyData} from '@components/forms/index';

import {GET} from '@repository/report/index';
export default function ServicesRevenue() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    labels: [],
    legend: [],
    data: [],
    barColors: ['#6BB6B1', '#FF7500'],
  });
  const [empty, setEmpty] = useState(false);
  const search = (type, startDate, endDate, company) => {
    dispatch(setLoading(true));
    GET.getListServices({startDate, endDate, type, companyId: company})
      .then((res) => {
        // console.log('TCL: search -> res', res);
        if (
          res.data.list_amounts.length > 0 &&
          res.data.list_date_order.length > 0
        ) {
          const dataFetch = {...data};
          dataFetch.labels = res.data.list_date_order;
          dataFetch.legend = res.data.legend;
          dataFetch.data = res.data.list_amounts;
          setData(dataFetch);
          setEmpty(false);
        } else {
          setEmpty(true);
        }
        dispatch(setLoading(false));
      })
      .catch((err) => {
        // console.log('err', JSON.stringify(err));
        dispatch(setLoading(false));
      });
  };
  return (
    <View
      style={{
        width: SCREEN_WIDTH - 220,
        flex: 1,
      }}>
      <View style={{marginVertical: 10}}>
        <FilterBar search={search} />
      </View>
      <ScrollView style={{marginBottom: 200}}>
        <Text style={styles.txtLegend}>Đơn vị x 1.000.000(VND)</Text>
        {empty ? (
          <EmptyData />
        ) : (
          <StackedBarChart
            data={data}
            width={SCREEN_WIDTH - 240}
            height={(2.8 * SCREEN_HEIGHT) / 4}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => 'black',
              labelColor: (opacity = 1) => 'black',
              barPercentage: data.labels.length < 13 ? 0.7 : 0.5,
              propsForVerticalLabels: {
                fontSize: 11,
                rotation: data.labels.length < 13 ? 0 : 80,
                fill: '#000',
                fontFamily: FontFamily.nissanRegular,
              },
              propsForHorizontalLabels: {
                fill: '#000',
                fontFamily: FontFamily.nissanRegular,
              },
              propsForLabels: {
                fill: '#000',
                fontFamily: FontFamily.nissanRegular,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              alignItems: 'center',
            }}
            xLabelsOffset={10}
            // hideLegend
          />
        )}
      </ScrollView>
    </View>
  );
}
