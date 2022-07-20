import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { getData, storeData, urlAPI, urlApp } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

export default function Account({ navigation, route }) {
  const [user, setUser] = useState({});
  const [com, setCom] = useState({});
  const isFocused = useIsFocused();
  const [wa, setWA] = useState('');



  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        setUser(res);
        console.error(res);
      });

    }
  }, [isFocused]);

  const btnKeluar = () => {
    storeData('user', null);

    navigation.replace('Login');
  };

  const MyList = ({ label, value }) => {
    return (
      <View
        style={{
          marginVertical: 3,
          padding: 5,
          backgroundColor: colors.white,
          borderRadius: 5,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.black,
          }}>
          {label}
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[400],
            color: colors.primary,
          }}>
          {value}
        </Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={{
      flex: 1,
      padding: 10
    }}>

      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Image source={{
          uri: urlApp + 'fotosiswa/' + user.foto_user,
          // uri: 'https://kepul.zavalabs.com/fotosiswa/411b42f077583af897e9710c73c1e1bd58fe4c15fotosiswa.jpg'
        }} style={{
          width: windowWidth / 2.5,
          height: windowWidth / 2.5,
          borderRadius: windowWidth / 20
        }} />
      </View>

      {/* data detail */}
      <View style={{ padding: 10, flex: 1 }}>

        <MyList label="Nama Lengkap" value={user.nama_lengkap} />
        <MyList label="Sekolah" value={user.sekolah} />
        <MyList label="Kelas" value={user.kelas} />
        <MyList label="Tempat tanggal lahir" value={user.ttl} />
        <MyList label="Email" value={user.email} />
        <MyList label="Telepon / Whatsapp" value={user.telepon} />
        <MyList label="Alamat" value={user.alamat} />

      </View>
      <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
        <View style={{
          flex: 1,
          margin: 5
        }}>
          <MyButton
            onPress={btnKeluar}
            title="Keluar"
            colorText={colors.white}
            iconColor={colors.white}
            warna={colors.black}
            Icons="log-out-outline"
          />
        </View>
        <View style={{
          flex: 1,
          margin: 5
        }}>
          <MyButton
            onPress={() => navigation.navigate('EditProfile', user)}
            title="Edit Profile"
            colorText={colors.white}
            iconColor={colors.white}
            warna={colors.secondary}
            Icons="create-outline"
          />
        </View>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({});
