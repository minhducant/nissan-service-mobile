import React from 'react';
import {Container} from 'native-base';
import normalize from 'react-native-normalize';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '@styles/index';
import {Header} from '@components/headers/index';
import FormBody from '@components/workshop_timeline/FormBody';

const FullScreen = () => {
  const params = useRoute().params;
  const navigation = useNavigation();
  const [isEdit, setIsEdit] = React.useState(false);
  const childCompRef = React.useRef();
  const onAction = () => {
    childCompRef.current.onSetShowSearch();
  };
  const onGoBack = () => {
    navigation.goBack();
    setIsEdit(false);
  };

  // console.log(params.timelineType);

  return (
    <Container>
      <Header
        title={
          params.timelineType === 'mixture_timeline'
            ? 'Timeline hỗn hợp'
            : params.timelineType === 'general_timeline'
            ? 'Timeline sữa chữa chung'
            : 'Timeline đồng sơn'
        }
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
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          ref={childCompRef}
          timelineType={params.timelineType}
          isShowStartingPoints={true}
          isShowStartingPoint={true}
        />
      </SafeAreaView>
    </Container>
  );
};

export default FullScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: normalize(2),
  },
});
