import React, {useState, useEffect} from 'react';
import {API_SLIDER, API_DEFAULT} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';

const NewBookSlide = ({item, navigation, index}) => {

  const getBiblionumber = async item => {
    console.log(item.biblionumber);

    if (item.biblionumber.length !== 0) {
      await AsyncStorage.setItem('opacNext', JSON.stringify(item.biblionumber));
      await AsyncStorage.setItem('opacNextAuthor', JSON.stringify(item.title));
      navigation.push('OpacNext');
    } else {
      console.log('no data');
    }
  };

  return (
    <React.Fragment key={index}>
      <TouchableOpacity
        style={styles.bdy}
        onPress={() => getBiblionumber(item)}>
        <View style={[styles.subBdy]}>
          <View style={{}}>
            {item.photo !=='http://aiimsraipur.libcon.in/Images/NoPhoto.png' ? (
              <Image
              style={[
                styles.childBdy,
                // {
                //   display: showImage ? 'flex' : 'none',
                // },
              ]}
              source={{uri: item.photo+ '?' + new Date()}} 
            />
            ):(
              <Image
              style={[
                styles.childBdy,
                // {
                //   display: showImage ? 'flex' : 'none',
                // },
              ]}
              source={require('../assets/image/noimage.png')} 
            />
            )}

            {/* {!showImage ? (
              <View style={styles.nonDetails}>
                <Text style={{padding: 5, color: '#030303'}}>
                  {item.item.title}
                </Text>
                <Text style={styles.authNameNn}>{item.item.author}</Text>
              </View>
            ) : null} */}

            <View style={styles.details}>
              <Text style={{padding: 5, color: '#030303',overflow:"hidden"}}>{item.title}</Text>
              <Text style={styles.authName}>{item.author}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default NewBookSlide;

const styles = StyleSheet.create({
  bdy: {
    borderRadius: 10,
    // marginBottom: '5%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  subBdy: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  childBdy: {
    width: 150,
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  authName: {
    paddingTop: 2,
    paddingLeft: 5,
    paddingBottom: 5,
    color: '#000000',
  },
  details: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    textAlign: 'center',
  },
  authNameNn: {
    paddingTop: 2,
    paddingLeft: 5,
    paddingBottom: 5,
    color: '#030303',
  },
  nonDetails: {
    height: 200,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
