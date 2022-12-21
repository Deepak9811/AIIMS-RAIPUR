import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Text,
  BackHandler
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appbar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {API_DEFAULT} from '@env';

import RenderHtml from 'react-native-render-html';
import {windowHeight, windowWidth} from '../../utils/Dimensions';

import Feather from 'react-native-vector-icons/Feather';

import {DrawerActions} from '@react-navigation/native';

// const jumpToAction = DrawerActions

export default class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      header: '',
      image: '',
      bodyText: '',
      loader: true,
      contentData: [],
      showError: false,
      showImage: false,
    };
  }

  async componentDidMount() {

    // this.subs = this.props.navigation.addListener('didFocus', () => {
      this.getData(this.props.route.params.itemData.id);
      // console.log("check deepak :- ",this.props.navigation.addListener)
    // });
    
    try {

      const headingAbout = JSON.parse(
        await AsyncStorage.getItem('headingAbout'),
      );

      // console.log(
      //   'check content data :- ',
      //   this.props.route.params.itemData.id,
      // );
    } catch (error) {
      console.log(error.message);
    }
  }

 componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.props.navigation.navigate('Home')
    );
  }

  getData(id) {

    // let url = `http://192.168.1.201:86/getContent?cid=${id}&showDetails=true`;
    let url = `${API_DEFAULT}/getContent?cid=${id}&showDetails=true`;

    fetch(url, {
      method: 'GET',
      headers: {
        Accepts: 'application/json',
        'content-type': 'application/json',
      },
    })
      .then(result => {
        result.json().then(resp => {
          // console.log('data content :- ', resp.data);
          if (resp.status === 'success') {
            this.setState({
              contentData: resp.data,
              loader: false,
            });
          } else {
            this.setState({
              loader: false,
              showError: true,
              message: 'Something went wrong. Please try again',
            });
          }
        });
      })
      .catch(error => {
        this.setState({
          loader: false,
          showError: true,
          message:
            'There has been a problem with your fetch operation. Please try again',
        });
      });
  }

  openDrawer = () => {
    console.log("check :- ",this.props.navigation.dispatch(DrawerActions.toggleDrawer()))
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.ttl}>
          <TouchableOpacity
            style={{paddingLeft: '2%'}}
            onPress={() => this.props.navigation.goBack()}>
            <AntDesign name="left" color="#05375a" size={25} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{paddingLeft: '3%',paddingRight:"3%"}}
            // onPress={() => this.openDrawer()}
            onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
            // onPress={() => this.props.navigation.goBack()}
          >
            <Feather name="menu" color="#05375a" size={25} />
          </TouchableOpacity>

          <Appbar.Content
            title={this.props.route.params.itemData.heading}
            // style={{paddingLeft: '15%'}}
          />
        </Appbar.Header>

        {this.state.loader && (
          <View style={styles.activityIndicatorStyle}>
            <ActivityIndicator color="#57A3FF" size="large" />
          </View>
        )}

        {!this.state.showError ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            {this.state.contentData.map((item, i) => {
              // console.log('map :- ', item);
              if (item.imageUrl.length === 0) {
                this.state.showImage = false;
              } else {
                this.state.showImage = true;
              }
              return (
                <React.Fragment key={i}>
                  <View style={styles.body}>
                    {this.state.showImage && (
                      <Image
                        source={{
                          uri:
                            // `${this.props.route.params.itemData.imageUrl}` +
                            `${item.imageUrl}` + '?' + new Date(),
                        }}
                        resizeMode="contain"
                        style={[
                          styles.imageStyle,
                          // styles.shadow,
                          {display: this.state.ShowImage ? 'none' : 'flex'},
                        ]}
                      />
                    )}

                    {/* <Text style={{}}>{this.state.bodyText}</Text> */}
                    {/* <WebView style={{  width: 800, height: "100%" }}
                            source= {{html: `${this.state.bodyText}`}} /> */}

                    <View style={styles.shadow}>
                      <View
                        style={{
                          padding: 15,
                          borderRadius: 10,
                          backgroundColor: '#fff',
                        }}>
                        <RenderHtml
                          contentWidth={windowWidth}
                          source={{
                            html: `${item.bodyText}`,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </React.Fragment>
              );
            })}
          </ScrollView>
        ) : (
          <View
            style={{
              // flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 18,
            }}>
            <Image
              source={require('../../assets/image/reading.png')}
              style={{padding: 5, height: 250, width: 300, marginTop: 10}}
            />
            <Text
              style={{
                fontSize: 16,
                color: 'red',
                marginTop: 20,
                textAlign: 'center',
              }}>
              {this.state.message}
            </Text>
          </View>
        )}

        {/* <View style={{ margin: 0 }}>
                <WebView
                  scalesPageToFit={true}
                  bounces={false}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  frameBorder="0"
                  style={{ border: 0, width: 800, height: 300 }}
                  allowFullScreen=""
                  aria-hidden="false"
                  zoomEnabled={true}
                  zoomControlEnabled={true}
                  onLoadStart={() =>
                    this.setState({
                      loader: true,
                    })
                  }
                  onLoadEnd={() =>
                    this.setState({
                      loader: false,
                    })
                  }
                  source={{html: '<p>Here I am</p>'}}
                  automaticallyAdjustContentInsets={false}
                />
              </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  ttl: {
    backgroundColor: '#fff',
  },
  body: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
    marginBottom: '10%',
  },
  activityIndicatorStyle: {
    flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    // elevation: 3,
  },
  imageStyle: {
    height: windowHeight / 3,
    width: windowWidth / 1.1,
    marginBottom: '1%',
    borderRadius: 10,
  },
  shadow: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    marginTop: '5%',
    paddingBottom: 0,
  },
});



// ---------------------------------functional component

// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   ScrollView,
//   Text,
// } from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Appbar} from 'react-native-paper';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// import {API_DEFAULT} from '@env';

// import RenderHtml from 'react-native-render-html';
// import {windowHeight, windowWidth} from '../../utils/Dimensions';

// import Feather from 'react-native-vector-icons/Feather';

// import {DrawerActions,useIsFocused} from '@react-navigation/native';


// const About = props => {
//   const [header, setHeader] = useState('');
//   const [image, setImage] = useState('');
//   const [bodyText, setbodyText] = useState('');
//   const [contentData, setContentData] = useState([]);
//   const [showError, setShowError] = useState(false);
//   const [showImage, setShowImage] = useState('');
//   const [message, setMessage] = useState();
//   const [loader, setLoader] = useState(true);

//   const isFocused = useIsFocused();

//   // useEffect(async() => {
//   //   try {

//   //     const headingAbout = JSON.parse(
//   //       await AsyncStorage.getItem('headingAbout'),
//   //     );

//   //     // getData(props.route.params.itemData.id)

//   //     console.log(
//   //       'check content data :- ',
//   //      props.route.params.itemData.id,
//   //     );
//   //   } catch (error) {
//   //     console.log(error.message);
//   //   }
//   // }, [])

//   useEffect(() => {
   
//       getData(props.route.params.itemData.id);

//   }, []);

//   const getData = id => {
//     // let url = `http://192.168.1.201:86/getContent?cid=${id}&showDetails=true`;
//     let url = `${API_DEFAULT}/getContent?cid=${id}&showDetails=true`;

//     fetch(url, {
//       method: 'GET',
//       headers: {
//         Accepts: 'application/json',
//         'content-type': 'application/json',
//       },
//     })
//       .then(result => {
//         result.json().then(resp => {
//           // console.log('data content :- ', resp.data);
//           if (resp.status === 'success') {
//             setContentData(resp.data);
//             setLoader(false);

//             // this.setState({
//             //   contentData: resp.data,
//             //   loader: false,
//             // });
//           } else {
//             setLoader(false);
//             setShowError(true);
//             setMessage('Something went wrong. Please try again');
//             // this.setState({
//             //   loader: false,
//             //   showError: true,
//             //   message: 'Something went wrong. Please try again',
//             // });
//           }
//         });
//       })
//       .catch(error => {
//         setLoader(false);
//         setShowError(true);
//         setMessage(
//           'There has been a problem with your fetch operation. Please try again',
//         );
//         // this.setState({
//         //   loader: false,
//         //   showError: true,
//         //   message:
//         //     'There has been a problem with your fetch operation. Please try again',
//         // });
//       });
//   };

//   const openDrawers = () => {
//     const jumpToAction = DrawerActions.toggleDrawer();
//     // const jumpToAction = DrawerActions.jumpTo('Home');

//     props.navigation.dispatch(jumpToAction);

//     // console.log("check :- ",props.navigation.dispatch(jumpTo('Profile')))

    


//   };

//   return (
//     <View style={styles.container}>
//       <Appbar.Header style={styles.ttl}>
//         <TouchableOpacity
//           style={{paddingLeft: '2%'}}
//           onPress={() => props.navigation.goBack()}>
//           <AntDesign name="left" color="#05375a" size={25} />
//         </TouchableOpacity>

//         {/* <TouchableOpacity
//           style={{paddingLeft: '5%'}}
//           onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
//           // onPress={() => this.props.navigation.goBack()}
//         >
//           <Feather name="menu" color="#05375a" size={25} />
//         </TouchableOpacity> */}

//         <Appbar.Content
//           title={props.route.params.itemData.heading}
//           style={{paddingLeft: '15%'}}
//         />
//       </Appbar.Header>

//       {loader && (
//         <View style={styles.activityIndicatorStyle}>
//           <ActivityIndicator color="#57A3FF" size="large" />
//         </View>
//       )}

//       {!showError ? (
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           showsHorizontalScrollIndicator={false}>
//           {contentData.map((item, i) => {
//             // console.log('map :- ', item);
//             // if (item.imageUrl.length === 0) {
//             //   this.state.showImage = false;
//             // } else {
//             //   this.state.showImage = true;
//             // }
//             return (
//               <React.Fragment key={i}>
//                 <View style={styles.body}>
//                   {/* {this.state.showImage && ( */}
//                   <Image
//                     source={{
//                       uri: `${item.imageUrl}` + '?' + new Date(),
//                     }}
//                     resizeMode="contain"
//                     style={[
//                       styles.imageStyle,
//                       // {display: this.state.ShowImage ? 'none' : 'flex'},
//                     ]}
//                   />
//                   {/* )} */}

//                   <View style={styles.shadow}>
//                     <View
//                       style={{
//                         padding: 15,
//                         borderRadius: 10,
//                         backgroundColor: '#fff',
//                       }}>
//                       <RenderHtml
//                         contentWidth={windowWidth}
//                         source={{
//                           html: `${item.bodyText}`,
//                         }}
//                       />
//                     </View>
//                   </View>
//                 </View>
//               </React.Fragment>
//             );
//           })}
//         </ScrollView>
//       ) : (
//         <View
//           style={{
//             // flex: 2,
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginTop: 18,
//           }}>
//           <Image
//             source={require('../../assets/image/reading.png')}
//             style={{padding: 5, height: 250, width: 300, marginTop: 10}}
//           />
//           <Text
//             style={{
//               fontSize: 16,
//               color: 'red',
//               marginTop: 20,
//               textAlign: 'center',
//             }}>
//             {message}
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default About;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#fff',
//   },
//   ttl: {
//     backgroundColor: '#fff',
//   },
//   body: {
//     marginLeft: '5%',
//     marginRight: '5%',
//     marginTop: '5%',
//     marginBottom: '10%',
//   },
//   activityIndicatorStyle: {
//     flex: 1,
//     position: 'absolute',
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     marginBottom: 'auto',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     justifyContent: 'center',
//     width: '100%',
//     height: '100%',
//     // elevation: 3,
//   },
//   imageStyle: {
//     height: windowHeight / 3,
//     width: windowWidth / 1.1,
//     marginBottom: '1%',
//     borderRadius: 10,
//   },
//   shadow: {
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.18,
//     shadowRadius: 1.0,
//     elevation: 1,
//     marginTop: '5%',
//     paddingBottom: 0,
//   },
// });
