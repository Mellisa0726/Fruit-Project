import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Image,
} from 'react-native';

export default function AccountScreen() {
    return (
        <>

        </>
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
        paddingLeft: 200,
    },
    main: {
        flex: 4,
        backgroundColor: 'white',
        alignItems: 'center',
        zIndex: -1,
    },
    myButton: {
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
    text: {
        fontSize: 20,
        color: "#7E6107",
        fontWeight: 'bold',
    },
});
