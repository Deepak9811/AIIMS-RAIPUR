import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';

import BcryptReactNative from 'bcrypt-react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {API_URL} from '@env';
import {windowHeight, windowWidth} from '../utils/Dimensions';


import CryptoJS from 'crypto-js';



const Login = ({navigation}) => {
  const [loaderMicrosoft, setLoaderMicrosoft] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [check_textInputChange, setCheck_textInputChange] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const email = JSON.parse(await AsyncStorage.getItem('email'));
      if (email !== null) {
        navigation.navigate('Home');
      }
    }
    fetchData();
  }, []);



  const check = () => {
    if (email === '' || pass === '') {
      console.log(pass);
      Alert.alert('', 'Please enter your account details to login.');
    } else if (email !== '' && pass !== '') {
      console.log(pass);
      setLoader(true);
      getUserAllData();
    } else {
      Alert.alert('', 'Please enter your correct account details to login.');
    }
  };

  const getUserAllData = data => {
    var keys = CryptoJS.enc.Utf8.parse('ZEDONcontinuumelZEDONcontinuumel');
    var iv = CryptoJS.enc.Utf8.parse('ZEDONcontinuumel');

    // let userEmail = user.userPrincipalName
    // let userEmail = `jamil.ahmed@bennett.edu.in`;
    let userEmail = email;
    // let userEmail = `bulrc`;
    // let userEmail = `jahmad82@gmail.com`;

    var encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(userEmail),
      keys,
      {
        keySize: 256 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    ).toString();

    // return(console.log('user email :- ', encrypted));
    let emails = encrypted;

    let url = `${API_URL}LIBCON-PATINFO&parameter=${emails}`;
    // let url = `${API_URL}LIBCON-APP-PATINFO&parameter=jamil.ahmed@bennett.edu.in`
    // return(console.log(url))

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
    })
      .then(result => {
        result.json().then(async resp => {
          console.log('resp :- ', resp);

          if (resp.status === 'success') {
            const sname = resp.data.response[0][4];

            console.log('resp : ', sname);
            if (email === sname) {
              console.log('resp : ', sname);
              const salt = await BcryptReactNative.getSalt(10);
              const hash = (salt, resp.data.response[0][5]);
              const isSame = await BcryptReactNative.compareSync(pass, hash);

              if (isSame === true) {
                await AsyncStorage.setItem(
                  'userId',
                  JSON.stringify(resp.data.response[0][0]),
                );
                await AsyncStorage.setItem(
                  'sName',
                  JSON.stringify(resp.data.response[0][2]),
                );
                await AsyncStorage.setItem(
                  'sNameLast',
                  JSON.stringify(resp.data.response[0][3]),
                );
                await AsyncStorage.setItem(
                  'email',
                  JSON.stringify(resp.data.response[0][4]),
                );

                await AsyncStorage.setItem(
                  'profileImage',
                  JSON.stringify(resp.data.response[0][13]),
                );

                setLoaderMicrosoft(false);
                navigation.push('Home');
                console.log('check first 1');
              } else {
                Alert.alert(
                  '',
                  'Please enter your correct account details to login.',
                  [{text: 'Okay'}],
                  {cancelable: true},
                );
                setLoader(false);
              }
            } else {
              Alert.alert(
                '',
                'Please enter your correct account details to login.',
                [{text: 'Okay'}],
                {cancelable: true},
              );
              setLoader(false);
            }
          } else {
            setLoaderMicrosoft(false);
            setLoader(false);
            ToastAndroid.show(
              'Please enter your correct account details to login.',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            );
          }
        });
      })
      .catch(error => {
        setLoader(false);
        ToastAndroid.show(
          'There has been a problem with your fetch operation. Please try again',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        setLoaderMicrosoft(false);

        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      });
  };

  const textInputchange = val => {
    if (val.length !== 0) {
      setEmail(val);
      setCheck_textInputChange(true);
      // this.setState({
      //   email: val,
      //   check_textInputChange: true,
      // });
    } else {
      setEmail(val);
      setCheck_textInputChange(false);
      // this.setState({
      //   email: val,
      //   check_textInputChange: false,
      // });
    }
  };

  const updateSecureTextEntry = () => {
    setSecureTextEntry(false);
    // this.setState({
    //   secureTextEntry: false,
    // });
  };

  const handlePasswordChange = val => {
    setPassword(val);
    // this.setState({
    //   password: val,
    // });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Animatable.View
        animation={'bounceInDown'}
        duration={1000}
        style={{
          justifyContent: 'center',
          flex: 1.2,
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/image/bennet.png')}
          style={{width: 202, height: 225}}
        />
      </Animatable.View>

      <Animatable.View
        style={[
          styles.footer,
          // ,{backgroundColor:"red"}
        ]}
        animation="fadeInUpBig"
        // duration={1000}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {/* --------Email-------------------- */}

            <View>
              <Text style={[styles.text_footer, {marginTop: 20}]}> Email </Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />

                <TextInput
                  returnKeyType="next"
                  placeholder="Your Email"
                  placeholderTextColor="#7F7F7F"
                  keyboardType="email-address"
                  style={styles.textInput}
                  value={email}
                  onChangeText={val => {
                    textInputchange(val);
                    setEmail(val.trim());
                    // this.setState({
                    //   email: val.trim(),
                    // });
                  }}
                />
                {check_textInputChange ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
            </View>

            {/* ------------Password------------- */}
            <Text style={[styles.text_footer, {marginTop: 20}]}>Password</Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" size={20} />

              <TextInput
                secureTextEntry={secureTextEntry ? true : false}
                placeholderTextColor="#7F7F7F"
                returnKeyType="next"
                placeholder="Your Password"
                style={styles.textInput}
                value={pass}
                onChangeText={val => {
                  handlePasswordChange(val);
                  setPass(val);
                  // this.setState({
                  //   pass: val,
                  // });
                }}
              />
              <TouchableOpacity onPress={() => updateSecureTextEntry()}>
                {secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <TouchableOpacity
                    onPress={
                      () => setSecureTextEntry(true)
                      // setState({
                      //   secureTextEntry: true,
                      // })
                    }>
                    <Feather name="eye" color="green" size={20} />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              disabled={loader ? true : false}
              style={styles.button}
              onPress={() => check()}>
              <LinearGradient
                colors={['#ff7e82', '#ce1412']}
                style={styles.signIn}>
                {!loader ? (
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    Sign In
                  </Text>
                ) : (
                  <ActivityIndicator size="large" color="#fff" />
                )}
              </LinearGradient>
            </TouchableOpacity>

           

            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 15,
                marginTop: windowWidth / 3.2,
              }}>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://libcon.in/')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#000'}}>Powered by</Text>
                <Text style={{color: '#f68823'}}> LIBCON</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 1.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomColor: '#ce1412',
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 3,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
  },

  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  or: {
    position: 'relative',
    left: '45%',
    top: -11,
    backgroundColor: '#fff',
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orBorder: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: '10%',
  },
});
