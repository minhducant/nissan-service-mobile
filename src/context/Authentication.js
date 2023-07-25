import React, {useEffect, useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {AuthenticationContext} from './index';
import MainScreen from '@routes/index';
import Authentication from '@pages/Authentication/index';
import {NoHeaderScreens} from '@routes/NoHeader';
import {POST} from '@repository/authentication/index';
import {showMessage} from '@common/index';
import {setLoading} from '@stores/config/actions';
import {setUser, setToken} from '@stores/auth/actions';
import {
  setAccessToken,
  setLocalStorage,
  getLocalStorage,
  STORAGE_KEYS,
  getAccessToken,
} from '@configs/LocalStorage';

const Stack = createStackNavigator();

const AuthenticationProvider = () => {
  const dispatch = useDispatch();
  const {accessToken} = useSelector((st) => st.auth);
  useEffect(() => {
    dispatch(setLoading(true));
    const getUser = async () => {
      const userDB = await getLocalStorage(STORAGE_KEYS.USER);
      const accessTokenDB = await getAccessToken();
      if (userDB && accessTokenDB) {
        await dispatch(setToken(accessTokenDB));
        dispatch(setUser(userDB));
      } else {
        dispatch(setLoading(false));
      }
    };
    getUser();
  }, [dispatch]);
  const authContext = useMemo(
    () => ({
      signIn: (params) => {
        dispatch(setLoading(true));
        POST.signIn({...params})
          .then((res) => {
            if (Object.entries(res.data).length === 0) {
              // setAccessToken({value: ''});
              // setUserLogin({value: {}});
              dispatch(setLoading(false));
              showMessage('Đăng nhập thất bại, vui lòng kiểm tra lại!');
            } else {
              if (params.rememberPassword === true) {
                setAccessToken(res.data.access_token);
                setLocalStorage(STORAGE_KEYS.USER, res.data);
                // console.log(res.data.access_token);
              }
              dispatch(setToken(res.data.access_token));
              dispatch(setUser(res.data));
              // setUserLogin({value: res});
              // console.log('res', res.data);
              dispatch(setLoading(false));
            }
          })
          .catch((err) => {
            if (__DEV__) {
              // console.log('err', err);
            }
            showMessage('Đăng nhập thất bại, vui lòng kiểm tra lại!');
            dispatch(setLoading(false));
          });
      },
      signOut: (params) => {},
    }),
    [dispatch],
  );
  const MainScreens = {
    MainScreen: MainScreen,
  };
  const AuthScreens = {
    Auth: Authentication,
  };
  return (
    <AuthenticationContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {Object.entries({
            ...(accessToken ? MainScreens : AuthScreens),
            ...NoHeaderScreens,
          }).map(([name, component]) => (
            <Stack.Screen name={name} component={component} key={name} />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
