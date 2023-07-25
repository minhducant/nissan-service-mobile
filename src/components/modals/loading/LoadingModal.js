import React from 'react';
import {Modal} from 'react-native-paper';
import {StyleSheet, View, Image} from 'react-native';
import normalize from 'react-native-normalize';
import LoadingDots from 'react-native-loading-dots';

import {Colors} from '@styles/colors';
const LOGO = require('@assets/icons/logo.png');
export default function LoadingModal({visible}) {
  return (
    <Modal contentContainerStyle={styles.modal} visible={visible}>
      <View style={styles.content}>
        {/* <LoadingDots
          colors={[Colors.main, Colors.main, Colors.main, Colors.main]}
        /> */}
        <Image
          source={LOGO}
          style={{width: 60, height: 60, borderRadius: 30}}
        />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    borderRadius: 30,
    borderWidth: 3,
  },
});
