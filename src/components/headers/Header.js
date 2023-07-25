import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {Colors, FontFamily, IconSize, FontSizeNormalize} from '@styles/index';
import {View} from 'react-native';

export default function Header({
  hasBack = true,
  title = '',
  titleStyle = {},
  headerContainer = {},
  actions = {
    create_customer: 'account-plus-outline',
  },
  onAction,
  hasAction = true,
  cancelCreate = false,
  onGoBack,
}) {
  const navigation = useNavigation();
  const onBackAction = () => {
    if (!cancelCreate) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    } else {
      onGoBack();
    }
  };

  return (
    <View style={[styles.header, headerContainer]}>
      {hasBack && (
        <Appbar.BackAction
          onPress={onBackAction}
          size={IconSize.normal}
          color={Colors.white}
        />
      )}
      <Appbar.Content {...{title}} titleStyle={[styles.title, titleStyle]} />
      {hasAction &&
        Object.entries({...actions}).map(([key, icon]) => (
          <Appbar.Action
            key={key}
            icon={icon}
            size={IconSize.normal}
            onPress={() => onAction(key)}
            color={Colors.white}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.main,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    textAlign: 'left',
    textAlignVertical: 'auto',
    color: Colors.white,
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.normal,
  },
});
