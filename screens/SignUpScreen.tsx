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
import LogInScreen from '../screens/LogInScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function SignUpScreen(props: { navigation: { navigate: (arg0: string) => void; }; }) {
    const gotoLogInScreen = () => {
        props.navigation.navigate('LogIn');
    };
    return (
        <ScrollView
            contentContainerStyle={{ flex: 1 }}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="never"
            scrollEnabled={false}
        >
            <View style={styles.container}>
                <TouchableOpacity onPress={gotoLogInScreen} style={styles.myButton}>
                    <View>
                        <Text style={styles.text_back}> ᐸ  返回 </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.first}>
                    <StatusBar />
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Username"
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
                    <TouchableOpacity style={styles.link}>
                        <Text style={styles.text}> 登入 </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    );
}
const Stack = createNativeStackNavigator();

export default function App(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
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
        paddingLeft: 15,
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
    myButton: {
        height: 50,
        width: 200,
        marginTop: 30,
        justifyContent: 'center',
        marginLeft: -25,
    },
});