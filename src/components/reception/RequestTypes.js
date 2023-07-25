import React, {useContext, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {CheckBox} from 'react-native-elements';
import {Textarea} from 'native-base';

import {LocalizationContext} from '@context/index';
import {Colors} from '@styles/index';
import {receptionStyles as styles} from '@styles/index';
import {setCheckType, setCustomerRequest} from '@stores/appointment/actions';

const RequestTypes = ({disabled = false}) => {
  const {t} = useContext(LocalizationContext);
  const requestTypes = [
    {code: 'repair', id: 1, name: 'Sửa chữa thông thường'},
    {code: 'repair_insurance', id: 2, name: 'Sửa chữa bảo hiểm'},
    {code: 'guarantee', id: 3, name: 'Bảo hành'},
    {code: 'repair_internal', id: 5, name: 'Sửa chữa nội bộ'},
    {code: 'pdi', id: 6, name: 'PDI'},
  ];
  const {checkType, customerRequest} = useSelector(
    (state) => state.appointment,
  );
  const dispatch = useDispatch();
  const [mapTypes, setMapTypes] = useState(checkType);
  const onSelect = (item) => {
    setMapTypes((prev) =>
      mapTypes.includes(item.id)
        ? prev.filter((e) => e !== item.id)
        : prev.concat([item.id]),
    );
    dispatch(
      setCheckType(
        checkType.includes(item.id)
          ? checkType.filter((e) => e !== item.id)
          : checkType.concat([item.id]),
      ),
    );
  };
  const onChangeText = (text) => {
    dispatch(setCustomerRequest(text));
  };
  const renderCheckBox = ({item, index}) => {
    return (
      <View key={index.toString()}>
        <CheckBox
          onPress={() => {
            onSelect(item);
          }}
          checked={mapTypes.includes(item.id)}
          title={item.name}
          activeOpacity={0.8}
          key={index.toString()}
          iconType="material-community"
          checkedIcon="checkbox-marked"
          containerStyle={styles.checkItemCon}
          uncheckedIcon="checkbox-blank-outline"
          checkedColor={Colors.main}
          textStyle={styles.txtCheckBox}
        />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        horizontal
        data={requestTypes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderCheckBox}
      />
      <Textarea
        bordered
        rowSpan={5}
        style={styles.requestOfCustomerText}
        placeholder={t('request_of_customer') + ' *'}
        value={customerRequest}
        disabled={disabled}
        onChangeText={onChangeText}
      />
    </View>
  );
};
export default React.memo(RequestTypes);
