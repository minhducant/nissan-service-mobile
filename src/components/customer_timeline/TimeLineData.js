import React from 'react';
import moment from 'moment';
import normalize from 'react-native-normalize';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, FontFamily, FontSizeNormalize, SCREEN_WIDTH } from '@styles/index';

const TimeLineData = (props) => {
  const type = props.type;
  const [days, setDays] = React.useState([]);
  const [month, setMonth] = React.useState([]);

  React.useEffect(() => {
    getAllDaysOfWeek();
    getAllDataOfMonth();
  }, []);

  let hours = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  function getAllDaysOfWeek() {
    function dates(current) {
      var week = [];
      // Starting Monday not Sunday
      current.setDate(current.getDate() - current.getDay() + 1);
      for (var i = 0; i < 7; i++) {
        week.push(
          new Date(current).toLocaleDateString('en-US', {
            weekday: 'short',
          }),
        );
        current.setDate(current.getDate() + 1);
      }
      const listDay = week.map(function (day) {
        return day.slice(0, 5).split('/').reverse().join('/');
      });
      return listDay;
    }
    var input = new Date();
    var result = dates(input);
    setDays(result);
  }

  function getAllDataOfMonth() {
    function getDaysInMonth() {
      var daysInMonth = [];
      var numberDays = parseFloat(
        moment().endOf('month').format('YYYY-MM-DD').slice(8),
      );
      var first = 1;
      for (var i = 0; i < numberDays; i++) {
        daysInMonth.push(first++);
      }
      const listDay = daysInMonth.map(function (day) {
        return day;
      });
      return listDay;
    }
    const daysInCurrentMonth = getDaysInMonth();
    setMonth(daysInCurrentMonth);
  }

  return (
    <View style={styles.mTimeLine}>
      <View style={styles.licensePlates}>
        <Text style={styles.mStyleTitles}>
          {props.timelineType === 'general_timeline' ? 'Khoang' : 'Biển số xe'}
        </Text>
      </View>
      {props.state === 'month' ? (
        <View style={styles.timeContainer(type)}>
          <View style={styles.times}>
            {month.map((item, index) => {
              return (
                <View style={styles.times} key={index}>
                  <View style={styles.timeItemMonth(index, month)}>
                    <Text style={styles.timeItemTxt}>{item}</Text>
                    <View style={styles.verticalTiles} />
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      ) : props.state === 'week' ? (
        <View style={styles.timeContainer(type)}>
          <View style={styles.times}>
            {days.map((item, index) => {
              return (
                <View key={index} style={styles.timeItemWeek(index, days)}>
                  <Text style={styles.timeItemTxt}>{item}</Text>
                  <View style={styles.verticalTiles} />
                </View>
              );
            })}
          </View>
        </View>
      ) : (
        <View style={styles.timeContainer(type)}>
              <View style={styles.times}>
            {hours.map((item, index) => {
              return (
                <View key={index} style={styles.timeItemDay(index, hours)}>
                  <Text style={styles.timeItemTxt}>{item}</Text>
                  <View style={styles.verticalTiles} />
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

export default TimeLineData;

const styles = StyleSheet.create({
  mTimeLine: {
    flexDirection: 'row',
    height: normalize(15),
    alignItems: 'center',
    backgroundColor: Colors.red,
  },
  mStyleTitles: {
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.normal,
    color: Colors.white,
  },
  licensePlates: {
    flex: 1.5,
    height: normalize(15),
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: Colors.white,
    backgroundColor: '#0197A6',
  },
  verticalTiles: {
    backgroundColor: '#fff',
    width: normalize(1),
    height: normalize(5),
  },
  timeItemTxt: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    color: Colors.white,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  timeContainer: (type) => ({
    height: normalize(15),
    flex: 8.5,
    backgroundColor: "green",
  }),
  times: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 10,
    justifyContent: 'center',
    backgroundColor: '#0197A6',
  },
  timeItemDay: (index, hours) => ({
    alignItems: 'center',
    alignSelf: 'center',
    height: normalize(5),
    justifyContent: 'center',
    flex: 1,
    borderRightWidth: index + 1 === hours.length ? 0 : normalize(0.9),
    borderColor: Colors.white,
  }),
  timeItemWeek: (index, days) => ({
    alignItems: 'center',
    alignSelf: 'center',
    height: normalize(15),
    justifyContent: 'center',
    flex: 1,
    borderRightWidth: index + 1 === days.length ? 0 : normalize(0.9),
    borderColor: Colors.white,
  }),
  timeItemMonth: (index, month) => ({
    alignItems: 'center',
    alignSelf: 'center',
    height: normalize(15),
    justifyContent: 'center',
    flex: 1,
    borderRightWidth: index + 1 === month.length ? 0 : normalize(1.05),
    borderColor: Colors.white,
  }),
});
