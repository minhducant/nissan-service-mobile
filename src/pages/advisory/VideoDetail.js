import React, {useEffect, useState} from 'react';
import {Icon} from 'native-base';
import YouTube from 'react-native-youtube';
import WebView from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import {View, ActivityIndicator, Alert, Text, SafeAreaView} from 'react-native';

import {Colors} from '@styles/index';
import {URL_PUBLIC} from '@configs/Configs';
import {Header} from '@components/headers/index';
import {LocalizationContext} from '@context/index';
import {advisoryStyles as styles} from '@styles/index';

export default function VideoDetail({route}) {
  const {item} = route.params;
  const navigation = useNavigation();
  const [idVideo, setIdVideo] = useState('');
  const {t} = React.useContext(LocalizationContext);
  const apiKey = 'AIzaSyDL3JJ8jlFKKXiZwjAeddxsazPThIYOlrw';

  useEffect(() => {
    if (item.youtube) {
      setIdVideo(youtube_parser(item.url));
    }
  }, [item.url, item.youtube]);

  const LoadingError = () => {
    return (
      <View>
        <Icon name="ios-warning-outline" size={30} style={styles.icon} />
        <Text style={styles.errorText}>
          {t('sorry_cant_view_quotation_at_the_time')}
        </Text>
      </View>
    );
  };

  const onHttpError = () => {
    return Alert.alert(t('warning'), t('sorry_cant_view_video_at_the_time'), [
      {
        text: t('back'),
        onPress: () => {
          navigation.goBack();
        },
        style: 'cancel',
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={item.name} hasAction={false} />
      {item.youtube ? (
        <View style={styles.videoContain}>
          <YouTube
            videoId={idVideo}
            apiKey={apiKey}
            play={true}
            loop={true}
            style={styles.videoYt}
          />
        </View>
      ) : (
        <WebView
          style={styles.WebView}
          source={{uri: `${URL_PUBLIC}${item.url}`}}
          onHttpError={onHttpError}
          renderError={() => <LoadingError />}
          renderLoading={() => (
            <ActivityIndicator size="small" color={Colors.main} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

function youtube_parser(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
}
