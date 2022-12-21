// import React from 'react';
// import {createDrawerNavigator} from '@react-navigation/drawer';

// import Ionicons from 'react-native-vector-icons/Ionicons';

// import Home from '../screens/Home';
// import CustomDrawer from '../components/CustomDrawer';
// import Profile from '../screens/Profile';
// import Account from '../screens/Account';
// import Opac from '../screens/Opac';
// import EResource from '../screens/eresource/Eresource';
// import AboutNext from '../screens/aboutNext/About';
// import Contact from '../screens/Contact';
// import PublicerDetails from '../screens/eresource/PublicerDetails';
// import OpenBook from '../screens/eresource/OpenBook';
// import OpacNext from '../screens/opac/OpacNext';
// import EventDetails from '../screens/EventDetails';

// const Drawer = createDrawerNavigator();

// const AuthStack = () => {
//   return (
//     <Drawer.Navigator
//       drawerContent={props => <CustomDrawer {...props} />}
//       screenOptions={{
//         headerShown: false,
//         drawerActiveBackgroundColor: '#aa18ea',
//         drawerActiveTintColor: '#fff',
//         drawerInactiveTintColor: '#333',
//         drawerLabelStyle: {
//           marginLeft: -25,
//           fontFamily: 'Roboto-Medium',
//           fontSize: 15,
//         },
//       }}>

        


//       <Drawer.Screen
//         name="Home"
//         component={Home}
//         // options={{
//         //   drawerIcon: ({color}) => (
//         //     <Ionicons name="person-outline" size={22} color={color} />
//         //   ),
//         // }}
//       />

//       <Drawer.Screen name="Profile" component={Profile} />

//       {/* <Drawer.Screen name="Accounts" component={Account} /> */}

//       <Drawer.Screen name="AboutNext" component={AboutNext} />

//       <Drawer.Screen name="Opac" component={Opac} />
//       <Drawer.Screen name="Eresource" component={EResource} />
//       {/* <Drawer.Screen name="PublicerDetails" component={PublicerDetails} /> */}
//       {/* <Drawer.Screen name="OpenBook" component={OpenBook} /> */}

//       {/* <Drawer.Screen name="OpacNext" component={OpacNext} /> */}

//       <Drawer.Screen name="EventDetails" component={EventDetails} />

//       <Drawer.Screen name="Contact" component={Contact} />


//     </Drawer.Navigator>
//   );
// };

// export default AuthStack;
