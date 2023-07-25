import React, {useContext} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';

import {LocalizationContext} from '@context/index';
import {receptionStyles as styles} from '@styles/index';

const NEW = 'new';
const DRAFT = 'draft';
const HANDING = 'handing';
const Footer = ({onPress, disabled}) => {
  const roles = useSelector((st) => st.auth.user.roles);
  const {t} = useContext(LocalizationContext);
  const {
    totalReceiveOk,
    totalReceiveNg,
    totalHandingOk,
    totalHandingNg,
    state,
  } = useSelector((st) => st.appointment);

  return (
    <View style={styles.footerContain}>
      {state.key === NEW && (
        <>
          <TouchableOpacity
            onPress={() => onPress('signature')}
            style={styles.btnUpdate}>
            <Text style={styles.txtUpdate}>{t('signature')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPress('save')}
            style={styles.btnSave}>
            <Text style={styles.txtSave}>{t('save')}</Text>
          </TouchableOpacity>
        </>
      )}
      {state.key === DRAFT && (
        <>
          <TouchableOpacity
            onPress={() => onPress('signature')}
            style={styles.btnUpdate}>
            <Text style={styles.txtUpdate}>{t('signature')}</Text>
          </TouchableOpacity>
          {!disabled ? (
            <TouchableOpacity
              onPress={() => {
                onPress('update');
              }}
              style={styles.btnUpdate}>
              <Text style={styles.txtUpdate}>{t('update')}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                onPress('edit');
              }}
              style={styles.btnSave}>
              <Text style={styles.txtSave}>{t('edit')}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => onPress('receive_car')}
            style={styles.btnUpdate}>
            <Text style={styles.txtUpdate}>{t('receive_car')}</Text>
          </TouchableOpacity>
        </>
      )}
      {state.key === HANDING && (
        <>
          <TouchableOpacity
            onPress={() => onPress('signature')}
            style={styles.btnUpdate}>
            <Text style={styles.txtUpdate}>{t('signature')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPress('update_checklist')}
            style={styles.btnUpdate}>
            <Text style={styles.txtUpdate}>{t('update_checklist')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPress('vehicle_handing')}
            style={styles.btnUpdate}>
            <Text style={styles.txtUpdate}>{t('vehicle_handing')}</Text>
          </TouchableOpacity>
        </>
      )}
      {state.key === 'received' && (
        <TouchableOpacity
          onPress={() => onPress('action_assign_advisor')}
          style={styles.btnUpdate}>
          <Text style={styles.txtUpdate}>Giao xe cho CVDV</Text>
        </TouchableOpacity>
      )}
      {state.key === 'assigned' && (
        <TouchableOpacity
          onPress={() => onPress('action_accept_assign')}
          style={styles.btnUpdate}>
          <Text style={styles.txtUpdate}>Đã nhận điều phối</Text>
        </TouchableOpacity>
      )}
      {(roles?.izi_security === 'group_service_adviser' ||
        roles?.izi_security === 'group_repair_manage_workshop') &&
        state.key === 'assign_accepted' && (
          <TouchableOpacity
            onPress={() => onPress('assign_accepted')}
            style={styles.btnUpdate}>
            <Text style={styles.txtUpdate}>Tạo báo giá nhanh</Text>
          </TouchableOpacity>
        )}
      <View style={styles.footerTab}>
        <Text style={styles.txtTotal}>
          {t('receive')}: OK/NG: {totalReceiveOk}/{totalReceiveNg}
        </Text>
        <Text style={styles.txtTotal}>
          {t('handed')}: OK/NG: {totalHandingOk}/{totalHandingNg}
        </Text>
      </View>
    </View>
  );
};
export default React.memo(Footer);
