import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../screens/AccountScreen';
import LogInScreen from '../screens/LogInScreen';
import * as SecureStore from 'expo-secure-store';

function SettingScreen(props: { navigation: { navigate: (arg0: string) => void; }; }) {
    const gotoAccountScreen = () => {
        props.navigation.navigate('變更帳戶資料');
    };
    
    function SignOut() {
        SecureStore.deleteItemAsync('JWT');
        // window.localStorage.clear();
        //props.navigation.navigate('LogIn');
    };
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
                    <TouchableOpacity onPress={gotoAccountScreen} style={styles.myButton}>
                        <View>
                            <Text style={styles.text}> 變更帳戶資料 </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => SignOut()} style={styles.myButton} >
                        <View>
                            <Text style={styles.text}> 登出 </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
}

const Stack = createNativeStackNavigator();

export default function App(props: { navigation: { navigate: (arg0: string) => void; }; }) {

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="變更帳戶資料" component={AccountScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
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

