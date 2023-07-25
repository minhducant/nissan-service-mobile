import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {FAB} from 'react-native-paper';
import normalize from 'react-native-normalize';
import {useNavigation} from '@react-navigation/native';

import {Colors, FontFamily, FontSizeNormalize} from '@styles/index';
import FormBody from '@components/customer_timeline/FormBody';
import {IcCustomerTimeline, IcHideShow} from '@common/svg/index';
import NoteTimeline from '@components/customer_timeline/NoteTimeline';

const CustomerTimeLine = (props) => {
  const childCompRef = React.useRef();
  const navigation = useNavigation();
  const _onPressFAB = () => {
    navigation.navigate('FullScreenCustomer');
  };
  const onAction = () => {
    childCompRef.current.onSetShowSearch();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <IcCustomerTimeline fill={Colors.main} />
        <Text style={styles.txtTitle}>Timeline khách hàng</Text>
        <NoteTimeline />
        <TouchableOpacity
          style={styles.hideShow}
          onPress={() => {
            onAction();
          }}>
          <IcHideShow fill={Colors.main} />
        </TouchableOpacity>
      </View>
      <FormBody type={'normal'} ref={childCompRef} />
      <FAB icon="arrow-expand-all" style={styles.fab} onPress={_onPressFAB} />
    </SafeAreaView>
  );
};

export default CustomerTimeLine;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: normalize(18),
    right: normalize(15),
    bottom: normalize(25),
    backgroundColor: Colors.main,
    height: normalize(20),
    width: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(5),
    marginBottom: normalize(3),
    paddingHorizontal: normalize(5),
  },
  txtTitle: {
    marginLeft: 10,
    fontFamily: FontFamily.nissanBold,
    fontSize: FontSizeNormalize.normal,
    alignSelf: 'center',
    textAlign: 'center',
  },
  hideShow: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    flex: 1,
  },
});
