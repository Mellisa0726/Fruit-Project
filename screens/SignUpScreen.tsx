import {
    StyleSheet,
    TouchableOpacity,
    View,
    TextInput,
    ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text } from '../components/Themed';
import { api } from '../api';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from '../screens/LogInScreen';

export default function SignUpScreen(props: { navigation: { navigate: (arg0: string) => void; }; }) {
    
    function SignUp() {
        props.navigation.navigate('Root')
    }
    return (
        <ScrollView
            contentContainerStyle={{ flex: 1 }}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="never"
            scrollEnabled={false}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.myButton}>
                        <View>
                            <Text style={styles.text_back}> ᐸ  返回登入 </Text>
                        </View>
                    </TouchableOpacity>
                    <StatusBar />
                    <View style={styles.first}>
                        <Text style={styles.slogan}>
                            為你的香蕉註冊帳號吧 ！
                        </Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Email"
                                placeholderTextColor="#9B9B9B"
                            />
                        </View>

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Password"
                                placeholderTextColor="#9B9B9B"
                            />
                        </View>

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Repeat password"
                                placeholderTextColor="#9B9B9B"
                            />
                        </View>
                        <TouchableOpacity onPress={() => SignUp()} style={styles.link}>
                            <Text style={styles.text}> 送出 </Text>
                        </TouchableOpacity>
                    </View>
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
    header: {
        height: 600,
        width: 420,
        backgroundColor: '#FAE5A4',
        borderBottomLeftRadius: 130,
        borderBottomRightRadius: 130,
        paddingTop: 50,
    },
    slogan: {
        fontSize: 30,
        color: "#000",
        fontWeight: 'bold',
        paddingBottom: 30,
        paddingLeft: 20,
    },
    myButton: {
        height: 50,
        width: 200,
        marginTop: 10,
        marginLeft: -25,
    },
    first: {
        flexDirection: "column",
        paddingTop: 110,
        alignItems: "center",
    },
    link: {
        marginTop: 15,
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
    inputView: {
        backgroundColor: "#fff",
        borderRadius: 10,
        width: "60%",
        height: 40,
        marginBottom: 10,
        flexDirection: 'row',
        paddingLeft: 15,
        marginTop: 10,
    },
    TextInput: {
        flex: 1,
    },
    forgot_button: {
        fontSize: 11,
        height: 30,
        textDecorationLine: 'underline',
    },
    signup_button: {
        fontSize: 11,
        height: 30,
        paddingTop: 8,
        textDecorationLine: 'underline',
    },
    text_back: {
        fontSize: 18,
        color: "#7E6107",
        marginLeft: 70,
        marginTop: 30,
    },
});