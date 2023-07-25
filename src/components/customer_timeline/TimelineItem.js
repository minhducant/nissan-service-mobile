import React from 'react';
import moment from 'moment';
import normalize from 'react-native-normalize';
import { Slider } from '@miblanchard/react-native-slider';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { Colors, FontFamily, FontSizeNormalize } from '@styles/index';
import SliderContainer from '@components/customer_timeline/SliderContainer';

export default function DataItemTimeline({
  index,
  item,
  date,
  isEdit,
  isModal,
  setIsModal,
  setInfRepairOder,
  setIsShowInfoModal,
}) {
  const [dateDayNew] = React.useState(moment(new Date()).format('YYYY-MM-DD 08:00:00'));
  // setDateDayNew();
  const realTime = getTimeStamp(moment().format('YYYY-MM-DD HH:mm:ss'));
  const startDay = getTimeStamp(
    moment().startOf('today').format('YYYY-MM-DD 08:00:00'),
  );
  const endDay = getTimeStamp(
    moment().endOf('today').format('YYYY-MM-DD 18:00:00'),
  );
  const startWeek =
    getTimeStamp(moment().startOf('week').format('YYYY-MM-DD 00:00:00')) +
    86400;
  const endWeek =
    getTimeStamp(moment().endOf('week').format('YYYY-MM-DD 00:00:00')) + 172800;
  const startMonth = getTimeStamp(
    moment().startOf('month').format('YYYY-MM-DD 00:00:00'),
  );
  const endMonth =
    getTimeStamp(moment().endOf('month').format('YYYY-MM-DD 00:00:00')) + 86400;
  const dateStartExpected =
    item.start_time_expected === ''
      ? 0
      : getTimeStamp(item.start_time_expected) + 25200;
  const dateFinishExpected =
    item.end_time_expected === ''
      ? 0
      : getTimeStamp(item.end_time_expected) +
        25200 < getTimeStamp(dateDayNew)
        ? getTimeStamp(dateDayNew)
        : getTimeStamp(item.end_time_expected) + 25200;
  const dateStartReality =
    item.starting_point_reality === ''
      ? 0
      : getTimeStamp(item.starting_point_reality) + 25200;
  const dateFinishReality =
    item.end_time_reality === 'False'
      ? item.starting_point_reality === 'False'
        ? 0
        : realTime
      : getTimeStamp(item.end_time_reality) + 25200;

  const onPressTimeline = () => {
    setIsShowInfoModal(!isModal);
    setInfRepairOder(item);
    // console.log(JSON.stringify(item, null, 2));
  };
  const adviser = [item.adviser, ''];
  // console.log(startDay);
  // console.log(startWeek);
  // console.log(item.end_time_expected);

  // const [dateDayNew, setDateDayNew] = React.useState(new Date());
  // console.log(moment(dateDayNew).format('YYYY-MM-DD HH:mm:ss'));
  // console.log(dateStartReality);

  return (
    <View style={styles.container(index)}>
      <TouchableOpacity
        onPress={() => {
          onPressTimeline();
        }}
        // disabled={true}
        style={styles.licensePlate}>
        <Text style={styles.txtLicensePlate} numberOfLines={1}>
          {item?.vehicle?.license_plate}
        </Text>
      </TouchableOpacity>
      <View style={styles.containerSlider}>
        <Text style={styles.txtAboveThumb}>
          {`CVDV: ${adviser[0]}`}
        </Text>
        <View style={{
          justifyContent: "center"
        }}>
          <View>
            <SliderContainer sliderValue={[dateStartExpected, dateFinishExpected]}>
              <Slider
                animateTransitions={true}
                minimumValue={
                  date === 'today'
                    ? startDay
                    : date === 'week'
                      ? startWeek
                      : startMonth
                }
                maximumValue={
                  date === 'today' ? endDay : date === 'week' ? endWeek : endMonth
                }
                containerStyle={{
                  height: normalize(14),
                }}
                step={1}
                trackStyle={{
                  height: normalize(14),
                }}
                style={styles.timelineToday}
                thumbStyle={{
                  height: normalize(14),
                  width: normalize(1.3),
                }}
                thumbTintColor="#71959e"
                minimumTrackTintColor="#71959e"
                maximumTrackTintColor="#00000000"
                disabled={isEdit}
                onSlidingComplete={(value) => {
                  console.log(
                    value.map(function (vl) {
                      return timeConverter(vl);
                    }),
                  );
                }}
              />
            </SliderContainer>
          </View>
          <View style={styles.realTime}>
            <SliderContainer sliderValue={[dateStartReality, dateFinishReality]}>
              <Slider
                disabled={true}
                animateTransitions
                minimumValue={
                  date === 'today'
                    ? startDay
                    : date === 'week'
                      ? startWeek
                      : startMonth
                }
                maximumValue={
                  date === 'today' ? endDay : date === 'week' ? endWeek : endMonth
                }
                minimumTrackTintColor="#f0373773"
                maximumTrackTintColor="#00000000"
                containerStyle={{ height: normalize(9) }}
                step={1}
                trackStyle={{
                  height: normalize(9),
                  width: normalize(1.3),
                }}
                thumbTintColor={Colors.main}
                thumbStyle={{
                  height: normalize(9),
                  width: normalize(0),
                }}
              />
            </SliderContainer>
          </View>
        </View>
      </View>
    </View>
  );
}

function getTimeStamp(input) {
  var parts = input.trim().split(' ');
  var date = parts[0].split('-');
  var time = (parts[1] ? parts[1] : '00:00:00').split(':');
  var d = new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
  return d.getTime() / 1000;
}

function timeConverter(input) {
  const result = new Date((input + 25200) * 1000)
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');
  return result;
}

const styles = StyleSheet.create({
  container: (index) => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5F7F7',
    borderBottomWidth: 1.5,
    borderColor: '#0197A6',
  }),
  txtLicensePlate: {
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.normal,
    color: Colors.black,
  },
  licensePlate: {
    flex: 1.55,
    borderRightWidth: 1,
    borderColor: Colors.white,
  },
  containerSlider: {
    flex: 8.45,
    height: normalize(24),
    backgroundColor: Colors.white,
  },
  realTime: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1,
    justifyContent: 'center',
  },
  txtAboveThumb: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    color: Colors.black,
    marginHorizontal: 6
  },
  aboveThumb: { position: 'absolute', bottom: -18, left: +5, zIndex: 1 },
});
