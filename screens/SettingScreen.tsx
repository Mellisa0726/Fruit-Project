import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text,  View } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import LogInScreen from '../screens/LogInScreen';
import AccountScreen from '../screens/AccountScreen';
import React, { useState } from 'react';


function SettingScreen(props: { navigation: { navigate: (arg0: string) => void; }; }) {
    const gotoAccountScreen = () => {
        props.navigation.navigate('Account');
    };

    return (
        <>
            <StatusBar />
            <SafeAreaView style={styles.container}>
                <View style={styles.header_S}>
                    <View style={styles.first_S}>
                        <Text style={styles.title_S}> 設定 </Text>
                        <TouchableOpacity>
                            <Ionicons name="notifications-outline" size={25} style={styles.notification_S} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.main_S}>
                    <TouchableOpacity onPress={ gotoAccountScreen } style={styles.myButton_S}>
                        <View>
                            <Text style={styles.text}> 變更帳戶資料 </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity  style={styles.myButton_S} >
                        <View>
                            <Text style={styles.text_S}> 登出 </Text>
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
                <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
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
        marginLeft: -25,
    },
    text_back: {
        fontSize: 18,
        color: "#7E6107",
        marginLeft: 70,
        marginTop: 30,
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
