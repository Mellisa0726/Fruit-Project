import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect, useRef } from 'react'
import { ScrollView, SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function ResultScreen({ navigation, route }: any) {
    return (
        <>
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
                        <Text style={styles.title}> 確認結果 </Text>
                        <TouchableOpacity>
                            <Ionicons name="notifications-outline" size={25} style={styles.notification} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.main_b}>
                </View>
            </View>
            {/* </SafeAreaView> */}
        </>
    );
}

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="ResultScreen">
                <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 210,
        width: 420,
        backgroundColor: '#FAE5A4',
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        marginLeft: -4,
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
        paddingLeft: 147.5,
    },
    main_b: {
        flex: 1,
        width: 420,
        height: 538,
        backgroundColor: '#fff',
    },
    main: {
        flex: 1,
        width: 420,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 50,
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    Button_E: {
        marginTop: 60,
        height: 170,
        width: '55%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    banana_K: {
        width: 230,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
});
