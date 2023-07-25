import React, {useContext} from 'react';
import DatePicker from 'react-native-datepicker';
import {StyleSheet} from 'react-native';
import {Item} from 'native-base';

import {Colors, FontFamily, FontSizeNormalize} from '@styles/index';
import {VN_FORMAT_DATE} from '@configs/Configs';
import {LocalizationContext} from '@context/index';

function PickerDateItem({
  value = '',
  disabled = false,
  setValue,
  hasMinDate = false,
  backgroundColor = Colors.white,
  colorText = Colors.black,
}) {
  const {t, locale} = useContext(LocalizationContext);
  const onDateChange = (dateStr, date) => {
    setValue(dateStr, date);
  };
  return (
    <Item style={styles.itemCon}>
      <DatePicker
        locale={locale}
        mode="date"
        disabled={disabled}
        format={VN_FORMAT_DATE}
        style={styles.date(disabled)}
        date={value}
        onDateChange={onDateChange}
        customStyles={{
          dateInput: styles.dateInput,
          disabled: styles.disable,
          dateText: [styles.dateText, {color: colorText}],
          dateIcon: styles.dateIcon,
        }}
        confirmBtnText={t('confirm')}
        cancelBtnText={t('cancel')}
      />
    </Item>
  );
}

export default React.memo(PickerDateItem);

const styles = StyleSheet.create({
  itemCon: {borderBottomWidth: 0},
  disable: {
    backgroundColor: Colors.gray,
  },
  dateText: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
  },
  dateInput: {
    borderWidth: 0,
    alignItems: 'flex-start',
  },
  date: (disabled) => ({
    flex: 1,
    paddingHorizontal: 5,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: disabled ? Colors.gray : Colors.txtGray,
    paddingVertical: 1,
    backgroundColor: disabled ? Colors.gray : Colors.white,
    marginRight: disabled ? 0 : 5,
  }),
  value: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    color: Colors.black,
  },
  dateIcon: {height: 25, width: 25},
});
