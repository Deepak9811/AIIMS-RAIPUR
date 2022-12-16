import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Quote = ({quote}) => {
  return (
    <View style={{marginBottom: '30%'}}>
      {/* <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#fff',
        }}></View> */}

      <View style={{marginBottom: '5%', marginTop: '10%'}}>
        <Text>Quote of the Day</Text>
      </View>

      <View style={styles.secondContainer}>
        <Text style={{fontSize: 20, color: '#030303'}}>{quote}</Text>
      </View>
    </View>
  );
};

export default Quote;

const styles = StyleSheet.create({
  secondContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
});
