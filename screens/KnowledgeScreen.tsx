import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EatScreen from '../screens/EatScreen';
import RecipeScreen from '../screens/RecipeScreen';


function KnowledgeScreen(props: { navigation: { navigate: (arg0: string) => void; }; }) {
  const gotoEatStackScreen = () => {
    props.navigation.navigate('什麼時候適合吃');
  };
  const gotoRecipeStackScreen = () => {
    props.navigation.navigate('香蕉食譜');
  };
  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.first}>
            <Text style={styles.title}> 關於香蕉 </Text>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={25} style={styles.notification} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.main}>
          <TouchableOpacity onPress={gotoEatStackScreen} style={styles.myButton}>
            <View>
              <Text style={styles.text}> 什麼時候適合吃 </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={gotoRecipeStackScreen} style={styles.myButton}>
            <View>
              <Text style={styles.text}> 香蕉食譜 </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Knowledge" component={KnowledgeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="什麼時候適合吃" component={EatScreen}/>
        <Stack.Screen name="香蕉食譜" component={RecipeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  first:{
    height: 210,
    width: 420,
    backgroundColor: '#FAE5A4',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    paddingTop: 160,
    flexDirection: 'row',
  },
  title: {
    fontSize: 25,
    color: "#7E6107",
    fontWeight: 'bold',
    paddingLeft: 60,
  },
  notification: {
    color: "#7E6107",
    fontWeight: 'bold',
    paddingTop: 3,
    paddingLeft: 150,
  },
  main: {
    flex: 4,
    backgroundColor: 'white',
    alignItems: 'center',
    zIndex: -1,
  },
  myButton:{
    marginTop: 30,
    height: 60,
    width: 250,
    borderRadius: 20,
    backgroundColor:'transparent',
    borderColor:'#FAE5A4',
    borderWidth: 4,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  text:{
    fontSize: 20,
    color: "black",
  },
});

