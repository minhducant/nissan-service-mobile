import React, {useState, useContext, Fragment} from 'react';
import moment from 'moment';
import {Item, Input} from 'native-base';
import DatePicker from 'react-native-datepicker';
import {StyleSheet, Platform, Image, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {LocalizationContext} from '@context/index';
import {FontFamily, FontSizeNormalize, Colors} from '@styles/index';
import {VN_FORMAT_DATETIME, VN_FORMAT_TIME} from '@configs/Configs';

function PickerDateTime({value = null, disabled = false, setValue}) {
  const {t, locale} = useContext(LocalizationContext);
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [date, setDate] = useState(
    moment(value === null ? moment().toDate().getTime() : value)
      .toDate()
      .getTime(),
  );
  const [time, setTime] = useState(
    moment(value === null ? moment().toDate().getTime() : value)
      .toDate()
      .getTime(),
  );

  const onShowPickerDatetime = () => {
    setShowDate(true);
    // console.log('Giang ngu ngốc');
  };

  const onChangeDateAndroid = (event) => {
    setShowDate(false);
    if (event.type === 'set') {
      setDate(event.nativeEvent.timestamp);
      setShowTime(true);
    }
  };

  const onChangeTimeAndroid = (event) => {
    setShowTime(false);
    if (event.type === 'set') {
      const dateString = moment(date).format('YYYY-MM-DD');
      const timeString = moment(event.nativeEvent.timestamp).format(
        VN_FORMAT_TIME,
      );
      const dateTimeString = `${dateString} ${timeString}`;
      setTime(event.nativeEvent.timestamp);
      setValue(dateTimeString);
    }
  };

  const onDateChangeIOS = (dateString, datetime) => {
    setValue(moment(datetime).toDate().getTime());
  };

  const optionByOS = () => {
    if (Platform.OS === 'ios') {
      return (
        <DatePicker
          mode="datetime"
          date={moment(value).format(VN_FORMAT_DATETIME)}
          format={VN_FORMAT_DATETIME}
          onDateChange={onDateChangeIOS}
          confirmBtnText={t('done')}
          cancelBtnText={t('cancel')}
          showIcon={true}
          is24Hour={true}
          locale={locale}
          style={styles.date}
          customStyles={{
            dateInput: styles.dateInput,
            disabled: styles.disabled,
            dateText: styles.dateText,
          }}
          disabled={disabled}
        />
      );
    } else if (Platform.OS === 'android') {
      return (
        <Fragment>
          {showDate && (
            <DateTimePicker
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDateAndroid}
              value={new Date(date)}
            />
          )}
          {showTime && (
            <DateTimePicker
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeTimeAndroid}
              value={new Date(time)}
            />
          )}
        </Fragment>
      );
    }
  };

  return (
    <Item
      onPress={onShowPickerDatetime}
      disabled={disabled}
      style={styles.itemStyles}>
      {optionByOS()}
      {Platform.OS === 'android' && (
        <View style={styles.datetime(disabled)}>
          <Input
            disabled={true}
            style={styles.value}
            value={
              value === null ? '' : moment(value).format(VN_FORMAT_DATETIME)
            }
            defaultValue={
              value === null ? '' : moment(value).format(VN_FORMAT_DATETIME)
            }
          />
          <Image
            source={require('@assets/icons/ic_calendar.jpg')}
            style={styles.imageIcon}
          />
        </View>
      )}
    </Item>
  );
}

export default React.memo(PickerDateTime);

const styles = StyleSheet.create({
  itemStyles: {
    borderBottomWidth: 0,
  },
  dateText: {
    alignSelf: 'flex-start',
    fontFamily: FontFamily.nissanRegular,
    color: '#000',
    fontSize: 14,
  },
  imageIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  disabled: {
    backgroundColor: '#fff',
  },
  dateInput: {
    borderWidth: 0,
  },
  date: {
    flex: 1,
  },
  title: {
    fontFamily: FontFamily.nissanBold,
    fontSize: FontSizeNormalize.small,
    color: '#000',
  },
  value: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    color: '#000',
  },
  datetime: (disabled) => ({
    flex: 1,
    height: 40,
    borderColor: disabled ? Colors.gray : Colors.txtGray,
    borderRadius: 5,
    borderWidth: 0.5,
    justifyContent: 'center',
    backgroundColor: disabled ? Colors.gray : Colors.white,
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginRight: 1,
    alignItems: 'center',
  }),
});
