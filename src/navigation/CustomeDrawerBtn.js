import React from 'react'
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import {Appbar} from 'react-native-paper';  
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const CustomeDrawer = ({navigation}) => {
  return (
    <View >
      <Appbar.Header style={styles.ttl}>
      <TouchableOpacity
        style={{paddingLeft: '5%'}}
        onPress={() => navigation.openDrawer()}
        // onPress={() => navigation.goBack()}
      >
        <Feather name="menu" color="#05375a" size={25} />
      </TouchableOpacity>

     
    </Appbar.Header>
    </View>
  )
}

export default CustomeDrawer

const styles = StyleSheet.create({
    ttl: {
        backgroundColor: '#fff',
      },
})