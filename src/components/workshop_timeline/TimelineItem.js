import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import normalize from 'react-native-normalize';
import { Slider } from '@miblanchard/react-native-slider';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { Colors, FontFamily, FontSizeNormalize } from '@styles/index';
import SliderContainer from '@components/customer_timeline/SliderContainer';

export default function DataItemTimeline({
  idx,
  it,
  date,
  isModal,
  setIsModal,
  timelineType,
  setInfRepairOder,
  isShowStartingPoint,
  isModalLongPress,
  setSetIsLongPress,
  setItemLongPress,
}) {
  const { isLoading } = useSelector((st) => st.conf);
  const { wkTimelineState } = useSelector((st) => st.appointment);
  const realTimeEnd = getTimeStamp(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
  const realTimeStart = getTimeStamp(moment(new Date()).format('YYYY-MM-DD 08:00:00'));

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

  const onPressTimeline = () => {
    setIsModal(!isModal);
    setInfRepairOder(it);
  };
  const onLongPressItemClick = (item) => {
    setSetIsLongPress(!isModalLongPress);
    setItemLongPress(item);
  };
  // console.log(it);
  const renderItem = ({ item, index }) => {

    const dateStartExpected =
      it.start_time_expected === '' ?
        getTimeStamp(it.start_time_create_ro) + 25200 :
        getTimeStamp(it.start_time_expected) + 25200;
    const dateFinishExpected =
      it.end_time_expected === ''
        ? it.end_time_expected
        : getTimeStamp(it.date_hand_plan_so) + 25200; //đổi 

    //!==============================>
    const dateStartReality =
      it?.task_detail[0].start_time_reality
        ? getTimeStamp(it?.task_detail[0].start_time_reality) + 25200 : realTimeEnd;

    const dateFinishReality =
      it.end_time_reality
        ? getTimeStamp(it.end_time_reality) + 25200 : realTimeEnd;

    //!==============================>

    const dateStartRealityBlack =
      it.start_time_expected === ''
        ? getTimeStamp(it.start_time_create_ro) + 25200
        : getTimeStamp(it.start_time_expected) + 25200;

    const dateFinishRealityBlack =
      it.date_hand_plan_so
        ? getTimeStamp(it.end_time_expected) + 25200 : realTimeEnd;

    const repairType = [item.code, ''];
    return (
      <TouchableOpacity
        onPress={() => console.log(index)}
        onLongPress={() => onLongPressItemClick(it)}
      >
        <Text style={styles.txtAboveThumb}>
          {repairType[0]}- CVDV: {it.adviser_name}
        </Text>
        <View style={{
          flex: 8.45,
          height: normalize(24),
          backgroundColor: Colors.white,
          justifyContent: 'center'
        }}>
          <View style={{ justifyContent: "center", height: 48 }}>
            <SliderContainer sliderValue={[dateStartExpected, dateFinishExpected]}>
              <Slider
                disabled={true}
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
                  zIndex: normalize(-1),
                  height: normalize(14),
                  // marginTop: normalize(3),
                  borderRadius: normalize(14),
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
              />
            </SliderContainer>
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
                  thumbTintColor="##f0373773"
                  maximumTrackTintColor="#00000000"
                  containerStyle={{
                    zIndex: normalize(-2),
                    height: normalize(6),
                    borderRadius: normalize(45),
                  }}
                  step={1}
                  trackStyle={{
                    height: normalize(6),
                    width: normalize(1.3),
                  }}
                  thumbStyle={{
                    height: normalize(6),
                    width: normalize(0),
                  }}
                />
              </SliderContainer>
            </View>


            {isShowStartingPoint && (<View style={styles.realTimes}>
              <SliderContainer sliderValue={[dateStartRealityBlack, dateFinishRealityBlack]}>
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
                  minimumTrackTintColor="#F0AD4E"
                  maximumTrackTintColor="#00000000"
                  containerStyle={{
                    zIndex: normalize(-1),
                    height: normalize(9),
                    borderRadius: normalize(9),
                  }}
                  step={1}
                  trackStyle={{
                    height: normalize(9),
                    width: normalize(1.3),
                  }}
                  thumbTintColor="#F0AD4E"
                  thumbStyle={{
                    height: normalize(9),
                    width: normalize(0),
                  }}
                />
              </SliderContainer>
            </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container(idx)}>
      <TouchableOpacity
        onPress={() => {
          onPressTimeline();
        }}
        style={styles.licensePlate}>
        <Text style={styles.txtLicensePlate} numberOfLines={2}>
          {it?.license_plate || it?.name}
        </Text>
      </TouchableOpacity>
      <View style={styles.containerSlider}>
        <ScrollView>
          <FlatList
            extraData={isLoading}
            keyExtractor={(_item, ind) => ind.toString()}
            showsHorizontalScrollIndicator={false}
            data={
              timelineType === 'paint_timeline' &&
                wkTimelineState.compartmentId ? it?.task_detail?.filter(function (task) {
                  return (
                    task.compartment_id === wkTimelineState.compartmentId
                  );
                })
                : it?.task_detail || []
            }
            renderItem={renderItem}
          />
        </ScrollView>
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

const styles = StyleSheet.create({
  container: (index) => ({
    flexDirection: 'row',
    minHeight: normalize(13),
    alignItems: 'center',
    backgroundColor: '#E5F7F7',
    borderBottomWidth: 1.5,
    borderColor: '#71959e',
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
    minHeight: normalize(13),
    justifyContent: 'center',
  },
  containerSlider: {
    flex: 8.45,
    backgroundColor: Colors.white,
    // justifyContent: "center"
  },
  realTime: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 48,
    zIndex: 9999,
    justifyContent: 'center',
  },
  realTimes: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: -1,
    height: 48,
    justifyContent: 'center',
  },
  txtAboveThumb: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    color: Colors.black,
  },
  aboveThumb: { position: 'absolute', bottom: -25, left: +5, zIndex: 1 },
});
