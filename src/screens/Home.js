import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  BackHandler,
  Alert,
  Linking,
  Image,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  TextInput,
  ToastAndroid,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_SLIDER, API_DEFAULT} from '@env';

import Carousel from 'react-native-snap-carousel';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

import RNExitApp from 'react-native-exit-app';

import RenderHtml from 'react-native-render-html';

import {windowHeight, windowWidth} from '../utils/Dimensions';
import NewBookSlide from '../components/NewBookSlide';
import TileButton from '../components/TileButton';
import NewAndNotices from '../components/NewAndNotices';
import Quote from '../components/Quote';
import Events from '../components/Events';
import FeedBack from '../components/FeedBack';
import Footer from '../components/Footer';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userGoogleInfo: {},
      name: '',
      email: '',
      id: '',
      loader: false,
      sliderData: [],
      showSlider: false,

      eventData: [],
      showEvents: false,
      showFeedBack: true,
      checked: false,
      showFeedData: false,
      feedData: [],
      newFeedData: [],
      showRate: false,
      starCount: 3,
      selectingData: [],

      radioButtons: [],
      data: [],
      description: '',
      showResponse: true,
      hideFeedBack: true,
      showSideMenu: false,
      upNdDownI: false,
      newsData: [],
      shownews: false,
      homeHeadingData: '',
      profileTextData: '',
      accountTextData: '',
      aboutTextData: '',
      opacTextData: '',
      resourcesTextData: '',
      contactTextData: '',
    };
  }

  async componentDidMount() {
    // console.log('check first open');
    try {
      const email = JSON.parse(await AsyncStorage.getItem('email'));
      const userId = JSON.parse(await AsyncStorage.getItem('userId'));
      const sName = JSON.parse(await AsyncStorage.getItem('sName'));
      const sNameLast = JSON.parse(await AsyncStorage.getItem('sNameLast'));

      this.setState({
        name: sName + ' ' + sNameLast,
        id: userId,
        email: email,
      });

      // console.log('email : ', this.state.email);
    } catch (error) {
      console.log('There has problem in AsyncStorage : ' + errro.message);
    }

    this.getContentDetails();

    setTimeout(() => {
      this.getSliderData();
    }, 100);

    setTimeout(() => {
      this.getFeedQnA();
    }, 200);

    setTimeout(() => {
      this.getEventDetails();
    }, 300);

    setTimeout(() => {
      this.getNewsData();
    }, 400);

    setTimeout(() => {
      this.getQuote();
    }, 500);
  }

  async getContentDetails() {
    let url = `${API_DEFAULT}/getMenuContent`;

    // alert(url)

    fetch(url, {
      method: 'GET',
      headers: {
        Accepts: 'application/json',
        'content-type': 'application/json',
      },
    }).then(result => {
      result.json().then(async resp => {
        // console.log("get Content Details :- ",resp.data);
        if (resp.status === 'success') {
          this.setState({
            //profile
            // profileTextData: resp.data[0].bodyText,
            //account
            // accountTextData: resp.data[1].bodyText,
            //about
            // aboutTextData: resp.data[2].bodyText,
            //home
            // homeHeadingData: resp.data[3].bodyText,
            //opac
            // opacTextData: resp.data[4].bodyText,
            //resources
            // resourcesTextData: resp.data[5].bodyText,
            //contact
            // contactTextData: resp.data[6].bodyText,
          });

          let hd = resp.data;

          let cont;

          for (let i = 0; i < resp.data.length; i++) {
            if (hd[i].heading === 'profile') {
              // console.log('get menu :- ', hd[i]);
              this.setState({
                //profile
                profileTextData: hd[i].bodyText,
              });
            } else if (hd[i].heading === 'your account') {
              // console.log('get menu :- ', hd[i]);
              this.setState({
                //account
                accountTextData: hd[i].bodyText,
              });
            } else if (hd[i].heading === 'home') {
              // console.log('get menu :- ', hd[i]);
              this.setState({
                //home
                homeHeadingData: hd[i].bodyText,
              });
            } else if (hd[i].heading === 'opac') {
              // console.log('get menu :- ', hd[i]);
              this.setState({
                //opac
                opacTextData: hd[i].bodyText,
              });
            } else if (hd[i].heading === 'e-resources') {
              // console.log('get menu :- ', hd[i]);
              this.setState({
                //resources
                resourcesTextData: hd[i].bodyText,
              });
            } else if (hd[i].heading === 'contact us') {
              // console.log('get menu :- ', hd[i]);
              cont = hd[i].bodyText;
              this.setState({
                //contact

                contactTextData: hd[i].bodyText,
              });
            } else if (hd[i].heading === 'your account') {
              // console.log('get menu :- ', hd[i]);
              this.setState({
                //about
                aboutTextData: hd[i].bodyText,
              });
            }
          }

          try {
            await AsyncStorage.setItem('contactTextData', JSON.stringify(cont));
          } catch (error) {
            console.log(error.message);
          }
        }
      });
    });
  }

  getNewsData() {
    let url = `${API_DEFAULT}getNews`;
    console.log('url :- ', url);
    // `http://bitsomapi.libcon.in/getNews`
    fetch(url, {
      method: 'GET',
      headers: {
        Accepts: 'application/json',
        'content-type': 'application/json',
      },
    })
      .then(result => {
        result.json().then(resp => {
          // console.log('resp event details :- ', resp);
          if (resp.status === 'success') {
            this.setState({
              newsData: resp.data,
              shownews: true,
            });
          } else {
            this.setState({
              shownews: false,
            });
          }
        });
      })
      .catch(error => {
        // console.log(error.message);
        this.setState({
          shownews: false,
        });
      });
  }

  getEventDetails() {
    let url = `${API_DEFAULT}/getEvent`;
    // `https://bitsomapi.libcon.in/getEvent`
    fetch(url, {
      method: 'GET',
      headers: {
        Accepts: 'application/json',
        'content-type': 'application/json',
      },
    })
      .then(result => {
        result.json().then(resp => {
          // console.log('resp event details :- ', resp);
          if (resp.status === 'success') {
            this.setState({
              eventData: resp.data,
              showEvents: true,
            });
          } else {
            this.setState({
              showEvents: false,
            });
          }
        });
      })
      .catch(error => {
        // console.log(error.message);
        this.setState({
          showEvents: false,
        });
      });
  }

  getEvent(item) {
    this.props.navigation.navigate('EventDetails', {eventDetails: item});
  }

  showFeed() {
    this.setState({showFeedBack: true});
  }

  HideFeed() {
    this.setState({showFeedBack: false});
  }

  getFeedQnA() {
    let url = `${API_DEFAULT}/getQuestions`;
    // `https://bitsomapi.libcon.in/getQuestions`
    fetch(url, {
      method: 'GET',
      headers: {
        Accepts: 'application/json',
        'content-type': 'application/json',
      },
    })
      .then(result => {
        result.json().then(resp => {
          // console.log('resp FeedBack details :- ', resp);
          if (resp.status === 'success') {
            let FormatData = [];

            this.setState({
              fdtitle: resp.data[0].heading,
              feedData: resp.data,
              showFeedData: true,
            });

            var keys = this.state.feedData.map(t => t.type);

            var id = this.state.feedData.map(t => t.id);
            var type = this.state.feedData.map(t => t.type);
            var heading = this.state.feedData.map(t => t.heading);
            var question = this.state.feedData.map(t => t.question);
            var validFrom = this.state.feedData.map(t => t.validFrom);
            var validUpto = this.state.feedData.map(t => t.validUpto);
            var active = this.state.feedData.map(t => t.active);
            var mcq = this.state.feedData.map(t => t.mcq);

            let Selected = [];

            for (let i = 0; i < keys.length; i++) {
              Selected.push({
                id: id[i],
                type: type[i],
                heading: heading[i],
                question: question[i],
                validFrom: validFrom[i],
                validUpto: validUpto[i],
                active: active[i],
                mcq: mcq[i],
                star: 0,
              });
            }
            this.setState({
              startData: Selected,
              newFeedData: Selected,
            });
          } else {
            this.setState({
              showFeedData: false,
            });
          }
        });
      })
      .catch(error => {
        console.log(error.message);
        this.setState({
          showFeedData: false,
        });
      });
  }

  onPressRadioButton = (item, i) => {
    const {radioButtons, email} = this.state;
    // return(console.log("check radio button :- ",email,radioButtons))
    let postFeed = radioButtons;
    // console.log('check radio button :- ', item);

    item.map((item, i) => {
      if (item.selected === true) {
        let strng = {
          questionId: item.questionId,
          user: email,
          answer: item.answer,
          show: item.active,
        };

        postFeed.push(strng);
      }
    });

    let newData = [
      ...new Map(postFeed.map(item => [item.questionId, item])).values(),
    ];
    // console.log('new data radio button :- ', newData);
    this.setState({
      radioButtons: newData,
    });
  };

  onStarRatingPress = (rating, item, i) => {
    // console.log(rating, item, i);
    const {radioButtons, email} = this.state;

    let postFeed = radioButtons;

    let strng = {
      questionId: item.questionId,
      user: email,
      answer: rating,
      show: item.active,
    };

    postFeed.push(strng);

    let newData = [
      ...new Map(postFeed.map(item => [item.questionId, item])).values(),
    ];
    // console.log('new Data array :- ', newData);
    this.setState({
      radioButtons: newData,
    });

    const {newFeedData} = this.state;

    const newCompanies = [...newFeedData];
    newCompanies[item.starLenght].star = rating;
    this.setState({newFeedData: newCompanies});
    // console.log('input :- ', newCompanies);
  };

  descrip = (des, item) => {
    // console.log(des, item);
    const {radioButtons, email} = this.state;
    let postFeed = radioButtons;

    let strng = {
      questionId: item.questionId,
      user: email,
      answer: des,
      show: item.active,
    };

    postFeed.push(strng);

    let newData = [
      ...new Map(postFeed.map(item => [item.questionId, item])).values(),
    ];
    // console.log(newData);
    this.setState({
      radioButtons: newData,
      description: des,
    });
  };

  postFeedBack = () => {
    const {radioButtons} = this.state;

    // console.log(radioButtons.length);
    // return console.log(radioButtons);

    if (radioButtons.length != 0) {
      this.setState({
        loaderSubmit: true,
      });

      let url = `${API_DEFAULT}/feedback`;

      // `https://bitsomapi.libcon.in/feedback`

      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(radioButtons),
      })
        .then(result => {
          result.json().then(resp => {
            // console.log('Feedback Response resp  :- ', resp);

            if (resp.status === 'success') {
              this.setState({
                showFeedBack: false,
                showResponse: false,
                loaderSubmit: false,
              });

              setTimeout(() => {
                this.setState({
                  hideFeedBack: false,
                });
              }, 3000);
            } else {
              this.setState({
                loaderSubmit: false,
              });
              ToastAndroid.show(
                'Something went wrong. Please try again.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
              );
            }
          });
        })
        .catch(error => {
          this.setState({
            loaderSubmit: false,
          });
          Alert.alert(
            'Error!',
            'Something went wrong. Please try again.',
            [{text: 'Okay'}],
            {cancelable: true},
          );
        });
    } else {
      Alert.alert(
        'Alert!',
        'Please select the at lest one option...',
        [{text: 'Okay'}],
        {cancelable: true},
      );
    }
  };

  getQuote() {
    fetch(`https://zenquotes.io/api/random`, {
      method: 'GET',
      headers: {
        Accepts: 'application/json',
        'content-type': 'application/json',
      },
    })
      .then(result => {
        result.json().then(resp => {
          // console.log('Quote of the day :- ', resp[0].q);

          if (resp.length > 0) {
            this.setState({
              Quote: resp[0].q,
              showQuote: true,
            });
          } else {
            this.setState({
              showQuote: false,
            });
          }
        });
      })
      .catch(error => {
        // console.log(error);
        this.setState({
          showSlider: false,
        });
      });
  }

  getSliderData() {
    fetch(`${API_SLIDER}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(result => {
        result.json().then(resp => {
          if (resp.status === 'success') {
            this.setState({
              sliderData: resp.data,
              showSlider: true,
            });
            // console.log('data :- ', this.state.sliderData);
          } else {
            this.setState({
              showSlider: false,
            });
          }
        });
      })
      .catch(error => {
        // console.log(error);
        this.setState({
          showSlider: false,
        });
      });
  }

  _renderItem = ({item, index}) => {
    return (
      <NewBookSlide
        item={item}
        index={index}
        navigation={this.props.navigation}
      />
    );
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      RNExitApp.exitApp(),
      this.disableBackButton(),
    );
  }

  disableBackButton() {
    BackHandler.exitApp();
    return true;
  }

  logOut() {
    BackHandler.removeEventListener('hardwareBackPress', this.logOutNClear());
  }

  logOutNClear() {
    Alert.alert(
      'Log out from App',
      'Do you want to log out from app ?',
      [
        {text: 'Yes', onPress: () => this.clearToken()},
        {text: 'No', onPress: () => console.warn('No Pressed')},
      ],
      {cancelable: true},
    );
    return true;
  }

  async clearToken() {
    await AsyncStorage.clear();
    // BackHandler.exitApp();
    RNExitApp.exitApp();
  }

  ratingCompleted(rating, item, i) {
    console.log('Rating is: ' + rating);
  }

  render() {
    return (
      <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
        <StatusBar backgroundColor="#ff5755" barStyle="light-content" />
        
        <ImageBackground
          source={require('../assets/image/template_1.png')}
          resizeMode="cover"
          style={{
            flex: 1,
            // justifyContent: 'center',
          }}>
          <View
          // style={styles.container}
          >
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    marginLeft: '5%',
                    marginRight: '5%',
                  }}>
                  <View style={styles.uDetail}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={[styles.uNme, {color: '#fff', width: '80%'}]}>
                        Hello
                      </Text>

                      <TouchableOpacity
                        onPress={() => this.logOut()}
                        style={{
                          justifyContent: 'center',
                          flex: 1,
                          alignItems: 'center',
                          borderRadius: 5,
                        }}>
                        <View style={{flexDirection: 'row', marginLeft: 10}}>
                          <Text
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              color: '#fff',
                            }}>
                            Log out
                          </Text>
                          <MaterialIcons
                            name="logout"
                            color="#fff"
                            size={15}
                            style={{
                              marginLeft: 5,
                              marginTop: 3,
                              marginRight: 10,
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.uNme}>{this.state.name}</Text>
                    {/* <Text style={{marginTop: 10, color: '#FAFAFA'}}>
                      Welcome to Learning Resource Center, BITSoM  */}

                    <RenderHtml
                      contentWidth={windowWidth}
                      source={{
                        html: `${this.state.homeHeadingData}`,
                      }}
                    />
                    {/* </Text> */}
                  </View>

                  {/* ---------PROFILE */}
                  <TileButton
                    navigation={this.props.navigation}
                    resourcesTextData={this.state.resourcesTextData}
                    opacTextData={this.state.opacTextData}
                    profileTextData={this.state.profileTextData}
                    accountTextData={this.state.accountTextData}
                  />

                  {/* ------------------------------SLIDER----------------------------------------------------- */}

                  <View style={{marginTop: '8%'}}>
                    {this.state.showSlider ? (
                      <>
                        <View
                          style={{
                            // borderBottomWidth: 1,
                            // borderBottomColor: '#fff',
                            // marginBottom: '6%',
                          }}></View>

                        <View>
                          <Text>New Arrivals</Text>
                        </View>

                        <View style={{marginTop: '8%',}}>
                          <Carousel
                            layout={'default'}
                            layoutCardOffset={18}
                            ref={c => {
                              this._carousel = c;
                            }}
                            data={this.state.sliderData}
                            renderItem={this._renderItem}
                            sliderWidth={viewportWidth}
                            itemWidth={150}
                            loop={true}
                          />
                        </View>
                      </>
                    ) : null}

                    {/* --------------------ALL-EVENTS------------------------------- */}
                    {this.state.showEvents && (
                      <Events
                        eventData={this.state.eventData}
                        navigation={this.props.navigation}
                      />
                    )}

                    {/* ------------------NewsAndNotices----------------------------- */}

                    {this.state.shownews ? (
                      <NewAndNotices newsData={this.state.newsData} />
                    ) : null}

                    

                    {/* --------------------FeedBack------------------------------- */}
                    {/* {this.state.showEvents && ( */}

                    {this.state.showFeedData ? (
                      <>
                        {this.state.hideFeedBack ? (
                          <FeedBack
                            showResponse={this.state.showResponse}
                            showFeedBack={this.state.showFeedBack}
                            newFeedData={this.state.newFeedData}
                            loaderSubmit={this.state.loaderSubmit}
                            typ={this.state.typ}
                            showRate={this.state.showRate}
                            showGEN={this.state.showGEN}
                            showMcq={this.state.showMcq}
                            showOption={this.state.showOption}
                            newMcqData={this.state.newMcqData}
                            description={this.state.description}
                            onPressRadioButton={this.onPressRadioButton}
                            onStarRatingPress={this.onStarRatingPress}
                            descrip={this.descrip}
                            postFeedBack={this.postFeedBack}
                          />
                        ) : null}
                      </>
                    ) : null}


                    {/* ------------------Quote----------------------------- */}

                    {this.state.showQuote ? (
                      <Quote quote={this.state.Quote} />
                    ) : null}

                    {/* )} */}
                  </View>
                </View>

                
              </ScrollView>
            </>
          </View>


          <Footer/>

          {/* <View
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
                backgroundColor:"#fff"
              }}>
              <Text>Powered by </Text>
              <Text style={{color: '#f68823'}}> LIBCON</Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 10,
                backgroundColor: '#4f4f4f',
                padding: 10,
              }}>
              <ScrollView>
                <View style={{flexDirection: 'row', width: '76%'}}>
                  <Text style={{fontSize: 17, color: '#fff'}}>Logged as </Text>
                  <Text style={{fontSize: 17, color: '#fff'}}>
                    {this.state.name}
                  </Text>

                  
                </View>
              </ScrollView>
              <TouchableOpacity
                    onPress={() => this.logOut()}
                    style={{width: '22%', flexDirection: 'row', marginLeft: 10}}>
                    <Text style={{fontSize: 16, color: '#fff'}}>Log Out</Text>
                    <MaterialIcons
                      name="logout"
                      color="#fff"
                      size={15}
                      style={{
                        marginLeft: 5,
                        marginTop: 3,
                      }}
                    />
                  </TouchableOpacity>
            </View>
          </View> */}
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ttl: {
    backgroundColor: '#fff',
  },
  container: {
    marginLeft: '5%',
    marginRight: '5%',
  },
  uDetail: {
    marginTop: 10,
    marginBottom: 10,
  },
  bxShoadow: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },

  uNme: {
    fontSize: 30,
    color: '#fff',
  },
  button: {
    alignItems: 'center',
    marginTop: 13,
  },
  commonGradient: {
    width: '100%',
    justifyContent: 'center',
    borderRadius: 10,
  },
  textCommon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconC: {
    marginTop: 4,
    marginRight: 10,
    marginLeft: 20,
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
  scrollView: {
    flexGrow: 1,
    flex: 1,
  },
  activityIndicatorStyle: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '20%',
    marginTop: '20%',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

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

  textAreaContainer: {
    marginLeft: '5%',
    paddingRight: '2%',
    borderColor: '#D8D8D8',
    borderWidth: 1,
    padding: 5,
    width: '93%',
    borderRadius: 5,
    marginBottom: '5%',
  },
  textArea: {
    // height: 150,
    paddingBottom: '10%',
    justifyContent: 'flex-start',
  },

  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  fdTitle: {
    width: '100%',
    marginTop: '5%',
    borderBottomWidth: 1,
    paddingBottom: '3%',
    borderColor: '#E2E2E2',
  },
  txtfd: {
    textTransform: 'capitalize',
    fontSize: 18,
    width: '90%',
    color: '#000',
  },

  pop: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    elevation: 100,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});
