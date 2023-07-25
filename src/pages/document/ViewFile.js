import React from 'react';
import Pdf from 'react-native-pdf';
import {SafeAreaView, StyleSheet} from 'react-native';

import {URL_PUBLIC} from '@configs/Configs';
import {showMessage} from '@common/index';
import {Header} from '@components/headers/index';

export default function ViewFile({route}) {
  const {item} = route.params;
  // console.log(`${URL_PUBLIC}${item.url || item.document_link}`);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={item.name} hasAction={false} />
      <Pdf
        trustAllCerts={false}
        showsVerticalScrollIndicator={false}
        onLoadComplete={(numberOfPages, filePath) => {
          // console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          showMessage(`Trang hiện tại: ${page}/${numberOfPages}`);
        }}
        onError={(error) => {
          showMessage(error);
        }}
        onPressLink={(uri) => {
          // console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
        source={{
          uri: `${URL_PUBLIC}${item.url || item.document_link}`,
          cache: true,
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  pdf: {height: '100%', width: '100%'},
});
