import Toast from 'react-native-tiny-toast';
import {StyleSheet} from 'react-native';

import {FontFamily, Colors} from '@styles/index';

const showMessage = (message) => {
  Toast.show(message, {
    position: Toast.position.BOTTOM,
    duration: Toast.duration.SHORT,
    textStyle: styles.textMessage,
  });
};

const styles = StyleSheet.create({
  textMessage: {
    fontFamily: FontFamily.nissanRegular,
    color: Colors.white,
    fontSize: 14,
  },
});

export default showMessage;
