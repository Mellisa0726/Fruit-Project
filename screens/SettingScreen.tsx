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
import { Link } from '@react-navigation/native';

export default function App() {

    return (
        <>
            <StatusBar />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.first}>
                        <Text style={styles.title}> 設定 </Text>
                        <TouchableOpacity>
                            <Ionicons name="notifications-outline" size={25} style={styles.notification} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.main}>
                    <TouchableOpacity style={styles.myButton}>
                        <View>
                            <Text style={styles.text}> 個人帳號 </Text>
                        </View>
                    </TouchableOpacity>
                    <Link to='/'>
                        <TouchableOpacity style={styles.myButton}>
                            <View>
                                <Text style={styles.text}> 登出 </Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                </View>
            </SafeAreaView>
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
        marginBottom: 30,
    },
    text: {
        fontSize: 20,
        color: "#7E6107",
        fontWeight: 'bold',
    },
});

