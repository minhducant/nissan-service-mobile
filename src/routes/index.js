import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import HomeScreen from '@pages/index';
import AppointmentScreen from '@pages/appointment/index';
import ProgressScreen from '@pages/progress/index';
import QuotationScreen from '@pages/quotation/index';
import ReceptionScreen from '@pages/reception/index';
import VehicleHandingScreen from '@pages/vehicle_handing/index';
import ReportScreen from '@pages/report/index';
import {clearLocalStorage} from '@configs/LocalStorage';
import {setToken} from '@stores/auth/actions';
import AdvisoryScreen from '@pages/advisory/index';
import NewsScreen from '@pages/news/index';
import RepairOrderScreen from '@pages/repair_order/index';
import VideoScreen from '@pages/video/index';
import DocumentScreen from '@pages/document/index';
import MixtureTimeline from '@pages/workshop_timeline/MixtureTimeline';
import GeneralTimeline from '@pages/workshop_timeline/GeneralTimeline';
import PaintTimeline from '@pages/workshop_timeline/PaintTimeline';
import CustomerTimeline from '@pages/customer_timeline/index';
import {
  IcAppointment,
  IcLogo,
  IcVehicleHanding,
  IcHome,
  IcReception,
  IcQuotation,
  IcProgress,
  IcSignOut,
  IcReport,
  IcTimeLine,
  IcAdvisory,
  IcNews,
  IcRepair,
  IcVideo,
  IcPdf,
  IcCustomerTimeline,
} from '@common/svg/index';

import {menu} from '@data/index';
import {Colors, FontFamily, FontSizeNormalize} from '@styles/index';
const LOGO = require('@assets/icons/logo.png');
const Stack = createStackNavigator();
const ScreenContainer = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="NewsScreen" component={NewsScreen} />
      <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
      <Stack.Screen name="ProgressScreen" component={ProgressScreen} />
      <Stack.Screen name="QuotationScreen" component={QuotationScreen} />
      <Stack.Screen name="RepairOrderScreen" component={RepairOrderScreen} />
      <Stack.Screen name="ReceptionScreen" component={ReceptionScreen} />
      <Stack.Screen
        name="VehicleHandingScreen"
        component={VehicleHandingScreen}
      />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
      <Stack.Screen name="AdvisoryScreen" component={AdvisoryScreen} />
      <Stack.Screen name="VideoScreen" component={VideoScreen} />
      <Stack.Screen name="DocumentScreen" component={DocumentScreen} />
      <Stack.Screen name="MixtureTimeline" component={MixtureTimeline} />
      <Stack.Screen name="CustomerTimeline" component={CustomerTimeline} />
      <Stack.Screen name="GeneralTimeline" component={GeneralTimeline} />
      <Stack.Screen name="PaintTimeline" component={PaintTimeline} />
    </Stack.Navigator>
  );
};
function Item({item, index, onPress}) {
  const renderIcon = (key, isSelected) => {
    switch (key) {
      case 'home':
        return <IcHome fill={isSelected ? Colors.main : Colors.white} />;
      case 'appointment':
        return <IcAppointment fill={isSelected ? Colors.main : Colors.white} />;
      case 'reception':
        return <IcReception fill={isSelected ? Colors.main : Colors.white} />;
      case 'quotation':
        return <IcQuotation fill={isSelected ? Colors.main : Colors.white} />;
      case 'progress':
        return <IcProgress fill={isSelected ? Colors.main : Colors.white} />;
      case 'vehicle_handing':
        return (
          <IcVehicleHanding fill={isSelected ? Colors.main : Colors.white} />
        );
      case 'report':
        return <IcReport fill={isSelected ? Colors.main : Colors.white} />;
      case 'advisory':
        return <IcAdvisory fill={isSelected ? Colors.main : Colors.white} />;
      case 'sign_out':
        return <IcSignOut fill={isSelected ? Colors.main : Colors.white} />;
      case 'news':
        return <IcNews fill={isSelected ? Colors.main : Colors.white} />;
      case 'repair':
        return <IcRepair fill={isSelected ? Colors.main : Colors.white} />;
      case 'video':
        return <IcVideo fill={isSelected ? Colors.main : Colors.white} />;
      case 'document':
        return <IcPdf fill={isSelected ? Colors.main : Colors.white} />;
      case 'mixture_timeline':
        return <IcTimeLine fill={isSelected ? Colors.main : Colors.white} />;
      case 'customer_timeline':
        return (
          <IcCustomerTimeline fill={isSelected ? Colors.main : Colors.white} />
        );
      case 'paint_timeline':
        return <IcTimeLine fill={isSelected ? Colors.main : Colors.white} />;
      case 'general_timeline':
        return (
          <IcCustomerTimeline fill={isSelected ? Colors.main : Colors.white} />
        );
      default:
        break;
    }
  };
  return (
    <View style={styles.menu}>
      <View
        style={[
          styles.borderView,
          {
            backgroundColor: item.isSelected ? Colors.white : Colors.main,
          },
        ]}>
        <View style={styles.borderTop} />
      </View>
      <View
        style={[
          styles.itemContain,
          {
            backgroundColor: item.isSelected ? Colors.white : Colors.main,
          },
        ]}>
        <TouchableOpacity
          onPress={() => onPress(item, index)}
          style={styles.item}>
          <View style={styles.iconCon}>
            {renderIcon(item.key, item.isSelected)}
          </View>
          <Text
            style={[
              styles.itemTitle,
              {
                color: item.isSelected ? Colors.black : Colors.white,
              },
            ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.borderView,
          {
            backgroundColor: item.isSelected ? Colors.white : Colors.main,
          },
        ]}>
        <View style={styles.borderRight} />
      </View>
    </View>
  );
}

