import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Text, View, Image, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function SelectScreen() {
    return (
        <>
            <StatusBar />
            <ScrollView>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.first}>
                            <Text style={styles.title}> 選擇香蕉 </Text>
                            <TouchableOpacity>
                                <Ionicons name="notifications-outline" size={25} style={styles.notification} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.main}>
                        
                    </View>
                </SafeAreaView>
            </ScrollView>
        </>
    );
}


const styles = StyleSheet.create({
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
});

