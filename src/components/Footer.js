import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import {windowWidth} from '../utils/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';
import RNExitApp from 'react-native-exit-app';

const Footer = () => {
  const [nameUser, setNameUser] = useState('');

  useEffect(() => {
    async function getData() {
      const sName = JSON.parse(await AsyncStorage.getItem('sName'));
      const sNameLast = JSON.parse(await AsyncStorage.getItem('sNameLast'));
      setNameUser(sName );
    }
    getData();
  }, []);

  const logOut = () => {
    BackHandler.removeEventListener('hardwareBackPress', logOutNClear());
  };

  const logOutNClear = () => {
    Alert.alert(
      'Log out from App',
      'Do you want to log out from app ?',
      [
        {text: 'Yes', onPress: () => clearToken()},
        {text: 'No', onPress: () => console.warn('No Pressed')},
      ],
      {cancelable: true},
    );
    return true;
  };

  const clearToken = async () => {
    await AsyncStorage.clear();
    // BackHandler.exitApp();
    RNExitApp.exitApp();
  };

  return (
    <View
      style={{
        paddingTop: 2,
        width: '100%',
        position: 'absolute',
        bottom: -1,
      }}>
      <TouchableOpacity
        onPress={() => Linking.openURL('https://libcon.in/')}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 5,
          backgroundColor: '#fff',
        }}>
        <Text style={{color: '#4E4E4E'}}>Powered by </Text>
        <Text style={{color: '#f68823'}}> LIBCON</Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: '5%',
          backgroundColor: '#f1f1f1',
          padding: 12,
        }}>
        <ScrollView>
          <View style={{flexDirection: 'row', width: '76%'}}>
            <Text style={{ color: '#000'}}>Logged in as </Text>
            <Text style={{ color: '#000'}}>{nameUser}</Text>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => logOut()}
          style={{
            width: '22%',
            flexDirection: 'row',
            marginLeft: 10,
            marginRight: 10,
          }}>
          <Text style={{fontSize: 16, color: '#f68823'}}>Log Out</Text>
          <MaterialIcons
            name="logout"
            color="#f68823"
            size={15}
            style={{
              marginLeft: 5,
              marginTop: 3,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({});
