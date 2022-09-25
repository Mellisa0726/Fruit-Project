import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Text, TextInput, View } from 'react-native';
import { useNavigation, NavigationContainer, CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import LogInScreen from '../screens/LogInScreen'
import React, { useState, useContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Notification from './Notification';
import { api } from '../api';
import { Context } from '../contexts/Context';

function GoToAccount({ screenName, isModalVisible, changeModalState }: any) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate(screenName, {isModalVisible: isModalVisible, changeModalState: changeModalState})} style={styles.myButton_S}>
            <View>
                <Text style={styles.text}> 變更帳戶資料 </Text>
            </View>
        </TouchableOpacity>
    );
}

function SettingScreen() {
    const navigation = useNavigation();
    const { isModalVisible, changeModalState } = useContext(Context);

    const openNotification = () => {
        changeModalState(true);
    };
    
    function SignOut() {
        SecureStore.deleteItemAsync('JWT');
        // window.localStorage.clear();
        // navigation.pop();
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {name: 'LogIn'}
                ]
            })
        )
    };

//   const insets = useSafeAreaInsets();

    return (
        <>
            <StatusBar />
            {/* <SafeAreaView style={styles.container}> */}
            {/* <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}> */}
            <View style={styles.container}>
                <View style={styles.header_S}>
                    <Notification isModalVisible={isModalVisible} changeModalState={changeModalState}/>
                    <View style={styles.first_S}>
                        <Text style={styles.title_S}> 設定 </Text>
                        <TouchableOpacity>
                            <Ionicons name="notifications-outline" size={25} style={styles.notification_S} onPress={openNotification}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.main_S}>
                    <GoToAccount screenName="Account" isModalVisible={isModalVisible} changeModalState={changeModalState}/>
                    <TouchableOpacity onPress={ SignOut }  style={styles.myButton_S} >
                        <View>
                            <Text style={styles.text_S}> 登出 </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {/* </SafeAreaView> */}
        </>
    );
}

function GoToChange({ data }: any) {
    
    function change(){
    //const navigation = useNavigation();
    api.change(data.old_password, data.new_password)
      .then(() => window.alert('修改成功'))
      .catch(err => {
        window.alert(err.response)
      });
    }
    return (
        <TouchableOpacity onPress={change} style={styles.link}>
            <Text style={styles.link_text}> 送出 </Text>
        </TouchableOpacity>
        //<Notification isModalVisible={isModalVisible} setModalVisible={setModalVisible}/>
    );  
};

function AccountScreen({ navigation, route }: any) {
    // const insets = useSafeAreaInsets();
    const { isModalVisible, changeModalState } = route.params
    const openNotification = () => {
        changeModalState(!isModalVisible);
    };

    const [data, setData] = React.useState({
        old_password: '',
        new_password: '',
        isValidPassword: false
    });

    const handlePasswordChange = (val:any) => {
        if (val.trim().length >= 4) {
          setData({
            ...data,
            old_password: val,
            isValidPassword: true
          });
        } else {
          setData({
            ...data,
            old_password: val,
            isValidPassword: false,
          });
        }
      }

      const handleNewPasswordChange = (val:any) => {
        if (val.trim().length >= 4) {
          setData({
            ...data,
            new_password: val,
            isValidPassword: true
          });
        } else {
          setData({
            ...data,
            new_password: val,
            isValidPassword: false,
          });
        }
      }

    return (
        <>
            <ScrollView
                contentContainerStyle={{ flex: 1 }}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="never"
                scrollEnabled={false}
            >
                <StatusBar />
                {/* <SafeAreaView style={styles.container}> */}
                {/* <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}> */}
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.myButton}>
                            <View>
                                <Text style={styles.text_back}> ᐸ  返回 </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.first}>
                            <Text style={styles.title}> 變更帳戶資料 </Text>
                            <TouchableOpacity>
                                <Ionicons name="notifications-outline" size={25} style={styles.notification} onPress={openNotification}/>
                            </TouchableOpacity>
                            <Notification isModalVisible={isModalVisible} changeModalState={changeModalState}/>
                        </View>
                    </View>
                    <View style={styles.main}>
                        <Text style={styles.main_text}>變更密碼</Text>
                        <View>
                            <Text style={styles.main_text_pass}>原始密碼</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="old_password"
                                    placeholderTextColor="#BBBBBB"
                                    onChangeText={(val) => handlePasswordChange(val)}
                                />
                            </View>
                            <Text style={styles.main_text_pass}>新密碼</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="new_password"
                                    placeholderTextColor="#BBBBBB"
                                    onChangeText={(val) => handleNewPasswordChange(val)}
                                />
                            </View>
                        </View>
                        <GoToChange screenName="change" data={data}/>
                    </View>
                </View>
                {/* </SafeAreaView> */}
            </ScrollView>
        </>
    );
}

const Stack = createNativeStackNavigator();
export default function App() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="SettingMain" component={SettingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1, //佔據所有空間
        backgroundColor: '#fff',
    }, 
    header_S: {
        flex: 2,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    first_S: {
        height: 210,
        width: 420,
        backgroundColor: '#FAE5A4',
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        paddingTop: 160,
        flexDirection: 'row',
    },
    title_S: {
        fontSize: 25,
        color: "#7E6107",
        fontWeight: 'bold',
        paddingLeft: 60,
    },
    notification_S: {
        color: "#7E6107",
        fontWeight: 'bold',
        paddingTop: 3,
        paddingLeft: 200,
    },
    main_S: {
        flex: 4,
        backgroundColor: 'white',
        alignItems: 'center',
        zIndex: -1,
    },
    myButton_S: {
        marginTop: 30,
        height: 60,
        width: 250,
        borderRadius: 20,
        backgroundColor: 'transparent',
        borderColor: '#FAE5A4',
        borderWidth: 4,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    text_S: {
        fontSize: 20,
        color: "#7E6107",
        fontWeight: 'bold',
    },
    // AccountScreen
    header: {
        height: 210,
        width: 420,
        backgroundColor: '#FAE5A4',
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        marginLeft: -13,
    },
    myButton: {
        height: 50,
        width: 200,
        marginTop: 30,
        justifyContent: 'center',
        marginLeft: -30,
    },
    text_back: {
        fontSize: 18,
        color: "#7E6107",
        marginLeft: 70,
        marginTop: 25,
    },
    first: {
        flexDirection: 'row',
        paddingTop: 80,
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
        paddingLeft: 99.5,
    },
    text: {
        fontSize: 20,
        color: "#7E6107",
        fontWeight: 'bold',
    },
    main: {
        flex: 1,
        marginTop: 50,
        marginLeft: 60,
    },
    inputView: {
        borderRadius: 10,
        width: "80%",
        height: 40,
        marginBottom: 5,
    },
    TextInput: {
        flex: 1,
        fontSize: 15,
        paddingLeft: 5,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
    },
    main_text: {
        fontSize: 18,
        marginLeft: 5,
        fontWeight: 'bold',
    },
    main_text_pass: {
        fontSize: 14,
        marginTop: 10,
        marginLeft: 5,
    },
    link: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        width: '30%',
        borderRadius: 12,
        backgroundColor: "#00A600",
        marginLeft: 88,
    },
    link_text: {
        fontSize: 15,
        color: "#fff",
    },
});