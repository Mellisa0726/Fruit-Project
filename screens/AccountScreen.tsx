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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from '../screens/SettingScreen';

function AccountScreen(props: { navigation: { navigate: (arg0: string) => void; }; }) {
    const gotoSettingScreen = () => {
        props.navigation.navigate('Setting');
    };

    return (
        <>
        <StatusBar />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={gotoSettingScreen} style={styles.myButton}>
                        <View>
                            <Text style={styles.text_back}> ᐸ  返回 </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.first}>
                        <Text style={styles.title}> 變更帳戶資料 </Text>
                        <TouchableOpacity>
                            <Ionicons name="notifications-outline" size={25} style={styles.notification} />
                        </TouchableOpacity>
                    </View>
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
                <Stack.Screen name="變更帳戶資料" component={AccountScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />
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
    main: {
        flex: 4,
        backgroundColor: 'white',
        alignItems: 'center',
        zIndex: -1,
    },
    text: {
        fontSize: 20,
        color: "#7E6107",
        fontWeight: 'bold',
    },
});
