import React from 'react';
import {Text, View} from 'react-native';

import {css, appointmentStyles as styles} from '@styles/index';

import {InputGrey} from '@components/forms/index';
const LineInput = ({
  leftTitle,
  leftValue,
  rightTitle,
  rightValue,
  disabled,
  setLeftValue,
  setRightValue,
  leftUpperCase,
  rightUpperCase,
  leftKeyBoardType,
  rightKeyBoardType,
  leftOnBlur,
  rightOnBlur,
  hasLeft = true,
  hasRight = true,
  lefRequire = false,
  rightRequire = false,
}) => {
  return (
    <View style={styles.inputContain}>
      {hasLeft && (
        <Text style={styles.leftTitle}>
          {leftTitle}
          {lefRequire && <Text style={styles.require}>*</Text>}
        </Text>
      )}
      <View style={css.fx_1}>
        {hasLeft && (
          <InputGrey
            setValue={setLeftValue}
            value={leftValue}
            disabled={disabled}
            isUppercase={leftUpperCase}
            keyboardType={leftKeyBoardType}
            onBlur={leftOnBlur}
          />
        )}
      </View>
      <View style={styles.rightTitle}>
        {hasRight && (
          <Text style={styles.rightTxt}>
            {rightTitle}
            {rightRequire && <Text style={styles.require}>*</Text>}
          </Text>
        )}
      </View>
      <View style={css.fx_1}>
        {hasRight && (
          <InputGrey
            setValue={setRightValue}
            value={rightValue}
            disabled={disabled}
            isUppercase={rightUpperCase}
            keyboardType={rightKeyBoardType}
            onBlur={rightOnBlur}
          />
        )}
      </View>
    </View>
  );
};
export default React.memo(LineInput);
