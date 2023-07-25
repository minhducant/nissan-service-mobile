import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {Colors, FontFamily, FontSizeNormalize, css} from '@styles/index';

export default function FooterPrinter({printQuote, disabled}) {
  return (
    <View style={styles.footerContain}>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => printQuote()}
        style={styles.btnCancel}>
        <Text style={styles.txtCancel}>In báo giá</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContain: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  btnCancel: {
    borderWidth: 1,
    paddingVertical: css.mgV10,
    paddingHorizontal: css.mgH10,
    borderColor: Colors.main,
    borderRadius: 5,
    backgroundColor: Colors.main,
    marginHorizontal: 10,
  },
  txtCancel: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    color: Colors.white,
  },
});
