import React, {useState,useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';


import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile'
import Account from './src/screens/Account'
import Opac from './src/screens/Opac'
import Contact from './src/screens/Contact'
import About from './src/screens/About'

import AboutNext from './src/screens/aboutNext/About'
// import EResource from './src/screens/eresource/Eresource'
// import publisherDetails from './src/screens/eresource/PublicerDetails'
// import OpenBook from './src/screens/eresource/OpenBook'
import OpacNext from './src/screens/opac/OpacNext'
import EventDetails from './src/screens/EventDetails'


console.disableYellowBox = true;

const StackApp = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('email').then(value => {
      console.log("value :- ",value)
      if (value == null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });

    SplashScreen.hide();

  }, []);


  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = 'LogIn';
  } else {
    routeName = 'Drawer';
  }

  return (
      <Stack.Navigator
        initialRouteName={routeName}
        screenOptions={{
          headerShown: false,
        }}
        
        >
        <Stack.Screen name="LogIn" component={Login} />

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Accounts" component={Account} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="About" component={About} />

        <Stack.Screen name="Opac" component={Opac} />
        <Stack.Screen name="OpacNext" component={OpacNext} />

        {/* <Stack.Screen name="Eresource" component={EResource} />
        <Stack.Screen name="PublicerDetails" component={publisherDetails} />
        <Stack.Screen name="OpenBook" component={OpenBook} /> */}

        <Stack.Screen name="AboutNext" component={AboutNext} />
        <Stack.Screen name="EventDetails" component={EventDetails} />

      </Stack.Navigator>
  );
};

const Stack = createNativeStackNavigator();
export default StackApp;
