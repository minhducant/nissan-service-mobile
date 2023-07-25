import React, {useContext, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';

import {tableCheckOrderStyles as styles, css, Colors} from '@styles/index';
import {LocalizationContext} from '@context/index';
import ItemCheck from './ItemCheck';

const TableCheckOrder = ({
  numColumns = 2,
  data,
  section,
  disabled,
  hasTitle = true,
}) => {
  const {t} = useContext(LocalizationContext);
  const [listItem, setListItem] = useState(data);
  const renderHeader = () => {
    if (hasTitle) {
      return (
        <>
          <View style={styles.title}>
            <View style={css.fx_2}>
              <Text style={styles.txtTitle}>{t('check_information')}</Text>
            </View>
            <View style={css.fx_1}>
              <Text style={styles.txtTitle}>{t('reception_state')}</Text>
            </View>
            <View style={css.fx_1}>
              {numColumns === 2 && (
                <Text style={styles.txtTitle}>
                  {t('vehicle_handing_state')}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.noteContain}>
            <View style={css.fx_2} />
            <View style={styles.okTitle}>
              <Text style={styles.txtOk}>OK</Text>
              <Text style={styles.txtOk}>NG</Text>
              <Text style={styles.txtNote}>{t('note')}</Text>
            </View>
            {numColumns === 2 ? (
              <View style={styles.okTitle}>
                <Text style={styles.txtOk}>OK</Text>
                <Text style={styles.txtOk}>NG</Text>
                <Text style={styles.txtNote}>{t('note')}</Text>
              </View>
            ) : (
              <View style={styles.okTitle} />
            )}
          </View>
        </>
      );
    }
  };
  return (
    <ScrollView style={styles.container}>
      {renderHeader()}
      {listItem.map((item, index) => {
        return (
          <ItemCheck
            key={index.toString()}
            item={item}
            index={index}
            disabled={disabled}
            section={section}
            numColumns={numColumns}
          />
        );
      })}
    </ScrollView>
  );
};
export default React.memo(TableCheckOrder);
