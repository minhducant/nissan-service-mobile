import message from '@react-native-firebase/messaging';
import {getFirebaseToken, setFirebaseToken} from '@configs/LocalStorage';

export const ServiceFirebase = {
  getTokenFirebase: async () => {
    const tokenFireBase = await getFirebaseToken();
    if (!tokenFireBase) {
      const token = await message().getToken();
      const newToken = await setFirebaseToken(token);
      return newToken;
    }
  },
  checkPermission: async () => {
    message()
      .hasPermission()
      .then(async (enabled) => {
        if (enabled) {
          await ServiceFirebase.getTokenFirebase();
        } else {
          await ServiceFirebase.requestPermission();
        }
      })
      .catch((error) => {
        return `[FCMService] Permission rejected ${error}`;
      });
  },
  requestPermission: async () => {
    try {
      await message().requestPermission();
      ServiceFirebase.getTokenFirebase();
    } catch (err) {
      return '----permission rejected-----';
    }
  },
};
