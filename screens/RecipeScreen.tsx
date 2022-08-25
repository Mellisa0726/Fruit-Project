import React , { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    Animated,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    Text,
} from 'react-native';
import { api } from '../api';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import KnowledgeScreen from '../screens/KnowledgeScreen';
import RNAnimatedScrollIndicators from '../node_modules/react-native-animated-scroll-indicators';

const { width } = Dimensions.get('window');

function RecipeScreen(props: { navigation: { navigate: (arg0: string) => void; }; }) {
    const gotoKnowledgeScreen = () => {
        props.navigation.navigate('Knowledge');
    };
    const scrollX = new Animated.Value(0);

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
                        <Text style={styles.title}> 香蕉食譜 </Text>
                        <TouchableOpacity>
                            <Ionicons name="notifications-outline" size={25} style={styles.notification} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.main}>
                    <Animated.ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true })}
                    >
                        <ScrollView>
                            <View style={styles.container}>
                                <Image style={styles.pic1} source={require('../assets/images/烤香蕉片.png')} />
                            </View>
                        </ScrollView>
                        <ScrollView>
                            <View style={styles.container}>
                                <Image style={styles.pic2} source={require('../assets/images/香蕉鬆餅.png')} />
                            </View>
                        </ScrollView>
                        <ScrollView>
                            <View style={styles.container}>
                                <Image style={styles.pic3} source={require('../assets/images/香蕉蛋糕.png')} />
                            </View>
                        </ScrollView>
                        <ScrollView>
                            <View style={styles.container}>
                                <Image style={styles.pic4} source={require('../assets/images/香蕉奶昔.png')} />
                            </View>
                        </ScrollView>
                        <ScrollView>
                            <View style={styles.container}>
                                <Image style={styles.pic5} source={require('../assets/images/香蕉餅乾.png')} />
                            </View>
                        </ScrollView>
                    </Animated.ScrollView>
                    <View style={{
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 100,
                        marginBottom: 20,
                        position: 'absolute'
                    }}>
                        <RNAnimatedScrollIndicators
                            numberOfCards={5}
                            scrollWidth={width}
                            activeColor={'#FF8000'}
                            inActiveColor={'#BEBEBE'}
                            scrollAnimatedValue={scrollX}
                        />
                    </View>
                </View>
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
        api.getRecipe('banana')
        .then(res => {
            console.log(res);
            setData(res);
        });
    };

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="香蕉食譜" component={RecipeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Knowledge" component={KnowledgeScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        width,
    },
    header: {
        height: 210,
        width: 420,
        backgroundColor: '#FAE5A4',
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
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
    myButton: {
        height: 50,
        width: 200,
        marginTop: 30,
        justifyContent: 'center',
        marginLeft: -25,
    },
    notification: {
        color: "#7E6107",
        fontWeight: 'bold',
        paddingTop: 3,
        paddingLeft: 148,
    },
    main: {
        flex:2.275,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    pic1: {
        flex: 1,
        resizeMode: 'contain',
        width: "80%",
    },
    pic2: {
        flex: 1,
        resizeMode: 'contain',
        width: "80%",
        marginTop: -2,
    },
    pic3: {
        flex: 1,
        resizeMode: 'contain',
        width: "80%",
        marginTop: -12,
    },
    pic4: {
        flex: 1,
        resizeMode: 'contain',
        width: "80%",
    },
    pic5: {
        flex: 1,
        resizeMode: 'contain',
        width: "80%",
        marginTop: -6,
    },
});