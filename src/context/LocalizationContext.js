import React, {useMemo, useState, useEffect} from 'react';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import {useSelector, useDispatch} from 'react-redux';

import vi from '@i18n/vi.json';
import en from '@i18n/en.json';
import {
  LoadingModal,
  LoadingIconAnimated,
} from '@components/modals/loading/index';
import {LocalizationContext} from './index';
import AuthenticationProvider from './Authentication';
import {
  getAppointmentsFilter,
  getProgressFilter,
  getQuotationsFilter,
  getReceptionsFilter,
  getVehicleHandingFilter,
  getRequestTypes,
  getCheckListTypes,
  getListBrand,
  getListModel,
  getListCountry,
  getListProvince,
  getListDistrict,
  getListWard,
  getCheckList,
} from '@stores/config/actions';
i18n.fallbacks = true;
i18n.translations = {vi, en};

export default function LocalizationProvider() {
  const [locale, setLocale] = useState('vi');
  const {isLoading} = useSelector((st) => st.conf);
  const dispatch = useDispatch();
  useEffect(() => {
    const currentLanguage = RNLocalize.findBestAvailableLanguage(
      Object.keys({
        en,
        vi,
      }),
    );
    setLocale(currentLanguage?.languageTag || 'vi');
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const localizationContext = useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, {locale, ...options}),
      locale,
      setLocale,
    }),
    [locale],
  );
  const initData = () => {
    dispatch(getAppointmentsFilter());
    dispatch(getReceptionsFilter());
    dispatch(getQuotationsFilter());
    dispatch(getProgressFilter());
    dispatch(getVehicleHandingFilter());
    dispatch(getRequestTypes());
    dispatch(getCheckListTypes());
    dispatch(getCheckList());
    dispatch(getListBrand());
    dispatch(getListModel());
    dispatch(getListCountry());
    dispatch(getListProvince());
    dispatch(getListDistrict());
    dispatch(getListWard());
  };
  return (
    <LocalizationContext.Provider value={localizationContext}>
      <AuthenticationProvider />
      {/* <LoadingModal visible={isLoading} /> */}
      <LoadingIconAnimated isLoading={isLoading} />
    </LocalizationContext.Provider>
  );
}
