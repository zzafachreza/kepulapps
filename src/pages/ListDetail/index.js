import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { fonts, windowHeight, windowWidth } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { Icon } from 'react-native-elements';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { urlAPI } from '../../utils/localStorage';

export default function ListDetail({ navigation, route }) {
  const item = route.params;
  navigation.setOptions({ title: item.kode });
  const [data, setData] = useState(route.params);
  const [buka, setBuka] = useState(true);
  const [dataDetail, setDataDetail] = useState([]);

  useEffect(() => {
    DataDetail();

  }, []);
  let nama_icon = '';

  if (data.status == "DONE") {
    nama_icon = 'checkmark-circle-outline';
  } else {
    nama_icon = 'close-circle-outline';
  }


  const DataDetail = () => {
    axios
      .post(urlAPI + '/transaksi_detail.php', {
        kode: item.kode,
      })
      .then(res => {
        console.warn('detail transaksi', res.data);
        setDataDetail(res.data);
        setBuka(true);
      });
  }
  const DataPesanan = () => {
    return (
      <View
        style={{
          backgroundColor: colors.white,
        }}>

        <Text
          style={{
            fontFamily: fonts.secondary[600],
            backgroundColor: colors.primary,
            padding: 10,
            color: colors.white,
          }}>
          {data.kode} - {data.tanggal}
        </Text>
        {/* --- */}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              Nama
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {data.nama_lengkap}
            </Text>
          </View>
        </View>
        {/* ---- */}

        {/* --- */}
        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: '#EEEEEE',
          }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              No Hp
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {data.telepon}
            </Text>
          </View>
        </View>
        {/* ---- */}
        {/* --- */}
        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: '#EEEEEE',
          }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              Email
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {data.email}
            </Text>
          </View>
        </View>
        {/* ---- */}
      </View>
    );
  };


  const DataTransaksi = () => {
    return (
      <View
        style={{
          backgroundColor: colors.white,
        }}>


        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              Jenis
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {data.jenis}
            </Text>
          </View>
        </View>
        {/* ---- */}

        {/* --- */}
        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: '#EEEEEE',
          }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                backgroundColor: colors.white,

                color: colors.black,
              }}>
              Alamat Kirim (Jika dijemput)
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                backgroundColor: colors.white,
                fontSize: 14,
                padding: 10,
                color: colors.black,
              }}>
              {data.alamat_kirim}
            </Text>
          </View>
        </View>
        {/* ---- */}

        {/* --- */}

        {/* ---- */}{/* --- */}
        {/* <Image source={{
          uri: data.bank_image
        }} style={{
          resizeMode: 'contain',
          height: 50
        }} /> */}


        {/* ---- */}

        {/* ---- */}
      </View >
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>

      {!buka && <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>}
      {buka &&
        <ScrollView style={{ padding: 10, flex: 1 }}>
          <DataPesanan />
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              backgroundColor: '#DEDEDE',
              padding: 10,
              color: colors.black,
            }}>
            TRANSAKSI
          </Text>
          <DataTransaksi />

          <Text
            style={{
              fontFamily: fonts.secondary[600],
              backgroundColor: colors.primary,
              padding: 10,
              color: colors.white,
            }}>
            Detail sampah
          </Text>

          {dataDetail.map(i => {
            return (
              <View style={{
                flexDirection: 'row',
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.border
              }}>
                <View style={{
                  padding: 2,
                }}>
                  <Image source={{
                    uri: i.image
                  }} style={{
                    width: 35, height: 35
                  }} />
                </View>
                <View style={{
                  flex: 1,
                  justifyContent: 'center'
                }}>
                  <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 35,
                    color: colors.black,
                  }}>{i.nama_sampah}</Text>
                </View>
                <View style={{
                  flex: 1,
                  justifyContent: 'center'
                }}>
                  <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 35,
                    color: colors.black,
                  }}>{new Intl.NumberFormat().format(i.harga)} x {new Intl.NumberFormat().format(i.qty)} kg</Text>
                </View>

                <View style={{
                  justifyContent: 'center'
                }}>
                  <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 20,
                    color: colors.black,

                  }}>    {new Intl.NumberFormat().format(i.total)}</Text>
                </View>
              </View>
            )
          })}

          <View style={{
            flexDirection: 'row',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: colors.border
          }}>

            <View style={{
              flex: 1,
              justifyContent: 'center'
            }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 25,
                color: colors.black,

              }}>Total berat</Text>
            </View>


            <View style={{
              justifyContent: 'center'
            }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 17,
                color: colors.black,

              }}>    {new Intl.NumberFormat().format(item.total_qty)} kg</Text>
            </View>
          </View>

          <View style={{
            flexDirection: 'row',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: colors.border
          }}>

            <View style={{
              flex: 1,
              justifyContent: 'center'
            }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 25,
                color: colors.black,

              }}>Total Harga</Text>
            </View>


            <View style={{
              justifyContent: 'center'
            }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 17,
                color: colors.secondary,

              }}>    {new Intl.NumberFormat().format(item.total_harga)}</Text>
            </View>
          </View>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              backgroundColor: colors.secondary,
              padding: 10,
              color: colors.white,
            }}>
            Bukti foto sampah
          </Text>
          <Image source={{
            uri: item.image
          }} style={{
            width: windowWidth, height: windowHeight / 2
          }} />

        </ScrollView>
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.primary,

    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    height: 80,
    margin: 5,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    textAlign: 'center',
  },
  date: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    textAlign: 'center',
  },
});
