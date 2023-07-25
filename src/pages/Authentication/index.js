import React, {useState, useContext, useRef, useEffect} from 'react';
import {Container, Content, Icon, Form, Item} from 'native-base';
import {
  View,
  Image,
  Alert,
  TextInput,
  Keyboard,
  Animated,
  Platform,
} from 'react-native';
import {Button} from 'react-native-paper';
import {CheckBox} from 'react-native-elements';

import {Header} from '@components/headers/index';
import {authenticationStyles as styles, Colors} from '@styles/index';
import {AuthenticationContext, LocalizationContext} from '@context/index';
import {Icons} from '@common/index';
import {getFirebaseToken} from '@configs/LocalStorage';
const IMG = require('@assets/images/background_auth2.png');
const CONTENT_LOGO = require('@assets/icons/logo.png');

const imageSpaceTop = new Animated.Value(220);
const imageSpaceLeft = new Animated.Value(420);
const imageHeight = new Animated.Value(100);
const imageWidth = new Animated.Value(100);
const backgroundBorderWidth = new Animated.Value(1);
const backgroundHeight = new Animated.Value(220);
const buttonHeight = new Animated.Value(100);

const showKeyBoard = () => {
  Animated.timing(imageSpaceTop, {
    toValue: 5,
    easing: Animated.easing,
    useNativeDriver: false,
  }).start();
  Animated.timing(imageSpaceLeft, {
    toValue: 330,
    easing: Animated.easing,
    useNativeDriver: false,
  }).start();
  Animated.timing(imageHeight, {
    toValue: 0,
    easing: Animated.easing,
    useNativeDriver: false,
  }).start();
  Animated.timing(imageWidth, {
    toValue: 0,
    easing: Animated.easing,
    useNativeDriver: false,
  }).start();
  Animated.timing(backgroundBorderWidth, {
    toValue: 0,
    easing: Animated.easing,
    useNativeDriver: false,
  }).start();
  Animated.timing(backgroundHeight, {
    toValue: 0,
    easing: Animated.easing,
    useNativeDriver: false,
  }).start();
  Animated.timing(buttonHeight, {
    toValue: 50,
    easing: Animated.easing,
    useNativeDriver: false,
  }).start();
};

const hideKeyBoard = () => {
  Animated.timing(imageSpaceTop, {
    toValue: 220,
    easing: Animated.easing,
    useNativeDriver: false,
  }).start();
  Animated.timing(imageSpaceLeft, {
    toValue: 420,
    easing: Animated.easing,
    useNativeDriver: false,
  }).start();
  Animated.timing(imageHeight, {
    toValue: 100,
    easing: Animated.easing,
    useNativeDriver: false,
  }).start();
  Animated.timing(imageWidth, {
    toValue: 100,
    easing: Animated.easing,
    useNativeDriver: false,
  }).start();
  Animated.timing(backgroundBorderWidth, {
    toValue: 1,
    easing: Animated.easing,
    useNativeDriver: false,
  }).start();
  Animated.timing(backgroundHeight, {
    toValue: 220,
    easing: Animated.easing,
    useNativeDriver: false,
  }).start();
  Animated.timing(buttonHeight, {
    toValue: 100,
    easing: Animated.easing,
    useNativeDriver: false,
  }).start();
};

export default function Authentication() {
  const {signIn} = useContext(AuthenticationContext);
  const {t} = useContext(LocalizationContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(true);
  const textAreaEl = useRef(null);
  useEffect(() => {
    let show;
    let hide;
    Platform.OS === 'ios'
      ? ((show = Keyboard.addListener('keyboardWillShow', showKeyBoard)),
        (hide = Keyboard.addListener('keyboardWillHide', hideKeyBoard)))
      : ((show = Keyboard.addListener('keyboardDidShow', showKeyBoard)),
        (hide = Keyboard.addListener('keyboardDidHide', hideKeyBoard)));
    return () => {
      show.remove();
      hide.remove();
    };
  });

  const onSignIn = async () => {
    if (!username || !password) {
      Alert.alert(t('error'), t('user_pass_require'), [
        {
          text: t('accept'),
        },
      ]);
    } else {
      const firebaseToken = await getFirebaseToken();
      signIn({login: username, password, rememberPassword, firebaseToken});
    }
  };

  return (
    <Container>
      <Header
        hasBack={false}
        hasAction={false}
        title="NISSAN SERVICE"
        titleStyle={styles.titleHeader}
        headerContainer={styles.headerContainer}
      />
      <Animated.View
        style={{
          ...styles.contentHeader,
          top: imageSpaceTop,
          height: imageHeight,
          width: imageWidth,
        }}>
        <Image source={CONTENT_LOGO} style={styles.contentLogo} />
      </Animated.View>
      <Content contentContainerStyle={styles.containerStyles}>
        <Animated.View
          style={{
            ...styles.mainContent,
            borderWidth: backgroundBorderWidth,
          }}>
          <Animated.View
            style={{
              ...styles.imgContainer,
              height: backgroundHeight,
            }}>
            <Image source={IMG} style={styles.image} />
          </Animated.View>
          <View style={styles.contentBox}>
            <View style={styles.content}>
              <View style={styles.contentInput}>
                <Form>
                  <Item>
                    <Icon
                      name={Icons.account.name}
                      type={Icons.account.type}
                      style={styles.iconInput}
                    />
                    {/* <IcAccount style={{width: 15, height: 15}} /> */}
                    <TextInput
                      value={username}
                      autoCapitalize="none"
                      style={styles.textInput}
                      placeholder={t('account')}
                      placeholderTextColor={Colors.black}
                      onChangeText={(text) => setUsername(text)}
                      onSubmitEditing={() => {
                        textAreaEl.current.focus();
                      }}
                      blurOnSubmit={false}
                    />
                  </Item>
                  <Item>
                    <Icon
                      name={Icons.lock.name}
                      type={Icons.lock.type}
                      style={styles.iconInput}
                    />
                    <TextInput
                      value={password}
                      autoCapitalize="none"
                      style={styles.textInput}
                      placeholder={t('password')}
                      placeholderTextColor={Colors.black}
                      secureTextEntry={!showPassword}
                      onChangeText={(text) => setPassword(text)}
                      ref={textAreaEl}
                    />
                    <Icon
                      name={showPassword ? 'eye-with-line' : 'eye'}
                      type="Entypo"
                      onPress={() => setShowPassword((prev) => !prev)}
                      style={styles.iconPass}
                    />
                  </Item>
                </Form>
              </View>
              <View style={styles.contentButton}>
                <View style={styles.rememberContainer}>
                  <CheckBox
                    activeOpacity={0.7}
                    checked={rememberPassword}
                    title={t('remember_password')}
                    textStyle={styles.rememberText}
                    containerStyle={styles.checkBoxCon}
                    checkedColor="black"
                    onPress={() => setRememberPassword((prev) => !prev)}
                  />
                </View>
              </View>
            </View>
            <Animated.View
              style={{
                ...styles.buttonContainer,
                height: buttonHeight,
              }}>
              <Button
                mode="contained"
                uppercase={false}
                onPress={() => onSignIn()}
                style={styles.button}
                labelStyle={styles.buttonText}
                color={Colors.main}>
                {t('sign_in')}
              </Button>
            </Animated.View>
          </View>
        </Animated.View>
      </Content>
    </Container>
  );
}
