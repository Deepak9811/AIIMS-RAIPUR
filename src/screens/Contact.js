import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';

import {Appbar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {SafeAreaView} from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {TextInput, Button} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import RenderHtml from 'react-native-render-html';

import {API_DEFAULT} from '@env';

import {windowWidth} from '../utils/Dimensions';
import {Image} from 'react-native';
import Footer from '../components/Footer';

const Contact = ({props, navigation}) => {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showThank, setShowThank] = useState(true);
  const [hideThnk, setHideThnk] = useState(true);
  const [responseMsg, setResponseMsg] = useState('Thank You');
  const [showError, setShowError] = useState(true);
  const [details, setDetails] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const sName = JSON.parse(await AsyncStorage.getItem('sName'));
        const sNameLast = JSON.parse(await AsyncStorage.getItem('sNameLast'));
        const details = JSON.parse(
          await AsyncStorage.getItem('contactTextData'),
        );

        console.log(details);

        setDetails(details);

        setName(sName + ' ' + sNameLast);
      } catch (error) {
        console.log('There has problem in AsyncStorage : ' + error.message);
      }
    }
    fetchData();
  }, []);

  const handleEmail = () => {
    if (description !== '') {
      setLoader(true);
      let receiverEmail = 'library@aiimsraipur.edu.in';
      // let receiverEmail = 'theartistnw@gmail.com';
      let enquiry = 'AIIMS Raipur Application Contact Enquiry';
   
      let url = `${API_DEFAULT}/sendEmail?toId=${receiverEmail}&subject=${enquiry}&bodyText=${description}`;
      fetch(url, {
        method: 'POST',
        headers: {
          Accepts: 'application/json',
          'content-type': 'application/json',
        },
      })
        .then(result => {
          result.json().then(resp => {
            console.log(resp);
            if (resp.status === 'success') {
              setDescription('Thank you');
              setShowThank(false);
              setLoader(false);
              setResponseMsg('Thank you.');

              setTimeout(() => {
                setHideThnk(false);
              }, 5000);
            } else {
              setShowThank(false);
              setLoader(false);
              setShowError(false);
              setResponseMsg('Something went wrong. Please try again.');
              setTimeout(() => {
                setShowThank(true);
                setShowError(true);
              }, 4000);
            }
          });
        })
        .catch(error => {
          setShowThank(false);
          setLoader(false);
          setShowError(false);
          setResponseMsg('Something went wrong. Please try again.');
          setTimeout(() => {
            setShowThank(true);
            setShowError(true);
          }, 4000);
        });
    } else {
      Alert.alert('Alert!', 'Please Fill The Field Below.', [{text: 'Okay'}], {
        cancelable: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <Appbar.Header style={styles.ttl}>
        <TouchableOpacity
          style={{paddingLeft: '2%'}}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" color="#05375a" size={25} />
        </TouchableOpacity>

        <TouchableOpacity
            style={{paddingLeft: '4%'}}
            onPress={() => navigation.openDrawer()}
            // onPress={() => this.props.navigation.goBack()}
            >
            <Feather name="menu" color="#05375a" size={25} />
          </TouchableOpacity>


        <Appbar.Content title="Contact US"   style={{
              // alignItems: 'center'
              paddingLeft:"5%"
              
            }}/>
      </Appbar.Header>

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.mainContainer}>
            {/* ===============INFO======================= */}
            <View style={styles.uDetail}>
              {/* <Text style={styles.uNme}>Hello</Text>
              <Text style={styles.uNme}>{name}</Text> */}

              <Image
                source={require(`../assets/image/contact.png`)}
                style={{height: 250, width: '100%'}}
              />
            </View>

            <View style={{}}>
              <RenderHtml
                contentWidth={windowWidth}
                source={{
                  html: `${details}`,
                }}
              />

              
            </View>

            {hideThnk && (
              <>
                {showThank ? (
                  <>
                    {/* <View
                      style={{
                        marginTop: 20,
                      }}>
                      <TextInput
                        mode="outlined"
                        value={description}
                        numberOfLines={10}
                        placeholder="Please enter your Feedback
                                   /Suggestion/General Contact message"
                        underlineColorAndroid="transparent"
                        multiline={true}
                        onChangeText={e => setDescription(e)}
                      />
                    </View> */}

                    <View style={styles.buttonMap}>
                      {loader ? (
                        <>
                          <TouchableOpacity
                            style={styles.buttonStyle}
                            disabled={loader ? true : false}>
                            <ActivityIndicator color="#57A3FF" size="large" />
                          </TouchableOpacity>
                        </>
                      ) : (
                        <TouchableOpacity
                          // onPress={handleEmail}
                          onPress={() => Linking.openURL('mailto:deepaksingh92680@gmail.com')}
                          style={styles.buttonStyle}>
                          <Text style={{fontSize: 20, color: '#252a60'}}>
                            Send Mail
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </>
                ) : (
                  <LinearGradient
                    colors={['#fff', '#fff']}
                    style={styles.thnks}>
                    <View style={styles.thnkRow}>
                      <Animatable.Text
                        animation={'rubberBand'}
                        style={styles.thnksText}>
                        {responseMsg}
                      </Animatable.Text>
                      <Animatable.View
                        style={styles.successIcon}
                        animation={'bounceIn'}>
                        {showError ? (
                          <Feather
                            name="check-circle"
                            color="green"
                            size={28}
                          />
                        ) : (
                          <MaterialIcons
                            name="error-outline"
                            color="#f66"
                            size={28}
                          />
                        )}
                      </Animatable.View>
                    </View>
                  </LinearGradient>
                )}
              </>
            )}
          </View>
        </ScrollView>
          <Footer marginTb={10}/>
      </>

      {/* <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 8,
        }}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://libcon.in/')}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Powered by</Text>
          <Text style={{color: '#f68823'}}> LIBCON</Text>
        </TouchableOpacity>
      </View> */}

      
    </SafeAreaView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ffffff'},
  ttl: {
    backgroundColor: '#ffffff',
  },
  mainContainer: {
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '50%',
  },
  fontInfo: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: '1%',
  },
  buttonMap: {
    marginTop: 10,
    padding: 5,
    paddingHorizontal: 0,
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '10%',
  },
  buttonStyle: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#f68d2c',
  },

  uDetail: {
    marginBottom: 20,
  },
  uNme: {
    fontSize: 25,
  },

  thnks: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    marginTop: '15%',
  },
  thnkRow: {
    flexDirection: 'row',
    padding: '5%',
    marginLeft: '5%',
    justifyContent: 'center',
  },
  thnksText: {
    fontWeight: 'bold',
    marginRight: '4%',
    marginTop: '1%',
    fontSize: 18,
    width: '80%',
    textAlign: 'center',
    color:"#101010"
  },
  successIcon: {
    justifyContent: 'center',
  },
});
