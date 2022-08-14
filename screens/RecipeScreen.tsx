import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    Animated,
    Dimensions,
    SafeAreaView
} from 'react-native';

import RNAnimatedScrollIndicators from '../node_modules/react-native-animated-scroll-indicators';

const { width } = Dimensions.get('window');

class Example2 extends React.Component {
    scrollX = new Animated.Value(0);

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Animated.ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
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
                            numberOfCards={7}
                            scrollWidth={width}
                            activeColor={'#FF8000'}
                            inActiveColor={'#BEBEBE'}
                            scrollAnimatedValue={this.scrollX}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default Example2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        width,
    },
    pic1: {
        flex: 1,
        resizeMode: 'contain',
        width: "80%",
        marginTop: -10,
    },
    pic2: {
        flex: 1,
        resizeMode: 'contain',
        width: "80%",
        marginTop: -12,
    },
    pic3: {
        flex: 1,
        resizeMode: 'contain',
        width: "80%",
        marginTop: -26,
    },
    pic4: {
        flex: 1,
        resizeMode: 'contain',
        width: "80%",
        marginTop: -8,
    },
    pic5: {
        flex: 1,
        resizeMode: 'contain',
        width: "80%",
        marginTop: -22,
    },
});