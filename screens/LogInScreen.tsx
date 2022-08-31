import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { api } from '../api';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../screens/SignUpScreen';

function LogInScreen(props: { navigation: { navigate: (arg0: string) => void; }; }) {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }
  const textInputChange = (val:any) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false
      });
    }
  }
  const handlePasswordChange = (val:any) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        password: val,
        isValidPassword: true
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  }
  const handleValidUser = (val:any) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        isValidUser: false
      });
    }
  }

  function logIn() {
    // console.log(data);
    api.logIn(data.email, data.password)
    .then(res => props.navigation.navigate('Root'))
    .catch(err => {
      // console.log(err);
      window.alert('Log in failed');
    });
  }
  
  function gotoSignUpScreen() {
    props.navigation.navigate('SignUp');
  };

  return (
    <ScrollView 
      contentContainerStyle={{ flex: 1 }}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="never"
      scrollEnabled={false}
      >
      <View style={styles.container}>
        <View style={styles.first}>
          <View style={styles.logo}/>
          <StatusBar />
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#9B9B9B"
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#9B9B9B"
              secureTextEntry={data.secureTextEntry ? true : false}
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity
              onPress={updateSecureTextEntry}
            >
              {data.secureTextEntry ?
                <Feather
                  name="eye-off"
                  color="grey"
                  size={20}
                />
                :
                <Feather
                  name="eye"
                  color="grey"
                  size={20}
                />
              }
            </TouchableOpacity>
            <Text>   </Text>
          </View>
          <TouchableOpacity onPress={() => logIn()} style={styles.link}>
            <Text style={styles.text}> 登入 </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => gotoSignUpScreen()} >
            <Text style={styles.signup_button}>註冊</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  first: {
    height: 600,
    width: 420,
    backgroundColor: '#FAE5A4',
    borderBottomLeftRadius: 130,
    borderBottomRightRadius: 130,
    paddingTop: 100,
    alignItems: 'center',
  },
  link: {
    marginTop: 10,
    height: 40,
    width: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#D3A51D",
  },
  text: {
    fontSize: 15,
    color: "#000",
    fontWeight: 'bold',
  },
  logo: {
    height: 160,
    width: 160,
    borderRadius: 100,
    backgroundColor: '#000',
    marginBottom: 60,
  },
  inputView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "60%",
    height: 40,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft : 15,
  },
  TextInput: {
    flex: 1,
  },
  forgot_button: {
    fontSize: 11,
    height: 30,
    textDecorationLine: 'underline',
  },
  signup_button:{
    fontSize: 11,
    height: 30,
    paddingTop: 8,
    textDecorationLine: 'underline',
  },
});