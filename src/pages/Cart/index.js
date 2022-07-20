import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';

import { getData, storeData, urlAPI } from '../../utils/localStorage';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyButton, MyInput, MyPicker } from '../../components';
import { colors } from '../../utils/colors';
import { TouchableOpacity, Swipeable } from 'react-native-gesture-handler';
import { fonts, windowWidth } from '../../utils/fonts';
import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { showMessage } from 'react-native-flash-message';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function Cart({ navigation, route }) {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [buka, setbuka] = useState(true);
  const [tipe, setTipe] = useState(false);
  const [jenis, setJenis] = useState('DI ANTAR KE BANK SAMPAH');
  const [alamat, setAlamat] = useState('');
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();
  //   useEffect(() => {

  //   }, []);

  useEffect(() => {
    if (isFocused) {

      getData('user').then(rx => {
        console.log(rx)
        setUser(rx);
        __getDataBarang(rx.id);
      });

    }
  }, [isFocused]);

  const __getDataBarang = (zz) => {
    axios.post(urlAPI + '/cart.php', {
      fid_user: zz
    }).then(x => {
      setData(x.data);
    })

  }

  const hanldeHapus = (x) => {
    axios.post(urlAPI + '/cart_hapus.php', {
      id_cart: x
    }).then(x => {
      getData('user').then(tkn => {
        __getDataBarang(tkn.id);
        axios
          .post(urlAPI + '/1_cart.php', {
            fid_user: tkn.id
          })
          .then(res => {
            console.log('cart', res.data);
            setCart(res.data);
          });
      });

      getData('cart').then(xx => {
        storeData('cart', xx - 1)
      })
    })
  };




  var sub = 0;
  var qtyTotal = 0;
  data.map((item, key) => {
    sub += parseFloat(item.total);
    qtyTotal += parseFloat(item.qty);
  });

  const __renderItem = ({ item, index }) => {
    return (
      <Swipeable
        renderRightActions={() => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                hanldeHapus(item.id)

              }}>
              <View
                style={{
                  // flex: 1,
                  width: 100,
                  //   backgroundColor: 'blue',
                  // padding: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="ionicon"
                  name="trash"
                  size={40}
                  color={colors.danger}
                />
              </View>
            </TouchableWithoutFeedback>
          );
        }}>
        <View
          style={{
            marginVertical: 10,
            borderRadius: 10,
            padding: 10,
            elevation: 2,
            backgroundColor: colors.white,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              resizeMode="contain"
              style={{
                width: 70,
                borderRadius: 20,
                aspectRatio: 1,
              }}
              source={{ uri: item.foto }}
            />
            <View style={{ marginLeft: 10, flex: 1, justifyContent: 'center' }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: windowWidth / 30,
                }}>
                {item.nama_barang}
              </Text>

              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  flex: 1,
                  fontSize: windowWidth / 30,
                }}>
                {new Intl.NumberFormat().format(item.harga)} x {item.qty} Kg
              </Text>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.warning,
                    fontSize: windowWidth / 25,
                  }}>
                  {new Intl.NumberFormat().format(item.total)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };


  const [foto, setfoto] = useState('https://zavalabs.com/nogambar.jpg');

  const options = {
    includeBase64: true,
    quality: 0.3,
  };

  const getCamera = xyz => {
    launchCamera(options, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = { uri: response.uri };
        switch (xyz) {
          case 1:
            setfoto(`data:${response.type};base64, ${response.base64}`)
            break;
        }
      }
    });
  };

  const getGallery = xyz => {
    launchImageLibrary(options, response => {
      console.log('All Response = ', response);

      console.log('Ukuran = ', response.fileSize);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        if (response.fileSize <= 200000) {
          let source = { uri: response.uri };
          switch (xyz) {
            case 1:
              setfoto(`data:${response.type};base64, ${response.base64}`)
              break;
          }
        } else {
          showMessage({
            message: 'Ukuran Foto Terlalu Besar Max 500 KB',
            type: 'danger',
          });
        }
      }
    });
  };

  const UploadFoto = ({ onPress1, onPress2, label, foto }) => {
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: colors.white,
          marginVertical: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.border,
          elevation: 2,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.black,
          }}>
          {label}
        </Text>

        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{
            flex: 2
          }}>
            <Image
              source={{
                uri: foto,
              }}
              style={{
                width: '100%',
                aspectRatio: 3,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              paddingRight: 5,
            }}>
            <MyButton
              onPress={onPress1}
              colorText={colors.white}
              title="KAMERA"
              warna={colors.primary}
            />
          </View>
          <View
            style={{
              flex: 1,
              paddingLeft: 5,
            }}>
            <MyButton
              onPress={onPress2}
              title="GALLERY"
              colorText={colors.white}
              warna={colors.secondary}
            />
          </View>

        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // padding: 10,
      }}>
      <View style={{ padding: 10, flex: 1 }}>
        <FlatList data={data} renderItem={__renderItem} />
      </View>
      <View style={{
        padding: 10,
      }}>
        <MyPicker

          onValueChange={x => {

            setJenis(x);


            if (qtyTotal < 1 && x == "AMBIL DITEMPAT") {
              setTipe(false);
              setbuka(false);
              console.warn('test')
            } else {
              setTipe(true);
              if (x == "DI ANTAR KE BANK SAMPAH") {

                setbuka(false);
              } else {

                setbuka(true);
              }

            }





          }}
          iconname="list"
          label="Jenis Pengiriman"
          data={[
            {
              label: 'DI ANTAR KE BANK SAMPAH',
              value: 'DI ANTAR KE BANK SAMPAH',
            },

            {
              label: 'AMBIL DITEMPAT',
              value: 'AMBIL DITEMPAT',
            },


          ]}
        />
        {buka &&

          <MyInput label="Alamat Pengiriman" multiline onChangeText={val => setAlamat(val)} value={alamat} />
        }

      </View>

      <UploadFoto
        onPress1={() => getCamera(1)}
        onPress2={() => getGallery(1)}
        label="Upload Bukti Foto"
        foto={foto}
      />

      {!loading &&
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.white,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: windowWidth / 20,
                fontFamily: fonts.secondary[600],
                color: colors.black,
                left: 10,
              }}>
              Rp. {new Intl.NumberFormat().format(sub)}
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 20,
                fontFamily: fonts.secondary[600],
                color: colors.secondary,
                left: 10,
              }}>
              {new Intl.NumberFormat().format(qtyTotal)} kg
            </Text>
          </View>
          {tipe && <TouchableOpacity
            onPress={() => {

              setLoading(true);

              getData('user').then(res => {

                const dd = {
                  fid_user: res.id,
                  jenis: jenis,
                  alamat_kirim: alamat,
                  qty_total: qtyTotal,
                  harga_total: sub,
                  foto: foto
                }


                console.log(dd);
                axios.post(urlAPI + '/1add_transaksi.php', dd).then(rr => {
                  console.log(rr.data);

                  setTimeout(() => {
                    setLoading(false);
                    showMessage({
                      type: 'success',
                      message: 'Penjualan sampah Anda bserhasil dikirim'
                    })
                    navigation.replace('MainApp')
                  }, 1500)


                })


              });



            }}
            style={{

              backgroundColor: colors.primary,
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'
            }}>
            <Icon type='ionicon' name="open-outline" color={colors.white} size={windowWidth / 20} />
            <Text
              style={{
                fontSize: windowWidth / 20,
                left: 5,
                fontFamily: fonts.secondary[600],
                color: colors.white,

              }}>
              CHECKOUT
            </Text>
          </TouchableOpacity>}

          {!tipe && <View style={{
            padding: 10,
            flex: 1,
            backgroundColor: colors.danger,
          }}><Text style={{
            fontSize: windowWidth / 30,
            textAlign: 'center',
            fontFamily: fonts.secondary[600],
            color: colors.white,
          }}>Maaf sampah yang Anda jual kurang dari 1 kg</Text></View>}
        </View>}


      {loading && <View style={{
        padding: 10
      }}><ActivityIndicator size="large" color={colors.primary} /></View>}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
