import React, {useContext} from 'react';
import {View, Modal, FlatList, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';

import css from '@styles/css';
import {LocalizationContext} from '@context/index';
import {modalCheckOrderSty as styles} from '@styles/index';

const modalConfig = {
  transparent: true,
  animationType: 'none',
  key: 'warning_check_order',
};

const WarningCheckOrder = ({
  isShow,
  setIsShow,
  warningData,
  setWarningData,
}) => {
  const {t} = useContext(LocalizationContext);
  const onDismiss = () => {
    setIsShow(false);
    setWarningData([]);
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={index.toString()}>
        <Text style={{...css.txtBlackColor}}>{`-  ${item.title}`}</Text>
        {item.data.map((it, ix) => (
          <Text
            style={{...css.txtBlackColor}}
            key={ix.toString()}>{`\t+   ${it}`}</Text>
        ))}
      </View>
    );
  };

  return (
    <Modal {...modalConfig} visible={isShow} onRequestClose={onDismiss}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.headerCon}>
            <Ionicons name="warning" color="#fff" size={30} />
            <Text style={styles.textHeader}>{t('warning')}</Text>
          </View>
          <FlatList
            data={warningData}
            stick
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.contentError}
          />
          <TouchableOpacity onPress={onDismiss} style={styles.button}>
            <Text style={styles.textHeader}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

WarningCheckOrder.propTypes = {
  warningData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  isShow: PropTypes.bool.isRequired,
  setIsShow: PropTypes.func.isRequired,
};

export default WarningCheckOrder;
