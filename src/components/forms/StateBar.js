import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {Colors, FontFamily, FontSizeNormalize} from '@styles/index';

function StateBar({data = [], color = {}, onPress}) {
  return (
    <View style={styles.container}>
      {data.length <= 5
        ? data.map((item, index) => {
            return (
              <TouchableOpacity
                key={index.toString()}
                style={styles.itemContain}
                onPress={() => onPress(item)}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.stateCon}>
                  <View
                    style={[
                      styles.stateColor,
                      {
                        backgroundColor: color[item.key],
                      },
                    ]}>
                    <Text style={styles.value}>{item.total}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        : data.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => onPress(item)}
                key={index.toString()}
                style={styles.stateCon2}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.nameItem}>
                  <View
                    style={[
                      styles.stateColor,
                      {
                        backgroundColor: color[item.key],
                      },
                    ]}>
                    <Text style={styles.value}>{item.total}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
    </View>
  );
}
export default React.memo(StateBar);
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  itemContain: {
    backgroundColor: Colors.white,
    padding: 5,
    width: '19%',
    flexDirection: 'row',
    marginLeft: 10,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 3,
  },
  name: {
    flex: 1,
    textAlign: 'center',
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.xSmall,
    textAlignVertical: 'center',
  },
  stateCon: {
    padding: 5,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateColor: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.xSmall,
  },
  stateCon2: {
    flex: 1,
    backgroundColor: Colors.white,
    marginHorizontal: 5,
    borderRadius: 10,
    height: 100,
    padding: 3,
  },
  nameItem: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
