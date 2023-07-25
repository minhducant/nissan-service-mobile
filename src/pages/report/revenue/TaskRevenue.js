import React, {useState} from 'react';
import {View, ScrollView, processColor} from 'react-native';
import {PieChart} from 'react-native-charts-wrapper';
import {useDispatch} from 'react-redux';
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
const TaskRevenue = () => {
  const dispatch = useDispatch();
  const [empty, setEmpty] = useState(true);
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
  const state = {
    legend: {
      enabled: true,
      textSize: 13,
      form: 'SQUARE',
      formSize: 25,
      horizontalAlignment: 'RIGHT',
      verticalAlignment: 'CENTER',
      orientation: 'VERTICAL',
      wordWrapEnabled: true,
      fontFamily: FontFamily.nissanRegular,
    },
    highlights: [],
    description: {
      text: '',
      textSize: 13,
      textColor: processColor('darkgray'),
    },
  };
  // console.log('dataChart: ', dataChart);

  const search = (type, startDate, endDate, company) => {
    dispatch(setLoading(true));
    GET.getListFleetTask({startDate, endDate, companyId: company})
      .then((res) => {
        // if (res.data.adviser_name.length > 0) {
        //   const dataFetch = {...data};
        //   dataFetch.labels = res.data.adviser_name;
        //   dataFetch.legend = res.data.task_list;
        //   dataFetch.data = res.data.data;
        //   setData(dataFetch);
        //   setEmpty(false);
        // } else {
        //   setEmpty(true);
        // }
        if (res?.data?.data.length <= 0) {
          setEmpty(true);
        } else {
          const dataChart = res?.data?.data.map((it, idx) => {
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
        // console.log('err', err);
        dispatch(setLoading(false));
      });
  };
  return (
    <View style={styles.screen}>
      <FilterBar search={search} isDate={false} />
      {empty ? (
        <EmptyData />
      ) : (
        <ScrollView style={styles.contain}>
          <PieChart
            style={{width: '100%', height: (2.8 * SCREEN_HEIGHT) / 4}}
            // logEnabled={true}
            highlightPerTapEnabled={false}
            chartBackgroundColor={processColor('white')}
            chartDescription={state.description}
            data={data}
            legend={state.legend}
            highlights={state.highlights}
            extraOffsets={{left: 5, top: 5, right: 5, bottom: 5}}
            entryLabelColor={processColor('black')}
            entryLabelTextSize={0}
            entryLabelFontFamily={FontFamily.nissanRegular}
            // drawEntryLabels={true}
            rotationEnabled={false}
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
          />
        </ScrollView>
      )}
    </View>
  );
};

export default TaskRevenue;
