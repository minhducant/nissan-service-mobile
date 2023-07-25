import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import normalize from 'react-native-normalize';

import {IcEmpty} from '@common/svg/index';
import {LocalizationContext} from '@context/index';
import {FontFamily, FontSize, Colors} from '@styles/index';

const styles = StyleSheet.create({
  emptyItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: normalize(5, 'width'),
  },
  imageNoData: {
    width: normalize(30, 'width'),
    height: normalize(30, 'width'),
  },
  name: {
    fontFamily: FontFamily.nissanRegular,
    color: Colors.black,
    fontSize: FontSize.normal,
    marginLeft: normalize(5, 'width'),
  },
});

const EmptyData = ({title = 'no_data'}) => {
  const {t} = useContext(LocalizationContext);
  return (
    <View style={styles.emptyItem}>
      <IcEmpty />
      <Text style={styles.name}>{t(title)}</Text>
    </View>
  );
};

export default EmptyData;
