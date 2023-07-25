import React, {useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  Alert,
} from 'react-native';
import {Icon} from 'native-base';
import WebView from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '@styles/index';
import {URL_PUBLIC} from '@configs/Configs';
import {LocalizationContext} from '@context/index';
import {Header} from '@components/headers/index';

export default function ViewDocsFile({route}) {
  const {item} = route.params;
  const navigation = useNavigation();
  const {t} = useContext(LocalizationContext);
  // console.log(
  //   `https://docs.google.com/viewer?url=${URL_PUBLIC}${item.document_link}&embedded=true`,
  // );
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
      <WebView
        style={styles.WebView}
        source={{
          uri: `https://docs.google.com/viewer?url=${URL_PUBLIC}${item.document_link}&embedded=true`,
        }}
        onHttpError={onHttpError}
        renderError={() => <LoadingError />}
        renderLoading={() => (
          <ActivityIndicator size="small" color={Colors.main} />
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  WebView: {width: '100%', height: '100%'},
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
