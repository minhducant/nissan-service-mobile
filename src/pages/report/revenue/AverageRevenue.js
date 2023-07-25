import React, {useContext, useState, useRef, useCallback} from 'react';
import {View, Text, TouchableOpacity, Animated, ScrollView} from 'react-native';
import axios from 'axios';
import {LineChart} from 'react-native-chart-kit';
import {useDispatch} from 'react-redux';

import {
  SCREEN_WIDTH,
  Colors,
  reportStyles as styles,
  SCREEN_HEIGHT,
  css,
} from '@styles/index';
import {FilterBar} from '@components/forms/index';
import {setLoading} from '@stores/config/actions';
import {GET} from '@repository/report/index';
import {EmptyData} from '@components/forms/index';

const AverageRevenue = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    labels: ['0'],
    datasets: [
      {
        data: [0],
        color: (opacity = 1) => Colors.main, // optional
        strokeWidth: 1, // optional
      },
    ],
  });
  const [empty, setEmpty] = useState(false);
  const search = (type, startDate, endDate, company) => {
    dispatch(setLoading(true));
    GET.getListAverage({startDate, endDate, companyId: company})
      .then((res) => {
        // console.log(JSON.stringify(res));
        if (
          res.data.list_date_order.length > 0 &&
          res.data.list_amounts.length > 0
        ) {
          const dataFetch = {...data};
          dataFetch.labels = res.data.list_date_order;
          dataFetch.datasets[0].data = res.data.list_amounts;
          setData(dataFetch);
          setEmpty(false);
        } else {
          setEmpty(true);
        }
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        // console.log('err', JSON.stringify(err));
      });
  };
  return (
    <View style={styles.screen}>
      <FilterBar search={search} isDate={false} />
      {empty ? (
        <EmptyData />
      ) : (
        <ScrollView style={styles.contain}>
          <Text style={styles.txtLegend}>Đơn vị x 1.000.000(VND)</Text>
          <LineChart
            data={data}
            width={SCREEN_WIDTH - 240}
            height={(3 * SCREEN_HEIGHT) / 4}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientFromOpacity: 1,
              backgroundGradientTo: '#fff',
              backgroundGradientToOpacity: 0.5,
              color: (opacity = 1) => Colors.black,
              barPercentage: 0.5,
              useShadowColorFromDataset: false, // optional
              fillShadowGradient: Colors.main,
            }}
            fromZero
            getDotColor={() => Colors.main}
          />
        </ScrollView>
      )}
    </View>
  );
};
export default AverageRevenue;
