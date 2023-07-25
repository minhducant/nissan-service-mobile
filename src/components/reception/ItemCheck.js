import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {CheckBox} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {InputGrey} from '@components/forms/index';
import {setHanding, setReceive} from '@stores/appointment/actions';
import {tableCheckOrderStyles as styles, Colors} from '@styles/index';
const HANDING = 'handing';
const ItemCheck = ({item, index, disabled, section, numColumns = 2}) => {
  const {listCheckedReceive, listCheckedHanding, state} = useSelector(
    (st) => st.appointment,
  );
  const dispatch = useDispatch();
  const [receiveCheck, setReceiveCheck] = useState('');
  const [handingCheck, setHandingCheck] = useState('');

  const [txtReceive, setTxtReceive] = useState('');
  const [txtHanding, setTxtHanding] = useState('');
  useEffect(() => {
    if (Object.keys(listCheckedReceive[section][item.id]).length > 0) {
      const keyReceive = Object.keys(listCheckedReceive[section][item.id])[0];
      setReceiveCheck(keyReceive);
      setTxtReceive(listCheckedReceive[section][item.id][keyReceive]);
    }
    if (Object.keys(listCheckedHanding[section][item.id]).length > 0) {
      const keyHanding = Object.keys(listCheckedHanding[section][item.id])[0];
      setHandingCheck(keyHanding);
      setTxtHanding(listCheckedHanding[section][item.id][keyHanding]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onChangeReceiveText = (text) => {
    const newObj = {};
    newObj[Object.keys(listCheckedReceive[section][item.id])[0]] = text;
    dispatch(setReceive(section, item.id, newObj));
    setTxtReceive(text);
  };
  const onChangeHandingText = (text) => {
    const newObj = {};
    newObj[Object.keys(listCheckedHanding[section][item.id])[0]] = text;
    dispatch(setHanding(section, item.id, newObj));
    setTxtHanding(text);
  };
  const onNGAction = (period) => {
    if (period === 'receive') {
      if (receiveCheck === 'ok') {
        setReceiveCheck('ng');
        dispatch(
          setReceive(section, item.id, {
            ng: listCheckedReceive[section][item.id].ok,
          }),
        );
      }
    } else {
      if (handingCheck === 'ok') {
        setHandingCheck('ng');
        dispatch(
          setHanding(section, item.id, {
            ng: listCheckedHanding[section][item.id].ok,
          }),
        );
      }
    }
  };
  const onOKAction = (period) => {
    if (period === 'receive') {
      if (receiveCheck === 'ng') {
        setReceiveCheck('ok');
        dispatch(
          setReceive(section, item.id, {
            ok: listCheckedReceive[section][item.id].ng,
          }),
        );
      }
    } else {
      if (handingCheck === 'ng') {
        setHandingCheck('ok');
        dispatch(
          setHanding(section, item.id, {
            ok: listCheckedHanding[section][item.id].ng,
          }),
        );
      }
    }
  };
  return (
    <View style={styles.itemContain}>
      <Text style={styles.itemName}>{item.name}</Text>
      {/* receive */}
      <View style={styles.itemReception}>
        <View style={styles.checkBox}>
          <CheckBox
            Component={() => (
              <TouchableOpacity
                activeOpacity={0.6}
                disabled={disabled}
                onPress={() => onOKAction('receive')}
                style={[
                  styles.checkBoxItem,
                  {
                    backgroundColor: disabled ? Colors.gray : Colors.white,
                  },
                ]}>
                {receiveCheck === 'ok' && (
                  <Ionicons
                    name="md-checkmark-sharp"
                    color={Colors.green}
                    size={20}
                  />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.checkBox}>
          <TouchableOpacity
            activeOpacity={0.6}
            disabled={disabled}
            onPress={() => onNGAction('receive')}
            style={[
              styles.checkBoxItem,
              {
                backgroundColor: disabled ? Colors.gray : Colors.white,
              },
            ]}>
            {receiveCheck === 'ng' && (
              <Ionicons name="md-close" color={Colors.red} size={20} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.inputCon}>
          <InputGrey
            value={txtReceive}
            setValue={onChangeReceiveText}
            disabled={disabled}
          />
        </View>
      </View>
      {/* handing */}
      {numColumns === 2 ? (
        <View style={styles.itemReception}>
          <View style={styles.checkBox}>
            <CheckBox
              Component={() => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  disabled={state.key !== HANDING}
                  onPress={() => onOKAction('handing')}
                  style={[
                    styles.checkBoxItem,
                    {
                      backgroundColor:
                        state.key !== HANDING ? Colors.gray : Colors.white,
                    },
                  ]}>
                  {handingCheck === 'ok' && (
                    <Ionicons
                      name="md-checkmark-sharp"
                      color={Colors.green}
                      size={20}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.checkBox}>
            <TouchableOpacity
              activeOpacity={0.6}
              disabled={state.key !== HANDING}
              onPress={() => onNGAction('handing')}
              style={[
                styles.checkBoxItem,
                {
                  backgroundColor:
                    state.key !== HANDING ? Colors.gray : Colors.white,
                },
              ]}>
              {handingCheck === 'ng' && (
                <Ionicons name="md-close" color={Colors.main} size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.inputCon}>
            <InputGrey
              disabled={state.key !== HANDING}
              value={txtHanding}
              setValue={onChangeHandingText}
            />
          </View>
        </View>
      ) : (
        <View style={styles.itemReception} />
      )}
    </View>
  );
};
export default React.memo(ItemCheck);
