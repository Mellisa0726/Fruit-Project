import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Text,
    View,
    ScrollView,
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
            <ScrollView
                contentContainerStyle={{ flex: 1 }}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="never"
                scrollEnabled={false}
            >
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
                    <View style={styles.main}>
                        <Text style={styles.main_text}>變更信箱</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="example@gmail.com"
                                placeholderTextColor="#BBBBBB"
                                underlineColorAndroid={'#E0E0E0'}
                            />
                        </View>
                        <Text> </Text>
                        <Text style={styles.main_text}>變更密碼</Text>
                        <View>
                            <Text style={styles.main_text_pass}>原始密碼</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="password"
                                    placeholderTextColor="#BBBBBB"
                                    underlineColorAndroid={'#E0E0E0'}
                                />
                            </View>
                            <Text style={styles.main_text_pass}>新密碼</Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="password"
                                    placeholderTextColor="#BBBBBB"
                                    underlineColorAndroid={'#E0E0E0'}
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.link}>
                            <Text style={styles.link_text}> 送出 </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ScrollView>
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
        paddingLeft: 97.5,
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