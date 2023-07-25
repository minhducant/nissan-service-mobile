import React from 'react';
import {Container} from 'native-base';
import normalize from 'react-native-normalize';
import {SafeAreaView, StyleSheet} from 'react-native';

import {Colors} from '@styles/index';
import {Header} from '@components/headers/index';
import FormBody from '@components/customer_timeline/FormBody';

export default function FullScreenCustomer({navigation, route}) {
  const childCompRef = React.useRef();
  const [isEdit, setIsEdit] = React.useState(false);
  const onAction = () => {
    childCompRef.current.onSetShowSearch();
  };
  const onGoBack = () => {
    navigation.goBack();
    setIsEdit(false);
  };
  return (
    <Container>
      <Header
        title={'Timeline khách hàng'}
        hasAction={true}
        actions={{
          create_customer: 'arrow-up-down-bold',
        }}
        onAction={onAction}
        cancelCreate={true}
        onGoBack={onGoBack}
      />
      <SafeAreaView style={styles.container}>
        <FormBody
          // type={'full'}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          ref={childCompRef}
        />
      </SafeAreaView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: normalize(2),
  },
});
