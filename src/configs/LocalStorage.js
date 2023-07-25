import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  USER_KEY: '@USER_KEY',
  ACCESS_TOKEN: '@ACCESS_TOKEN',
  USERNAME: '@USERNAME',
  PASSWORD: '@PASSWORD',
  USER: '@USER',
  FIREBASE_TOKEN: '@FIREBASE_TOKEN',
};

export const setLocalStorage = async (name, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(name, jsonValue);
  } catch (error) {
    console.log(
      `Error when get local storage: \nname__${name}\nvalue:${value}`,
    );
  }
};

export const getLocalStorage = async (name) => {
  try {
    const jsonValue = await AsyncStorage.getItem(name);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(`Error when get local storage: \n${name}`);
  }
};

export const setAccessToken = async (value) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, value);
  } catch (error) {
    console.log(`Error when set access token: \n${value}`);
  }
};

export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    return accessToken !== null ? accessToken : null;
  } catch (error) {
    console.log('Error when get access token!!!');
  }
};

export const clearLocalStorage = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER,
      STORAGE_KEYS.USERNAME,
      STORAGE_KEYS.ACCESS_TOKEN,
      STORAGE_KEYS.USER_KEY,
      STORAGE_KEYS.PASSWORD,
    ]);
  } catch (error) {
    console.log('Error when clear local storage!!!');
  }
};
export const setFirebaseToken = async (value) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.FIREBASE_TOKEN, value);
  } catch (error) {
    console.log(`Error when set firebase token: \n${value}`);
  }
};

export const getFirebaseToken = async () => {
  try {
    const firebaseToken = await AsyncStorage.getItem(
      STORAGE_KEYS.FIREBASE_TOKEN,
    );
    return firebaseToken !== null ? firebaseToken : null;
  } catch (error) {
    console.log('Error when get firebase token!!!');
  }
};
