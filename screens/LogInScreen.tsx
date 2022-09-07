import { StyleSheet, TouchableOpacity, View, Image, TextInput, ScrollView} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text } from '../components/Themed';
import { api } from '../api';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import CameraScreen from '../screens/CameraScreen';
import SettingScreen from '../screens/SettingScreen';
import { RootTabParamList } from '../types';
import KnowledgeScreen from '../screens/KnowledgeScreen';
import AgendaScreen from '../screens/AgendaScreen';

function GoToLogIn({ screenName }: any) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Root')} style={styles.link}>
       <Text style={styles.text}> 登入 </Text>
    </TouchableOpacity>
    
  );
};
function GoToSignUp({ screenName }: any) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(screenName)}>
      <Text style={styles.signup_button}>註冊</Text>
    </TouchableOpacity>
  );
};

function LogInScreen() {
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
  // console.log(data);
  api.logIn(data.email, data.password)
    .then()
    .catch(err => {
      // console.log(err);
      window.alert('Log in failed');
    });

  return (
    <ScrollView 
      contentContainerStyle={{ flex: 1 }}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="never"
      scrollEnabled={false}
      >
      <View style={styles.container}>
        <View style={styles.first}>
          <Image source={require('../assets/images/logo.jpg')} style={styles.logo} />
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
          <GoToLogIn screenName="LogIn" />
          <GoToSignUp screenName="SignUp" />
        </View>
      </View>
    </ScrollView>
  );
}
function SignUpScreen({ navigation }: any) {

  return (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.myButton}>
        <View>
          <Text style={styles.text_back}> ᐸ  返回 </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Knowledge"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
      }}>
      <BottomTab.Screen //按鈕1
        name="Knowledge"
        component={KnowledgeScreen}
        options={{
          title: '關於香蕉',
          tabBarIcon: ({ color }) => <TabBarIcon name="bulb-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          title: '相機',
          tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={AgendaScreen}
        options={{
          title: '日曆',
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
          unmountOnBlur: true,
        }}
      />
      <BottomTab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title: '設定',
          tabBarIcon: ({ color }) => <TabBarIcon name="settings-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={26} style={{ marginBottom: -2 }} {...props} />;
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
    height: 170,
    width: 170,
    borderRadius: 60,
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
  myButton: {
    height: 50,
    width: 200,
    marginTop: 30,
    justifyContent: 'center',
    marginLeft: -25,
  },
  text_back: {
    fontSize: 18,
    color: "#7E6107",
    marginLeft: 70,
    marginTop: 30,
  },
});