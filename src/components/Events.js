import React from 'react';

import LinearGradient from 'react-native-linear-gradient';

import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';

const Events = ({eventData,navigation}) => {

  const  getEvent=(item)=> {
        navigation.navigate('EventDetails', {eventDetails: item});
      }


  return (
    <View 
    // style={{marginBottom: '5%'}}
    >
      {/* <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#fff',
        }}></View> */}

      <View style={{marginBottom: '5%', marginTop: '10%'}}>
        <Text>Latest Events.</Text>
      </View>

      <View style={styles.secondContainer}>
        {eventData.map((item, i) => {
          // console.log('item image :- ', item.image);
          return (
            <React.Fragment key={i}>
              <TouchableOpacity onPress={() => getEvent(item)}>
                <LinearGradient
                  colors={['#fce5e5', '#f5ddde']}
                  style={[
                    {
                      marginTop: '3%',
                      marginBottom: '3%',
                      borderRadius: 8,
                      padding: 8,
                    },
                  ]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        width: '70%',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={[
                          {
                            color: '#3860cc',
                            marginLeft: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        ]}>
                        {item.eventName}
                      </Text>
                    </View>

                    <View style={{marginRight: 20}}>
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                        }}
                        source={{
                          uri: item.image !== '' ? item.image : undefined,
                        }}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
  secondContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
});
