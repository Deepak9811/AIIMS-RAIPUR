import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Alert,
  StyleSheet,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import About from '../screens/About';
import RNExitApp from 'react-native-exit-app';

const CustomDrawer = ({props, navigation}) => {
  const [name, setName] = useState('');
  const [userProfile, setUserProfile] = useState(
    require('../assets/image/user-profile.jpg'),
  );
  const [visibleImageNew, setVisibleImageNew] = useState(false);

  useEffect(() => {
    async function getData() {
      const sName = JSON.parse(await AsyncStorage.getItem('sName'));
      const sNameLast = JSON.parse(await AsyncStorage.getItem('sNameLast'));
      const profile = JSON.parse(await AsyncStorage.getItem('profileImage'));
      if (profile === null) {
        setVisibleImageNew(false);
        setUserProfile(require('../assets/image/user-profile.jpg'));
      } else {
        setVisibleImageNew(true);
        setUserProfile(profile);
      }
      setName(sName + ' ' + sNameLast);
    }
    getData();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          // backgroundColor: '#8200d6'
          paddingTop: 0,
        }}>
        <ImageBackground
          source={require('../assets/image/menu-bg1.png')}
          style={{
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
          }}>
          <View
            style={{
              width: 85,
              height: 85,
              backgroundColor: '#fff',
              borderRadius: 50,
              borderColor: '#000',
            }}>
            <Image
              source={
                visibleImageNew
                  ? {
                      uri: `data:png;base64,${userProfile}`,
                    }
                  : require('../assets/image/user-profile.jpg')
              }
              style={{
                height: 80,
                width: 80,
                borderRadius: 50,
                borderColor: '#000',
                margin: 2,
                borderWidth: 1,
                backgroundColor: '#fff',
              }}
            />
          </View>

          <Text
            style={{
              color: '#000',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
              marginTop: 10,
            }}>
            {name}
          </Text>
        </ImageBackground>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.button}>
            <LinearGradient
              colors={['#fff', '#fff']}
              style={styles.commonGradient}>
              <TouchableOpacity
              onPress={()=>navigation.navigate("Home")}
                style={{
                  // width: windowWidth / 1.3,
                  justifyContent: 'center',
                  paddingVertical: 10,
                }}>
                <Text style={[styles.textCommon, {color: '#e1495e'}]}>
                  Home
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View> */}

        {/* <ScrollView> */}
        <View style={{marginTop: 10}}>
          <About navigation={navigation} />
        </View>
        {/* </ScrollView> */}
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    marginTop: '2%',
    width: '95%',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 2,
  },
  commonGradient: {
    width: '100%',
    // paddingVertical: 10,
    justifyContent: 'center',
    borderRadius: 5,
  },
  textCommon: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    textAlign: 'left',
  },
});
