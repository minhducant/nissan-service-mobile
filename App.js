import React, {useEffect} from 'react';
import {StatusBar, ToastAndroid, BackHandler} from 'react-native';
import {Provider as ProviderPaper} from 'react-native-paper';
import {Provider} from 'react-redux';
// import messaging from '@react-native-firebase/messaging';
// import codePush from 'react-native-code-push';

import {ServiceFirebase} from '@services/serviceFirebase';
import LocalizationProvider from '@context/LocalizationContext';
import redux from './src/stores/index';
// import LocalizationProvider from '@context/LocalizationContext';
import {Colors} from '@styles/index';

const App = () => {
  let backAction = null;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackHandle);
    return async () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackHandle);
    };
  });
  useEffect(() => {
    ServiceFirebase.checkPermission();
  }, []);
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);
  const onBackHandle = () => {
    if (backAction + 2000 > new Date().getTime()) {
      BackHandler.exitApp();
    }
    backAction = new Date().getTime();
    ToastAndroid.show('Bấm thêm lần nữa để thoát!', ToastAndroid.SHORT);
    return true;
  };

  return (
    <ProviderPaper>
      <Provider store={redux.store}>
        <StatusBar backgroundColor={Colors.main} />
        <LocalizationProvider />
      </Provider>
    </ProviderPaper>
  );
};
// const codePushOptions = {
//   checkFrequency: codePush.CheckFrequency.ON_APP_START,
//   installMode: codePush.InstallMode.IMMEDIATE,
// };
// export default codePush(codePushOptions)(App);
export default App;
