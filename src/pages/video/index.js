import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import normalize from 'react-native-normalize';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Thumbnail} from 'react-native-thumbnail-video';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {IcVideo} from '@common/svg/index';
import {showMessage} from '@common/index';
import {GET} from '@repository/video/index';
import {ADMIN, URL_PUBLIC} from '@configs/Configs';
import {setLoading} from '@stores/config/actions';
import {EmptyData} from '@components/forms/index';
import {Colors, FontFamily, FontSizeNormalize} from '@styles/index';

export default function Video() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {accessToken} = useSelector((st) => st.auth);
  const [listVideo, setListVideo] = useState([]);
  const [refreshControl, setRefreshControl] = useState(false);

  useEffect(() => {
    _getListVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _getListVideo = async () => {
    dispatch(setLoading(true));
    await GET.getListVideo(accessToken, ADMIN)
      .then((res) => {
        setListVideo(res.data.list_video);
        dispatch(setLoading(false));
        setRefreshControl(false);
      })
      .catch((err) => {
        console.log('err', JSON.stringify(err));
        showMessage(err);
        dispatch(setLoading(false));
      });
  };

  const _onRefresh = () => {
    dispatch(setLoading(true));
    setRefreshControl(true);
    _getListVideo();
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        {item.youtube ? (
          <Thumbnail
            url={item.url}
            imageWidth={normalize(70)}
            imageHeight={normalize(35)}
            iconStyle={styles.iconPlay}
            containerStyle={styles.Thumbnail}
            onPress={() => navigation.navigate('VideoDetail', {item: item})}
          />
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('VideoDetail', {item: item})}
            activeOpacity={1}
            style={styles.backgroundVideo}>
            <Image
              source={{
                uri: `${URL_PUBLIC}${item.image}`,
              }}
              resizeMode="cover"
              style={styles.imagePlay}
            />
            <View style={styles.play}>
              <Ionicons name="ios-play-sharp" color="#fff" size={34} />
            </View>
          </TouchableOpacity>
        )}
        <Text style={styles.txtName} numberOfLines={2}>
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <IcVideo fill={Colors.main} />
        <Text style={styles.txtTitle}>Video hướng dẫn sử dụng</Text>
      </View>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.columnWrapperStyle}
        numColumns={4}
        bounces={false}
        renderItem={renderItem}
        data={listVideo}
        ListEmptyComponent={<EmptyData />}
        style={styles.List}
        refreshControl={
          <RefreshControl
            refreshing={refreshControl}
            onRefresh={_onRefresh}
            colors={[Colors.main]}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: normalize(5),
  },
  txtTitle: {
    marginLeft: 10,
    fontFamily: FontFamily.nissanBold,
    fontSize: FontSizeNormalize.normal,
    alignSelf: 'center',
    textAlign: 'center',
  },
  txtName: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.small,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: normalize(3),
    marginHorizontal: normalize(5),
  },
  item: {
    height: normalize(55),
    width: '25%',
    alignItems: 'center',
  },
  List: {marginBottom: normalize(15)},
  iconPlay: {width: 20, height: 24},
  Thumbnail: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  backgroundVideo: {
    height: normalize(35),
    width: normalize(70),
    backgroundColor: '#ede8e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlay: {height: normalize(35), width: normalize(70)},
  columnWrapperStyle: {
    flexGrow: 1,
  },
  image: {width: normalize(70), height: normalize(35)},
  play: {position: 'absolute'},
});
