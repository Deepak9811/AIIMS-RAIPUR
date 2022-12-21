import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuProfile = () => {
    const [name, setName] = useState('');
    const [visibleImageNew, setVisibleImageNew] = useState(false);
    const [userProfile, setUserProfile] = useState(
      require('../assets/image/user-profile.jpg'),
    );
  
  
    useEffect(() => {
    //   async function getData() {
    //     const sName = JSON.parse(await AsyncStorage.getItem('sName'));
    //     const sNameLast = JSON.parse(await AsyncStorage.getItem('sNameLast'));
    //     const profile = JSON.parse(await AsyncStorage.getItem('profileImage'));
    //     if (profile === null) {
    //       setVisibleImageNew(false)
    //       setUserProfile(require('../assets/image/user-profile.jpg'))
    //     } else {
    //       setVisibleImageNew(true)
    //       setUserProfile(profile)
    //     }
    //     console.log("name :- ",sName)
    //     setName(sName + ' ' + sNameLast) 
    //   }
    //   getData();

      AsyncStorage.getItem('sName').then(value => {
        console.log("name get :- ",value)
        if (value == null) {
            console.log("name get 1:- ",value)
        } else {
            console.log("name get 2:- ",value)
        }
      });
    }, []);

  return (
    <>
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
    </>
  )
}

export default MenuProfile

const styles = StyleSheet.create({})