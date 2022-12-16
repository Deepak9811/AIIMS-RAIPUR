import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  Text,
  Image,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

import {Appbar, Button} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      convert: 'hello',
      searchQuer: '',
      searchFiel: '',
      startPag: '',
      email: 'mtesting405@gmail.com',
      showData: false,
      post: [],
      loader: true,
      popShow: true,
    };
  }

  async componentDidMount() {
    const post = this.props.posts;
    const searchqueryLocal = JSON.parse(
      await AsyncStorage.getItem('searchquery'),
    );
    const labelLocal = JSON.parse(await AsyncStorage.getItem('labelLocal'));

    this.setState({
      searchQuer: searchqueryLocal,
      searchFiel: labelLocal,
    });
  }

  async getDetails(item) {
    // console.log('label : ', item);

    await AsyncStorage.setItem('Booktitle', JSON.stringify(item.title));
    await AsyncStorage.setItem('fulltexturl', JSON.stringify(item.fulltexturl));

    const Booktitle = JSON.parse(await AsyncStorage.getItem('Booktitle'));
    const fullurl = JSON.parse(await AsyncStorage.getItem('fulltexturl'));

    (this.state.searchquery = item.fulltexturl),
      //   (this.state.label = item.label),
      console.log('state : ', this.state.searchquery);

    if (Booktitle !== '' && fullurl !== '') {
      // this.setState({
      //   popShow: false,
      // });
      // this.props.navigation.navigate('OpenBook');
      this.props.navigation.navigate('OpenBook');
    } else {
      console.log('Something wents wrong.');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* {this.state.popShow ? ( */}
        <>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <Appbar.Header style={styles.ttl}>
            <TouchableOpacity
              style={{paddingLeft: '2%'}}
              onPress={() => this.props.navigation.goBack()}>
              <AntDesign name="left" color="#05375a" size={25} />
            </TouchableOpacity>

            <TouchableOpacity
            style={{paddingLeft: '5%'}}
            onPress={() => this.props.navigation.openDrawer()}
            // onPress={() => this.props.navigation.goBack()}
            >
            <Feather name="menu" color="#05375a" size={25} />
          </TouchableOpacity>


            <Appbar.Content title="eResources" style={{
              // alignItems: 'center'
              paddingLeft:"16%"
              
            }}/>
          </Appbar.Header>

          {this.props.eText ? (
            <View style={styles.container}>
              <>
               
                <View
                  style={{
                    marginLeft: '5%',
                    marginRight: '5%',
                    marginBottom: '5%',
                  }}>
                  <View style={{}}>
                    <Text
                      style={{
                        color: '#6f6f6f',
                        fontSize: 18,
                        fontWeight: '700',
                        marginTop: '5%',
                        borderBottomColor: '#f68823',
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                      }}>
                      Publisher : {this.state.searchFiel}
                    </Text>
                  </View>

                  {this.props.posts.map((item, i) => {
                    {
                      if (item.title.length > 0) {
                        this.state.loader = false;
                      }
                    }
                    return (
                      <React.Fragment key={i}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => this.getDetails(item)}>
                          <LinearGradient
                            colors={['#f7f6ff', '#eff3fe']}
                            style={styles.commonGradient}>
                            <View style={{flexDirection: 'row'}}>
                              <View
                                style={{
                                  marginLeft: '5%',
                                  margin: 10,
                                  width: '80%',
                                }}>
                                <Text
                                  style={[
                                    styles.textCommon,
                                    {color: '#191919', margin: '3%'},
                                  ]}>
                                  {item.title}
                                </Text>
                              </View>

                              <View style={styles.rightIcon}>
                                <Feather
                                  name="chevron-right"
                                  color="#5ec6e9"
                                  size={15}
                                  style={styles.rightM}
                                />
                              </View>
                            </View>
                          </LinearGradient>
                        </TouchableOpacity>
                      </React.Fragment>
                    );
                  })}

                  

                  {this.state.loader ? (
                    <>
                      <View
                        style={{
                          height: '100%',
                          width: '100%',
                          position: 'absolute',
                          elevation: 3,
                          top: '50%',
                        }}></View>
                      <View
                        style={{
                          width: '100%',
                          marginTop: '35%',
                          justifyContent: 'center',
                        }}>
                        <ActivityIndicator size="large" color="#0d6efd" />
                      </View>
                    </>
                  ) : null}
                </View>
              </>
            </View>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{marginTop: '35%', fontSize: 30}}>
                {this.state.searchFiel}
              </Text>
            </View>
          )}
        </>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ttl: {
    backgroundColor: '#fff',
  },
  commonGradient: {
    width: '100%',
    justifyContent: 'center',
  },

  rightIcon: {
    justifyContent: 'center',
    marginTop: 4,
    flex: 1,
  },
  rightM: {
    textAlign: 'right',
    marginRight: 20,
  },
  button: {
    alignItems: 'center',
    marginTop: 13,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  textCommon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
