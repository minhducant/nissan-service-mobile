import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {advisoryStyles as styles, Colors} from '@styles/index';
import {setLoading} from '@stores/config/actions';
import {GET} from '@repository/advisory/index';
import {showMessage} from '@common/index';
import {EmptyData} from '@components/forms/index';
import {IcAdvisory} from '@common/svg/index';
const IMAGE_PLAY = require('@assets/images/clip.png');
import {LocalizationContext} from '@context/index';

export default function AdvisoryScreen() {
  const navigation = useNavigation();
  const {t} = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const [listVideo, setListVideo] = useState([]);
  useEffect(() => {
    dispatch(setLoading(true));
    GET.getListAdvisory()
      .then((res) => {
        // console.log('res', JSON.stringify(res));
        setListVideo(res.data.list_video);
        dispatch(setLoading(false));
      })
      .catch((err) => {
        // console.log('err', JSON.stringify(err));
        showMessage(err);
        dispatch(setLoading(false));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContain}>
        <TouchableOpacity
          onPress={() => navigation.navigate('VideoDetail', {item: item})}
          style={styles.item}>
          <Text style={styles.txtName}>{item.name}</Text>
          <Image source={IMAGE_PLAY} style={styles.imagePlay} />
        </TouchableOpacity>
      </View>
    );
  };
  const renderEmptyItem = () => (
    <View style={styles.emptyContain}>
      <EmptyData />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <IcAdvisory fill={Colors.main} />
        <Text style={styles.txtTitle}>{t('advisory')}</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.container}
        numColumns={3}
        renderItem={renderItem}
        data={listVideo}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={renderEmptyItem}
      />
    </SafeAreaView>
  );
}
