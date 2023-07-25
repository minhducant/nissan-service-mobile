import React, {Suspense, useRef, useContext, useState} from 'react';
import {Spinner} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, SafeAreaView, Animated, ScrollView} from 'react-native';

import {showMessage} from '@common/index';
import {css, SCREEN_WIDTH} from '@styles/index';
import {Header} from '@components/headers/index';
import {setLoading} from '@stores/config/actions';
import Footer from '@components/quotation/Footer';
import {LocalizationContext} from '@context/index';
import {GET, PUT} from '@repository/quotation/index';
import ButtonTabs from '@components/quotation/ButtonTabs';
import CustomerTab from '@components/quotation/CustomerTab';
import {receptionStyles as styles, Colors} from '@styles/index';
import ServiceInformation from '@components/quotation/ServiceInformation';
import {
  setServiceLabor,
  setServiceMaterial,
  setTotalServiceUndiscount,
  setTotalService,
  setTotalMaterialUndiscount,
  setTotalMaterial,
  setTotalAmountUndiscount,
  setTotalAmount,
  setAmountDiscount,
  setAmountTax,
  setAmountCustomerTotal,
  setAmountInsurance,
  setAmountInternal,
  setCustomerSignature,
  setAdvisorSignature,
} from '@stores/appointment/actions';

const Report = ({navigation, route}) => {
  const {item} = route.params;
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const childCompRef = useRef();
  const updateSignatureRef = useRef();
  const {t} = useContext(LocalizationContext);
  const {isLoading} = useSelector((st) => st.conf);
  const {accessToken} = useSelector((st) => st.auth);
  const x = useRef(new Animated.Value(0)).current;
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isSign, setIsSign] = useState(false);
  const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

  React.useEffect(() => {
    _getDetailQuotation();
    dispatch(setCustomerSignature(''));
    dispatch(setAdvisorSignature(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _getDetailQuotation = async () => {
    dispatch(setLoading(true));
    GET.getDetailQuotation({quotation_id: item.id, accessToken: accessToken})
      .then((res) => {
        setData(res.data);
        dispatch(
          setServiceLabor(
            Object.fromEntries(res.data.service_information).service_info_labor,
          ),
        );
        dispatch(
          setServiceMaterial(
            Object.fromEntries(res.data.service_information)
              .service_info_material,
          ),
        );
        dispatch(
          setTotalServiceUndiscount(res.data.x_amount_total_service_undiscount),
        );
        dispatch(setTotalService(res.data.amount_total_service));
        dispatch(
          setTotalMaterialUndiscount(
            res.data.x_amount_total_material_undiscount,
          ),
        );
        dispatch(setTotalMaterial(res.data.amount_total_material));
        dispatch(setTotalAmountUndiscount(res.data.x_total_amount_undiscount));
        dispatch(setTotalAmount(res.data.amount_total));
        dispatch(setAmountDiscount(res.data.amount_discount));
        dispatch(setAmountTax(res.data.amount_tax));
        dispatch(setAmountCustomerTotal(res.data.amount_customer_total));
        dispatch(setAmountInsurance(res.data.amount_insurance_total));
        dispatch(setAmountInternal(res.data.amount_internal_total));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        showMessage(err);
        // console.log(err);
        dispatch(setLoading(false));
      });
  };

  const handleButton = (key) => {
    dispatch(setLoading(true));
    if (key === 'view') {
      dispatch(setLoading(false));
      navigation.navigate('ViewReport', {
        item: item || [],
      });
    }
    if (key === 'edit') {
      dispatch(setLoading(false));
      setIsEdit(true);
      setIsSign(false);
    }
    if (key === 'update') {
      childCompRef.current.onUpdateQuotation();
      setIsSign(false);
    }
    if (key === 'cancel') {
      dispatch(setLoading(false));
      dispatch(setCustomerSignature(''));
      dispatch(setAdvisorSignature(''));
      _getDetailQuotation();
      setIsEdit(false);
      setIsSign(false);
    }
    if (key === 'sign') {
      dispatch(setLoading(false));
      setIsEdit(false);
      setIsSign(true);
    }
    if (key === 'update_signature') {
      updateSignatureRef.current.updateSignature();
      setIsEdit(false);
    }
    if (key === 'create') {
      const params = {
        accessToken: accessToken,
        quotationId: item.id,
        action: 'action_confirm_rfq',
      };
      PUT.createAction(params)
        .then((res) => {
          dispatch(setLoading(false));
          showMessage('Tạo lệnh sửa chữa thành công!');
          navigation.navigate('DetailRepairOrder', {
            item: res.data.data,
          });
        })
        .catch((err) => {
          dispatch(setLoading(false));
          showMessage(err);
          // console.log(err);
        });
    }
  };

  const onGoBack = () => {
    navigation.navigate('QuotationScreen');
    dispatch(setCustomerSignature(''));
    dispatch(setAdvisorSignature(''));
  };

  const onScroll = Animated.event([{nativeEvent: {contentOffset: {x}}}], {
    useNativeDriver: false,
  });

  const onActionChangeTab = (activeTab) => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTo({
        x: activeTab * SCREEN_WIDTH,
        y: 0,
        animate: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.containerCreate}>
      <Header
        title={item?.name}
        hasAction={false}
        cancelCreate={true}
        onGoBack={onGoBack}
      />
      {isLoading ? (
        <></>
      ) : (
        <>
          <View style={styles.titleCheckOrder}>
            <View style={css.fdR}>
              <ButtonTabs onPress={onActionChangeTab} x={x} />
              <View style={{width: SCREEN_WIDTH / 7}} />
              <View style={styles.numCheckOrder}>
                <View style={styles.numCheckOrderCon}>
                  <Text style={styles.txtCheckOrder}>Số báo giá</Text>
                </View>
                <View style={styles.titleNumCheckOder}>
                  <Text style={styles.txtReceptionName}>{data.name}</Text>
                </View>
                <View style={styles.numCheckOrderCon}>
                  <Text style={styles.txtCheckOrder}>
                    {t(data.state || '')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <AnimatedScrollView
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            scrollEnabled={false}
            horizontal
            pagingEnabled
            onScroll={onScroll}>
            <Suspense
              fallback={
                <Spinner color={Colors.main} style={{width: SCREEN_WIDTH}} />
              }>
              <CustomerTab
                item={data}
                isSign={isSign}
                setIsSign={setIsSign}
                ref={updateSignatureRef}
                _getDetailQuotation={_getDetailQuotation}
              />
              <ServiceInformation
                item={data}
                disabled={true}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                ref={childCompRef}
                _getDetailQuotation={_getDetailQuotation}
              />
            </Suspense>
          </AnimatedScrollView>
          <Footer
            onPress={handleButton}
            state={data?.state}
            isEdit={isEdit}
            isSign={isSign}
            orderId={data?.repair_order_id}
            have_signature_adviser={data?.have_signature_adviser}
            have_signature_client={data?.have_signature_client}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Report;
