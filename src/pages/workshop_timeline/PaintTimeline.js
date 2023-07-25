import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { FAB } from 'react-native-paper';
import normalize from 'react-native-normalize';
import { useNavigation } from '@react-navigation/native';

import { IcTimeLine, IcHideShow } from '@common/svg/index';
import FormBody from '@components/workshop_timeline/FormBody';
import { Colors, FontFamily, FontSizeNormalize } from '@styles/index';
import NoteTimeline from '@components/customer_timeline/NoteTimeline';

const PaintTimeline = (props) => {
  const navigation = useNavigation();
  const childCompRef = React.useRef();

  const _onPressFAB = () => {
    navigation.navigate('FullScreenTimeLine', {
      timelineType: 'paint_timeline',
    });
  };

  const onAction = () => {
    childCompRef.current.onSetShowSearch();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <IcTimeLine fill={Colors.main} />
        <Text style={styles.txtTitle}>Timeline đồng sơn</Text>
        <NoteTimeline
          isVisibleCustomer
        />
        <TouchableOpacity
          style={styles.hideShow}
          onPress={() => {
            onAction();
          }}>
          <IcHideShow fill={Colors.main} />
        </TouchableOpacity>
      </View>
      <FormBody
        type={'normal'}
        ref={childCompRef}
        timelineType={'paint_timeline'}
        isShowStartingPoint={true}
      />
      <FAB icon="arrow-expand-all" style={styles.fab} onPress={_onPressFAB} />
    </SafeAreaView>
  );
};

export default PaintTimeline;

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
  note: {
    position: 'absolute',
    margin: normalize(6),
    right: normalize(15),
    bottom: normalize(68),
    backgroundColor: "rgba(0,0,0,0.2)",
    height: normalize(40),
    width: normalize(100),
    // justifyContent: 'center',
    // alignItems: 'center',
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
