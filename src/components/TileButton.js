import React from 'react';

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
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const TileButton = ({navigation,resourcesTextData,opacTextData,profileTextData,accountTextData,}) => {
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '31%', marginTop: 10}}>
          <TouchableOpacity
            style={styles.bxShoadow}
            onPress={() =>
             navigation.navigate('Profile', {
                profileData: profileTextData,
              })
            }>
            <LinearGradient
              colors={['#F3F3F3', '#F3F3F3']}
              style={styles.commonGradient}>
              <View style={{padding: 10}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Feather name="user" color="#fe8c00" size={35} />
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}>
                  <Text style={{color: '#717171',fontSize:12}}>Your</Text>
                  <Text style={{color: '#717171', paddingTop: 1}}>Profile</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/*  ---------------------------ACCOUNT------------------------------ */}
        <View style={{width: '31%', marginLeft: 10, marginTop: 10}}>
          <TouchableOpacity
            style={styles.bxShoadow}
            onPress={() =>
             navigation.navigate('Accounts', {
                accountData: accountTextData,
              })
            }>
            <LinearGradient
              colors={['#F3F3F3', '#F3F3F3']}
              style={styles.commonGradient}>
              <View style={{padding: 10}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Feather name="lock" color="#fe8c00" size={35} />
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}>
                  <Text style={{color: '#717171',fontSize:12}}>Your</Text>
                  <Text style={{color: '#717171',fontSize:12}}>Account</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* -----------------ABOUT--------------------------- */}
        <View style={{width: '31%', marginLeft: 10, marginTop: 10}}>
          <TouchableOpacity
            style={styles.bxShoadow}
            // onPress={() =>navigation.push('About')}
            onPress={() => navigation.openDrawer()}
            >
            <LinearGradient
              colors={['#F3F3F3', '#F3F3F3']}
              style={styles.commonGradient}>
              <View style={{padding: 10}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <AntDesign name="infocirlceo" color="#fe8c00" size={35} />
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}>
                  <Text style={{color: '#717171',fontSize:12}}>More About</Text>
                  <Text style={{color: '#717171',fontSize:12}}>The Library</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* -----------------SEARCH-BOOK------------------------------ */}

      <View style={{flexDirection: 'row', marginTop: 10,justifyContent:"center"}}>
        <View style={{width: '31%', marginTop: 10}}>
          <TouchableOpacity
            style={styles.bxShoadow}
            onPress={() =>
             navigation.navigate('Opac', {
                opacData:opacTextData,
              })
            }>
            <LinearGradient
              colors={['#F3F3F3', '#F3F3F3']}
              style={styles.commonGradient}>
              <View style={{padding: 10}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <AntDesign name="search1" color="#fe8c00" size={35} />
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 15,
                    marginBottom: 10,
                  }}>
                  <Text style={{color: '#717171',fontSize:12}}>Search Book</Text>

                  <Text style={{color: '#717171',fontSize:12}}>(OPAC)</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/*  ---------------------------ACCOUNT------------------------------ */}
        {/* <View style={{width: '31%', marginLeft: 10, marginTop: 10}}>
          <TouchableOpacity
            style={styles.bxShoadow}
            onPress={() =>
              
             navigation.navigate('Eresource', {
                eresourceData: resourcesTextData,
              })
            }>
            <LinearGradient
              colors={['#F3F3F3', '#F3F3F3']}
              style={styles.commonGradient}>
              <View style={{padding: 10}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <AntDesign name="book" color="#fe8c00" size={35} />
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 15,
                    marginBottom: 10,
                  }}>
                  <Text style={{color: '#717171',fontSize:12}}>E-Resources</Text>

                  <Text style={{color: '#717171',fontSize:12}}></Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View> */}

        {/* -----------------CONTACT--------------------------- */}
        <View style={{width: '31%', marginLeft: 10, marginTop: 10}}>
          <TouchableOpacity
            style={styles.bxShoadow}
            onPress={() =>navigation.navigate('Contact')}>
            <LinearGradient
              colors={['#F3F3F3', '#F3F3F3']}
              style={styles.commonGradient}>
              <View style={{padding: 10}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <AntDesign name="contacts" color="#fe8c00" size={35} />
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 14,
                    marginBottom: 11,
                  }}>
                  <Text style={{color: '#717171',fontSize:12}}>Contact</Text>
                  <Text style={{color: '#717171',fontSize:12}}>US</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default TileButton;

const styles = StyleSheet.create({
  bxShoadow: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },

  commonGradient: {
    width: '100%',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
