import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, SafeAreaView, StyleSheet, Button, TouchableOpacity, Text, View, Image, ImageBackground } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function GoToButton1({ screenName }:any) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(screenName)} style={styles.myButton_1}>
      <View>
        <ImageBackground style={styles.banana} source={require('../assets/images/香蕉熟成階段.png')}>
          <Text style={styles.text}> 香蕉熟成階段 </Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
} 
function GoToButton2({ screenName }: any) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(screenName)} style={styles.myButton_2}>
      <View>
        <ImageBackground style={styles.banana} source={require('../assets/images/廚房用具.png')}>
          <Text style={styles.text}> 香蕉食譜 </Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

function KnowledgeScreen() {
  return (
    <>
      <StatusBar />
      <ScrollView>
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
            <GoToButton1 screenName="香蕉熟成階段"/>
            <GoToButton2 screenName="香蕉食譜" />
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

function EatScreen({ navigation}:any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>EatScreen</Text>

      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function RecipeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>

      <GoToButton2 screenName="Knowledge" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Knowledge">
        <Stack.Screen name="Knowledge" component={KnowledgeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="香蕉熟成階段" component={EatScreen} options={{ headerShown: false }} />
        <Stack.Screen name="香蕉食譜" component={RecipeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} const styles = StyleSheet.create({
  container: {
    flex: 1, //佔據所有空間
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  first: {
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
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  myButton_1: {
    marginTop: 70,
    height: 180,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  myButton_2: {
    height: 10,
    width: '50%',
    paddingBottom: 150,
    marginTop: 60,
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  banana: {
    borderRadius: 20,
    width: 216,
    height: 202,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 27,
    color: "#fff",
    fontWeight: 'bold',
  },
});