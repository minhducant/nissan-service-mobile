import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, processColor} from 'react-native';
// import {PieChart, StackedBarChart} from 'react-native-chart-kit';
import {PieChart} from 'react-native-charts-wrapper';

import {useDispatch} from 'react-redux';
import normalize from 'react-native-normalize';
import {FontFamily} from '@styles/index';
import {
  reportStyles as styles,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '@styles/index';
import {FilterBar} from '@components/forms/index';
import {setLoading} from '@stores/config/actions';
import {EmptyData} from '@components/forms/index';
import {GET} from '@repository/report/index';
import randomColor from 'randomcolor';
const ObjectPaymentRevenue = () => {
  const dispatch = useDispatch();
  const state = {
    legend: {
      enabled: true,
      textSize: 13,
      form: 'SQUARE',
      horizontalAlignment: 'RIGHT',
      verticalAlignment: 'CENTER',
      orientation: 'VERTICAL',
      wordWrapEnabled: true,
      formSize: 25,
      fontFamily: FontFamily.nissanRegular,
    },
    highlights: [],
    description: {
      text: '',
      textSize: 13,
      textColor: processColor('darkgray'),
    },
  };
  const [data, setData] = useState({
    dataSets: [
      {
        values: [],
        label: '',
        config: {
          colors: [
            processColor('#C0FF8C'),
            processColor('#FFF78C'),
            processColor('#FFD08C'),
            processColor('#8CEAFF'),
            processColor('#FF8C9D'),
            processColor('blue'),
          ],
          valueTextSize: 13,
          valueTextColor: processColor('green'),
          sliceSpace: 0,
          selectionShift: 11,
          valueFormatter: "#.#'%'",
          valueLineColor: processColor('green'),
          valueLinePart1Length: 0.5,
        },
      },
    ],
  });
  const [empty, setEmpty] = useState(true);
  const search = (type, startDate, endDate, company) => {
    dispatch(setLoading(true));
    GET.getListPaymentObject({startDate, endDate, companyId: company})
      .then((res) => {
        var result = res.data.data[0].reduce(function (acc, obj) {
          return acc + obj.value;
        }, 0);
        if (result <= 0) {
          setEmpty(true);
        } else {
          const dataChart = res.data.data[0].map((it, idx) => {
            return {
              label: it.type,
              value: it.value,
            };
          });
          var dataState = {
            dataSets: [
              {
                values: dataChart,
                label: '',
                config: {
                  colors: [
                    processColor('#C0FF8C'),
                    processColor('#FFF78C'),
                    processColor('#FFD08C'),
                    processColor('#8CEAFF'),
                    processColor('#FF8C9D'),
                    processColor('blue'),
                  ],
                  valueTextSize: 13,
                  valueTextColor: processColor('green'),
                  sliceSpace: 0,
                  selectionShift: 11,
                  valueFormatter: "#.#'%'",
                  valueLineColor: processColor('green'),
                  valueLinePart1Length: 0.5,
                },
              },
            ],
          };
          setData(dataState);
          setEmpty(false);
        }
        dispatch(setLoading(false));
      })
      .catch((err) => {
        // console.log(err);
        dispatch(setLoading(false));
      });
  };
  return (
    <View style={styles.screen}>
      <FilterBar search={search} isMonth={true} isDate={false} />

      {empty ? (
        <EmptyData />
      ) : (
        <ScrollView style={styles.contain}>
          {/* <PieChart
            data={data}
            width={SCREEN_WIDTH - 240}
            height={(2.8 * SCREEN_HEIGHT) / 4}
            chartConfig={{
              backgroundGradientFrom: '#1E2923',
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: '#08130D',
              backgroundGradientToOpacity: 0.5,
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              strokeWidth: 2, // optional, default 3
              barPercentage: 0.5,
              useShadowColorFromDataset: false, // optional
            }}
            // hideLegend
            absolute
            accessor={'value'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
            center={[50, 0]}
            avoidFalseZero
          /> */}
          <PieChart
            style={{width: '100%', height: (2.8 * SCREEN_HEIGHT) / 4}}
            logEnabled={true}
            chartBackgroundColor={processColor('white')}
            chartDescription={state.description}
            data={data}
            legend={state.legend}
            highlights={state.highlights}
            extraOffsets={{left: 5, top: 5, right: 5, bottom: 5}}
            entryLabelColor={processColor('black')}
            entryLabelTextSize={0}
            entryLabelFontFamily={FontFamily.nissanRegular}
            highlightPerTapEnabled={false}
            // drawEntryLabels={true}
            // rotationEnabled={true}
            rotationAngle={45}
            usePercentValues={true}
            styledCenterText={{
              text: 'Pie center text!',
              color: processColor('pink'),
              fontFamily: FontFamily.nissanRegula,
              size: 13,
            }}
            // centerTextRadiusPercent={100}
            holeRadius={0}
            holeColor={processColor('red')}
            transparentCircleRadius={0}
            transparentCircleColor={processColor('#f0f0f088')}
            maxAngle={450}
            onChange={(event) => console.log(event.nativeEvent)}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default ObjectPaymentRevenue;
