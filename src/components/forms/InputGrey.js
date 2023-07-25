import React from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'native-base';

import {FontFamily, FontSizeNormalize, Colors} from '@styles/index';

const InputGrey = ({
  value = '',
  setValue,
  disabled = false,
  keyboardType = 'default',
  placeholder,
  isUppercase = false,
  maxLength,
  numberOfLines,
  autoFocus,
  onFocus,
  ref,
  onBlur,
}) => {
  const backgroundColor = disabled ? Colors.gray : Colors.white;
  const borderWidth = disabled ? 0 : 0.5;
  const borderColor = disabled ? Colors.white : Colors.txtGray;
  return (
    <Input
      placeholder={placeholder}
      keyboardType={keyboardType}
      value={String(value)}
      style={[
        styles.text,
        {
          backgroundColor,
          borderWidth,
          borderColor,
        },
      ]}
      onChangeText={setValue}
      disabled={disabled}
      autoCapitalize={isUppercase ? 'characters' : 'none'}
      maxLength={maxLength}
      numberOfLines={numberOfLines}
      autoFocus={autoFocus}
      onFocus={onFocus}
      ref={ref}
      onBlur={onBlur}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: FontSizeNormalize.small,
    color: Colors.black,
    fontFamily: FontFamily.nissanRegular,
    paddingLeft: 10,
    paddingRight: 5,
    height: 40,
    paddingVertical: 1,
    borderRadius: 5,
  },
});

export default React.memo(InputGrey);
