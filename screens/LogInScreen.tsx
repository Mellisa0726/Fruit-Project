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
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function LogInScreen({ navigation }: RootStackScreenProps<'LogIn'>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.first}>
        <View style={styles.logo}/>
        <StatusBar />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
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
    height: 450,
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
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    width: "60%",
    height: 40,
    marginBottom: 10,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginHorizontal: 0,
    alignItems: 'center',
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
});