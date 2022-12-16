import React from 'react';

import {Text, StyleSheet, View, Image} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {windowWidth} from '../utils/Dimensions';
import RenderHtml from 'react-native-render-html';

const NewAndNotices = ({newsData}) => {
  return (
    <View style={{marginBottom: '10%'}}>
      {/* <View style={styles.brd}></View> */}

      <View style={{marginBottom: '5%', marginTop: '10%'}}>
        <Text>News And Notices</Text>
      </View>

      <View
        style={styles.Img}>
        {newsData.map((item, i) => {
          console.log(item.image)
          let showNewsImage;
          if (item.image !== '') {
            showNewsImage = true;
          } else {
            showNewsImage = false;
          }
          return (
            <React.Fragment key={i}>
              <LinearGradient colors={['#fff', '#fff']} style={styles.newsShd}>
                <View>
                  <View
                    style={{width:windowWidth}}>
                    <View style={styles.fdTitle}>
                      <Text
                        style={styles.heading}>
                        {item.heading}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={{padding: 5}}>
                    <View
                      style={styles.bdyImg}>
                      <Image
                        style={{
                          width: windowWidth - 70,
                          height: 250,
                          display: showNewsImage ? 'flex' : 'none',
                        }}
                        source={{
                          uri: `${item.image}` + '?' + new Date(),
                        }}
                      />
                    </View>

                    <RenderHtml
                      contentWidth={windowWidth}
                      source={{html: item.description}}
                    />
                  </View>
                </View>
              </LinearGradient>
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

export default NewAndNotices;

const styles = StyleSheet.create({
  fdTitle: {
    width: '84.5%',
    marginTop: '5%',
    borderBottomWidth: 1,
    paddingBottom: '3%',
    borderColor: '#E2E2E2',
  },

  newsShd: {
    // marginTop: '3%',
    marginBottom: '3%',
    borderRadius: 8,
    padding: 5,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },

  brd: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#fff',
  },
  Img:{
    borderWidth: 1,
    borderColor: '#fff',
    padding: 5,
    borderRadius: 10,
    paddingTop: 20,
  },
  heading:{
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
    color:"#050000"
  },
  bdyImg:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
