import React, { Component, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, SafeAreaView, TouchableOpacity, StatusBar, StyleSheet, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import KnowledgeScreen from '../screens/KnowledgeScreen';
import { api } from '../api';

function EatScreen(props: { navigation: { navigate: (arg0: string) => void; }; }) {
    const gotoKnowledgeScreen = () => {
        props.navigation.navigate('Knowledge');
    };

    return (
        <>
            <StatusBar />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={gotoKnowledgeScreen} style={styles.myButton}>
                        <View>
                            <Text style={styles.text_back}> ᐸ  返回 </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.first}>
                        <Text style={styles.title}> 香蕉熟成階段 </Text>
                        <TouchableOpacity>
                            <Ionicons name="notifications-outline" size={25} style={styles.notification} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View>
                        <View style={styles.middle}>
                            <Text style={styles.header_text} />
                            <Text style={styles.header_text}>  墨綠色                   {"\n"}</Text>
                            <Image style={styles.banana} source={require('../assets/images/banana_1.png')} />
                            <Text style={styles.header_text} />
                            <Text style={styles.text}>
                                未熟，不宜食用{"\n"}
                            </Text>

                            <Text style={styles.header_text}>  淡青色至半青半黃{"\n"}</Text>
                            <Image style={styles.banana} source={require('../assets/images/banana_2.png')} />
                            <Text style={styles.header_text} />
                            <Text style={styles.text}>
                                口感苦澀、皮厚肉硬，含有「難消化性麥芽糊精」，不易被小腸吸收，升糖指數較低，可被腸道細菌發酵，具有穩定血糖之作用，有助於改善腸道健康。具有抗性澱粉、提供高飽足感，但不易消化，吃多容易引起腹脹、消化不良等反應。{"\n"}
                            </Text>

                            <Text style={styles.header_text}>  四分之三至全黃香蕉{"\n"}</Text>
                            <Image style={styles.banana} source={require('../assets/images/banana_3.png')} />
                            <Text style={styles.header_text} />
                            <Text style={styles.text}>
                                味道香濃、口感軟滑，含有豐富維他命B2、B6及C，能促進新陳代謝，具養顏美白效果。此階段香蕉中含有豐富的鉀和鎂，能消除疲勞，減少運動時抽筋的機會。助消化、安眠、抗憂鬱。{"\n"}
                            </Text>

                            <Text style={styles.header_text}>  帶有啡點之全熟香蕉{"\n"}</Text>
                            <Image style={styles.banana} source={require('../assets/images/banana_4.png')} />
                            <Text style={styles.header_text} />
                            <Text style={styles.text}>
                                口感軟爛，適合牙口不好者食用，含有大量多酚，能夠延緩衰老，研究顯示啡點越多，免疫活性越高，當中的磷脂質能有助抑制胃潰瘍，幫助消化。{"\n"}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const Stack = createNativeStackNavigator();

export default function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        api.getKnowledge('banana', undefined)
            .then(res => {
                console.log(res);
                setData(res);
            });
    };
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="香蕉熟成階段" component={EatScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Knowledge" component={KnowledgeScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width:420,
        height:27,
    },
    middle:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    banana:{
        flex: 1,
        borderRadius: 50,
        borderWidth:2,
        width: "70%",
        height: 180,
        marginLeft: -17,
    },
    header_text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#4D3604",
        marginLeft: -100,
    },
    text: {
        fontSize: 18,
        color: "#7E6107",
        marginLeft: 50,
        marginRight: 50,
    },
})