export default function MainScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((st) => st.auth.user.user_id);
  const [menuHome, setMenuHome] = useState(menu);
  const onPress = (item, indexItem) => {
    const newMenu = [...menuHome];
    newMenu.forEach((it, index) => {
      if (item.key === 'sign_out') {
        dispatch(setToken(''));
        clearLocalStorage();
        if (index !== 0) {
          menu[index].isSelected = false;
        }
        newMenu[0].isSelected = true;
      } else if (index === indexItem) {
        newMenu[index].isSelected = true;
      } else {
        newMenu[index].isSelected = false;
      }
    });
    setMenuHome(newMenu);
    navigation.navigate(item.screen);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View>
          <View style={styles.title}>
            <IcLogo style={styles.logo} />
            <Text style={styles.txtLogo}>Nissan Service</Text>
          </View>
          <View style={styles.tab}>
            <View>
              <Image source={LOGO} style={styles.avatar} />
              <Text style={styles.txtHello}>Xin chào {user?.name}</Text>
            </View>

            <FlatList
              data={menuHome}
              renderItem={({item, index}) => Item({item, index, onPress})}
              style={styles.list}
            />
          </View>
        </View>
        <ScreenContainer />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.lightGray},
  tab: {
    width: 200,
    backgroundColor: Colors.main,
    height: '100%',
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  logo: {marginHorizontal: 10},
  content: {flexDirection: 'row'},
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'center',
  },
  txtLogo: {
    fontFamily: FontFamily.nissanBold,
    fontSize: FontSizeNormalize.small,
  },
  txtHello: {
    textAlign: 'center',
    color: Colors.white,
    marginVertical: 10,
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.normal,
  },
  borderRight: {
    flex: 1,
    borderTopRightRadius: 50,
    backgroundColor: Colors.main,
  },
  borderTop: {
    flex: 1,
    borderBottomRightRadius: 50,
    backgroundColor: Colors.main,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemContain: {
    height: 40,
    width: 180,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  borderView: {
    height: 10,
  },
  itemTitle: {
    fontFamily: FontFamily.nissanRegular,
    fontSize: FontSizeNormalize.normal,
  },
  list: {marginLeft: 20, marginBottom: 100},
  menu: {
    height: 60,
    width: 180,
  },
  iconCon: {marginHorizontal: 10},
});
