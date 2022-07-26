import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.first}>
            <Text style={styles.title}> Knowledge </Text>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={25} style={styles.notification} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.main}>
          <TouchableOpacity style={styles.myButton}>
            <View>
              <Text style={styles.text}>Tomato </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //佔據所有空間
  },
  header: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  first:{
    height: 210,
    width: 400,
    backgroundColor: '#FF9900',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    paddingTop: 160,
    flexDirection: 'row',
  },
  title: {
    fontSize: 25,
    color: "white",
    fontWeight: 'bold',
    paddingLeft: 60,
  },
  notification: {
    color: "white",
    fontWeight: 'bold',
    paddingTop: 3,
    paddingLeft: 120,
  },
  main: {
    flex: 4,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  myButton:{
    marginTop: 20,
    height: 60,
    width: 250,
    borderRadius: 20,
    backgroundColor:'transparent',
    borderColor:'#FF9900',
    borderWidth: 4,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  text:{
    fontSize: 20,
    color: "black",
  },
});

