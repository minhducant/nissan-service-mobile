// Lượt xe trung bình
import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useDispatch} from 'react-redux';

import {
  SCREEN_WIDTH,
  Colors,
  reportStyles as styles,
  SCREEN_HEIGHT,
} from '@styles/index';
import {FilterBar} from '@components/forms/index';
import {setLoading} from '@stores/config/actions';
import {GET} from '@repository/report/index';
import {EmptyData} from '@components/forms/index';

const AverageCar = () => {
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
  const search = (type, startDate, endDate, companyId) => {
    dispatch(setLoading(true));
    GET.getListAverageCar({startDate, endDate, companyId})
      .then((res) => {
        if (
          res.data.list_order_date.length > 0 &&
          res.data.list_amounts.length > 0
        ) {
          const dataFetch = {...data};
          dataFetch.labels = res.data.list_order_date;
          dataFetch.datasets[0].data = res.data.list_amounts;
          setData(dataFetch);
          setEmpty(false);
        } else {
          setEmpty(true);
        }

        dispatch(setLoading(false));
      })
      .catch((err) => {
        setEmpty(true);
        dispatch(setLoading(false));
        console.log('err', JSON.stringify(err));
      });
  };
  return (
    <View style={styles.screen}>
      <FilterBar search={search} isDate={false} />
      <ScrollView style={{marginBottom: 200}}>
        {empty ? (
          <EmptyData />
        ) : (
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
        )}
      </ScrollView>
    </View>
  );
};
export default AverageCar;
