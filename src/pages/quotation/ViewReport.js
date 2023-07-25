import React from 'react';
import Pdf from 'react-native-pdf';
import RNPrint from 'react-native-print';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView, StyleSheet} from 'react-native';

import {showMessage} from '@common/index';
import {GET} from '@repository/quotation/index';
import {Header} from '@components/headers/index';
import {setLoading} from '@stores/config/actions';
import FooterPrinter from '@components/quotation/FooterPrinter';

const ViewReport = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {item} = route.params;
  const {accessToken} = useSelector((st) => st.auth);
  const [reportLink, setReportLink] = React.useState('');

  React.useEffect(() => {
    _previewReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _previewReport = async () => {
    dispatch(setLoading(true));
    GET.getQuotationReport({quotation_id: item.id, accessToken: accessToken})
      .then((res) => {
        setReportLink(res.data.url_public);
        dispatch(setLoading(false));
      })
      .catch((err) => {
        showMessage(err);
        // console.log(err);
        dispatch(setLoading(false));
      });
  };

  const printQuote = async () => {
    await RNPrint.print({
      filePath: reportLink,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={item.name} hasAction={false} />
      <Pdf
        trustAllCerts={false}
        showsVerticalScrollIndicator={false}
        onPageChanged={(page, numberOfPages) => {
          showMessage(`Trang hiện tại: ${page}/${numberOfPages}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        style={styles.pdf}
        source={{
          uri: reportLink,
          cache: true,
          expiration: 604800,
        }}
      />
      <FooterPrinter printQuote={printQuote} />
    </SafeAreaView>
  );
};

export default ViewReport;

const styles = StyleSheet.create({
  pdf: {height: '85.5%', width: '100%'},
});
