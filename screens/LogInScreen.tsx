import { StyleSheet, TouchableOpacity, View, Alert, Image, TextInput, ScrollView} from 'react-native';
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

const Logo = require('../assets/images/logo.jpg');

function LogIn({ email, password }: any) {
  const navigation = useNavigation();

  function logIn() {
  api.logIn(email, password)
    .then(() => navigation.navigate('Root'))
    .catch(err => {
      // console.log(err);
      Alert.alert('登入失敗\n請確認電子郵件及密碼');
    });
  }
  
  return (
    <TouchableOpacity onPress={logIn} style={styles.link}>
       <Text style={styles.text}>登入</Text>
    </TouchableOpacity> 
  );
};

function GoToSignUp() {
  const navigation = useNavigation();
  const screenName: any = 'SignUp';
  return (
    <TouchableOpacity onPress={() => navigation.navigate(screenName)}>
      <Text style={styles.underlineButton}>註冊</Text>
    </TouchableOpacity>
  );
};

function LogInScreen() {
  const [data, setData] = useState({
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

  return (
    <ScrollView 
      contentContainerStyle={{ flex: 1 }}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="never"
      scrollEnabled={false}
    >
      <View style={styles.container}>
        <View style={styles.first}>
          <Image source={Logo} style={styles.logo} />
          <StatusBar />

          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              placeholder="電子郵件"
              placeholderTextColor="#9B9B9B"
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
          </View>
          
          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              placeholder="密碼"
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
          </View>
          <LogIn email={data.email} password={data.password} />
          <GoToSignUp />
        </View>
      </View>
    </ScrollView>
  );
}


function SignUp({data}: any) {
    const navigation = useNavigation();
    
    function signUp() {
      api.signUp(data.email, data.password)
        .then(() => navigation.navigate('LogIn'))
        .catch(err => {
            // console.log(err);
        window.alert(err);
        });
    }

    return (
      <TouchableOpacity onPress={signUp} style={styles.link}>
        <Text style={styles.text}>送出</Text>
      </TouchableOpacity>
    )
}

function SignUpScreen({ navigation }: any) {
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

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

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const updateSecureTextEntry_repeat = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
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
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.slogan}>
            為你的香蕉註冊帳號吧 ！
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              placeholder="電子郵件"
              placeholderTextColor="#9B9B9B"
              onChangeText={(val) => textInputChange(val)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              placeholder="密碼"
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
          </View>
          <SignUp data={data}/>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.underlineButton}>返回登入</Text>
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
        unmountOnBlur: true
      }}>
      <BottomTab.Screen //按鈕1
        name="Knowledge"
        component={KnowledgeScreen}
        options={{
          title: '水果小知識',
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
    height: '75%',
    width: '100%',
    backgroundColor: '#FAE5A4',
    borderBottomLeftRadius: 130,
    borderBottomRightRadius: 130,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    marginTop: 5,
    height: 35,
    width: 180,
    borderRadius: 10,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#E7B008",
  },
  text: {
    fontSize: 15,
    color: "#000",
    fontWeight: 'bold',
  },
  logo: {
    height: 170,
    width: 170,
    borderRadius: 100,
    backgroundColor: '#fff',
    marginBottom: 90,
  },
  inputView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "60%",
    height: 40,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  textInput: {
    flex: 1,
  },
  underlineButton:{
    fontSize: 13,
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

  //SignUpScreen
  slogan: {
    fontSize: 20,
    color: "#000",
    fontWeight: 'bold',
    paddingBottom: 15,
    paddingLeft: 20,
    marginTop: -45,
  },
});
