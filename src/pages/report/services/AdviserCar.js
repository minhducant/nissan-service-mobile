// Lượt dịch vụ theo CVDC
import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {useDispatch} from 'react-redux';

import {
  SCREEN_WIDTH,
  Colors,
  reportStyles as styles,
  SCREEN_HEIGHT,
} from '@styles/index';
import {setLoading} from '@stores/config/actions';
import {FilterBar} from '@components/forms/index';
import {GET} from '@repository/report/index';
import {EmptyData} from '@components/forms/index';

const AdviserCar = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [empty, setEmpty] = useState(false);
  const search = (type, startDate, endDate, companyId) => {
    dispatch(setLoading(true));
    GET.getListAdviserCar({startDate, endDate, type, companyId})
      .then((res) => {
        if (
          res.data.list_advisers.length > 0 &&
          res.data.list_amounts.length > 0
        ) {
          const dataFetch = {...data};
          dataFetch.labels = res.data.list_advisers;
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
        setEmpty(true);
        // console.log('err', JSON.stringify(err));
      });
  };
  return (
    <View style={styles.screen}>
      <FilterBar search={search} isMonth={false} />
      <ScrollView style={styles.contain}>
        {empty ? (
          <EmptyData />
        ) : (
          <BarChart
            data={data}
            width={SCREEN_WIDTH - 240}
            height={(3 * SCREEN_HEIGHT) / 4}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => Colors.main,
              labelColor: (opacity = 1) => 'black',
              // style: {
              //   borderRadius: 16,
              // },
              fillShadowGradient: Colors.main,
              fillShadowGradientOpacity: 1,
              barPercentage: data.labels.length < 15 ? 0.7 : 0.5,
            }}
            verticalLabelRotation={data.labels.length < 13 ? 0 : 80}
            showValuesOnTopOfBars
            fromZero
            style={{
              borderRadius: 16,
              alignItems: 'center',
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};
export default AdviserCar;
