import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import * as Animatable from 'react-native-animatable';
import React, { useState } from "react";
import { Text } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { api } from '../api';

let val: string

export default function LogInScreen({ navigation }: RootStackScreenProps<'LogIn'>) {
  const [data, setData] = React.useState({
    username: '',
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
    if (val.trim().length >= 8) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false
      });
    }
  }
  const handlePasswordChange = (val:any) => {
    if (val.trim().length >= 8) {
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
    api.logIn(data.username, data.password)
    .then(res => navigation.replace('Root'))
    .catch(err => {
      // console.log(err);
      window.alert('Log in failed');
    });
  }

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
              placeholder="Username"
              placeholderTextColor="#9B9B9B"
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChange ?
              <Animatable.View
                animation="bounceIn"
              >
                <Feather
                  name="check-circle"
                  color="green"
                  size={20}
                />
              </Animatable.View>
              : null}
              <Text>   </Text>
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
          <TouchableOpacity>
            <Text style={styles.forgot_button}>忘記密碼？</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => logIn()} style={styles.link}>
            <Text style={styles.text}> 登入 </Text>
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  first: {
    height: 540,
    width: 420,
    backgroundColor: '#FAE5A4',
    borderBottomLeftRadius: 130,
    borderBottomRightRadius: 130,
    paddingTop: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  link: {
    marginTop: 10,
    height: 40,
    width: 250,
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
    marginHorizontal: 0,
  },
});