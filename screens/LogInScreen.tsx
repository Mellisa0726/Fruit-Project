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
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text } from '../components/Themed';
import { RootStackScreenProps } from '../types';
let val: string
export default function LogInScreen({ navigation }: RootStackScreenProps<'LogIn'>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  return (
    <View style={styles.container}>
      <View style={styles.first}>
        <View style={styles.logo}/>
        <StatusBar />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#9B9B9B"
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#9B9B9B"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(password) => setPassword(password)}
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
          <Text style={styles.forgot_button}>Forgot Password ?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <Text style={styles.linkText}>Log in!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  first: {
    height: 480,
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
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
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