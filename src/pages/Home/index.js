import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import 'intl';
import 'intl/locale-data/jsonp/en';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';

export default function Home({ navigation }) {
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState(0);
  const [token, setToken] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {

      const json = JSON.stringify(remoteMessage);
      const obj = JSON.parse(json);



      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'kepulapps', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: obj.notification.title, // (optional)
        message: obj.notification.body, // (required)
      });
    });

    if (isFocused) {
      __getDataUserInfo();
    }
    return unsubscribe;
  }, [isFocused]);


  const __getDataUserInfo = () => {
    getData('user').then(users => {
      console.log(users);
      setUser(users);
      axios.post(urlAPI + '/1_cart.php', {
        fid_user: users.id
      }).then(res => {
        console.log('cart', res.data);

        setCart(parseFloat(res.data))
      })
      getData('token').then(res => {
        console.log('data token,', res);
        setToken(res.token);
        axios
          .post(urlAPI + '/update_token.php', {
            id: users.id,
            token: res.token,
          })
          .then(res => {
            console.error('update token', res.data);
          });
      });
    });
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>

      <View
        style={{
          height: windowHeight / 9,
          padding: 10,
          backgroundColor: colors.white,
          flexDirection: 'row',
        }}>

        <View style={{ flex: 1, paddingTop: 10, flexDirection: 'row' }}>
          <View style={{ paddingLeft: 10, flex: 3 }}>

            <Text
              style={{
                fontSize: windowWidth / 30,
                color: colors.primary,
                fontFamily: fonts.secondary[600],
              }}>
              Selamat datang,
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 30,
                color: colors.black,
                fontFamily: fonts.secondary[600],
              }}>
              {user.nama_lengkap}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={{
              position: 'relative',
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center'


            }}>
            <Icon type='ionicon' name="cart" />
            <Text style={{
              position: 'absolute', top: 2, right: 5, backgroundColor: colors.primary, width: 15,
              textAlign: 'center',
              height: 15, borderRadius: 2, color: colors.white
            }} >{cart}</Text>

          </TouchableOpacity>

        </View>

      </View>

      <MyCarouser />

      <TouchableOpacity onPress={() => navigation.navigate('Barang')} style={{
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Icon type="font-awesome" name="refresh" color={colors.white} size={windowWidth / 20} />
        <Text style={{
          textAlign: 'center',
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 15,
          color: colors.white,
          left: 10
        }}>Jual sampah</Text>
      </TouchableOpacity>

      <View style={{
        padding: 10,
        flex: 1
      }}>


        <TouchableWithoutFeedback>
          <LottieView
            source={require('../../assets/sampah.json')}
            autoPlay
            loop
            style={{
              flex: 0.5,
              backgroundColor: colors.white,
            }}
          />
        </TouchableWithoutFeedback>
      </View>


    </SafeAreaView>
  );
}
