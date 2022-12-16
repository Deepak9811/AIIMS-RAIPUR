import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import StackApp from './StackApp';

import CustomDrawer from './src/components/CustomDrawer';

console.disableYellowBox = true;

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: '#aa18ea',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
          drawerLabelStyle: {
            marginLeft: -25,
            fontFamily: 'Roboto-Medium',
            fontSize: 15,
          },
        }}>

        <Drawer.Screen
        name="App"
        component={StackApp}
       
      />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const Drawer = createDrawerNavigator();