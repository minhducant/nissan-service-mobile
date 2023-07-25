import React, {useContext, useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Animated, ScrollView} from 'react-native';
import {LineChart, StackedBarChart} from 'react-native-chart-kit';
import {FilterBar} from '@components/forms/index';
import {useDispatch} from 'react-redux';

import {reportMenu} from '@data/index';
import {
  SCREEN_WIDTH,
  Colors,
  reportStyles as styles,
  SCREEN_HEIGHT,
  FontFamily,
} from '@styles/index';
import {LocalizationContext} from '@context/index';
import {HeaderChart} from '@components/headers/index';
import {setLoading} from '@stores/config/actions';
import {URL_LOCAL, TOKEN} from '@configs/Configs';
import {GET} from '@repository/report/index';
import {EmptyData} from '@components/forms/index';
export default function AppointmentChart() {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const {t} = useContext(LocalizationContext);
  const x = useRef(new Animated.Value(0)).current;
  const [listChild, setListChild] = useState(reportMenu[2].list);
  const onScroll = Animated.event([{nativeEvent: {contentOffset: {x}}}], {
    useNativeDriver: false,
  });
  const [data, setData] = useState({
    labels: [],
    legend: [],
    data: [],
    barColors: [
      'rgba(255, 153, 51, 1)',
      'rgba(0, 102, 0, 1)',
      '#6BB6B1',
      'rgba(208, 0, 0, 1)',
    ],
  });
  const [dataLine, setDataLine] = useState({
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
  const [isLine, setIsLine] = useState(false);
  const onChangeTab = (index) => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTo({
        x: index * (SCREEN_WIDTH - 220),
        y: 0,
        animate: true,
      });
    }
  };
  const search = (type, startDate, endDate, companyId) => {
    dispatch(setLoading(true));
    if (type === 'yyyy-mm') {
      setIsLine(true);
    } else {
      setIsLine(false);
    }
    GET.getListAppointment({startDate, endDate, type, companyId})
      .then((res) => {
        // console.log(
        //   '🚀 ~ file: AppointmentChart.js ~ line 67 ~ .then ~ res',
        //   res,
        // );
        if (res.data.list_booking_date.length > 0) {
          const dataFetch = {...data};
          dataFetch.labels = res.data.list_booking_date;
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
        setEmpty(true);
        dispatch(setLoading(false));
      });
  };
  return (
    <View style={{flex: 1, paddingTop: 5}}>
      <HeaderChart listTitle={listChild} x={x} onPress={onChangeTab} />
      <ScrollView style={styles.contain}>
        <View style={{marginVertical: 10}}>
          <FilterBar search={search} />
        </View>
        {isLine ? (
          <View>
            {empty ? (
              <EmptyData />
            ) : (
              <LineChart
                data={dataLine}
                width={SCREEN_WIDTH - 220}
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
          </View>
        ) : (
          <View>
            {empty ? (
              <EmptyData />
            ) : (
              <View>
                {/* <View style={styles.legendContain}>
                  <View style={styles.itemLegend}>
                    <View style={styles.legendBox('#6BB6B1')} />
                    <Text style={styles.txtLegend}>Đã tiếp nhận</Text>
                  </View>
                  <View style={styles.itemLegend}>
                    <View style={styles.legendBox('#FF7500')} />
                    <Text style={styles.txtLegend}>Hủy</Text>
                  </View>
                </View> */}
                <StackedBarChart
                  data={data}
                  width={SCREEN_WIDTH - 240}
                  height={(2.8 * SCREEN_HEIGHT) / 4}
                  chartConfig={{
                    backgroundColor: '#fff',
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    color: (opacity = 1) => 'black',
                    // labelColor: (opacity = 1) => 'transparent',
                    barPercentage: data.labels.length < 15 ? 0.7 : 0.5,
                    propsForVerticalLabels: {
                      fontSize: 11,
                      translateY: 5,
                      rotation: 80,
                      fill: '#000',
                      fontFamily: FontFamily.nissanRegular,
                    },
                    propsForHorizontalLabels: {
                      fill: '#000',
                      fontFamily: FontFamily.nissanRegular,
                    },
                  }}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    alignItems: 'center',
                  }}
                  xLabelsOffset={15}
                  // hideLegend={true}
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
