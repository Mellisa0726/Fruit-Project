import React, { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { api } from '../api';

<<<<<<< HEAD
export default class EatScreen extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.border} />
                        <Image style={styles.center} source={require('../assets/images/香蕉色卡.jpeg')} />
                        <Text style={styles.border} />
                        <View style={styles.middle}>
                            <Text style={styles.header} />
                            <Text style={styles.header}> • 墨綠色                   {"\n"}</Text>
                            <Image style={styles.banana} source={require('../assets/images/banana_1.png')} />
                            <Text style={styles.header} />
                            <Text style={styles.text}>
                                未熟，不宜食用{"\n"}
                            </Text>

                            <Text style={styles.header}> • 淡青色至半青半黃{"\n"}</Text>
                            <Image style={styles.banana} source={require('../assets/images/banana_2.png')} />
                            <Text style={styles.header} />
                            <Text style={styles.text}>
                                口感苦澀、皮厚肉硬，含有「難消化性麥芽糊精」，不易被小腸吸收，升糖指數較低，可被腸道細菌發酵，具有穩定血糖之作用，有助於改善腸道健康。具有抗性澱粉、提供高飽足感，但不易消化，吃多容易引起腹脹、消化不良等反應。{"\n"}
                            </Text>

                            <Text style={styles.header}> • 四分之三至全黃香蕉{"\n"}</Text>
                            <Image style={styles.banana} source={require('../assets/images/banana_3.png')} />
                            <Text style={styles.header} />
                            <Text style={styles.text}>
                                味道香濃、口感軟滑，含有豐富維他命B2、B6及C，能促進新陳代謝，具養顏美白效果。此階段香蕉中含有豐富的鉀和鎂，能消除疲勞，減少運動時抽筋的機會。助消化、安眠、抗憂鬱。{"\n"}
                            </Text>

                            <Text style={styles.header}> • 帶有啡點之全熟香蕉{"\n"}</Text>
                            <Image style={styles.banana} source={require('../assets/images/banana_4.png')} />
                            <Text style={styles.header} />
                            <Text style={styles.text}>
                                口感軟爛，適合牙口不好者食用，含有大量多酚，能夠延緩衰老，研究顯示啡點越多，免疫活性越高，當中的磷脂質能有助抑制胃潰瘍，幫助消化。{"\n"}
                            </Text>
                        </View>
                        <Text style={styles.border} />
                        <Image style={styles.center} source={require('../assets/images/香蕉色卡.jpeg')} />
                        <Text style={styles.border} />
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
=======
export default function EatScreen() {
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
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.border} />
                    <Image style={styles.center} source={require('../assets/images/香蕉色卡.jpeg')} />
                    <Text style={styles.border} />
                    <View style={styles.middle}>
                        <Text style={styles.header} />
                        <Image style={styles.banana} source={require('../assets/images/banana_1.png')} />
                        <Text style={styles.header} />
                        <Text style={styles.header}> • 墨綠色{"\n"}</Text>
                        <Text style={styles.text}>
                            未熟，不宜食用{"\n"}
                        </Text>

                        <Image style={styles.banana} source={require('../assets/images/banana_2.png')} />
                        <Text style={styles.header} />
                        <Text style={styles.header}> • 淡青色至半青半黃{"\n"}</Text>
                        <Text style={styles.text}>
                            口感苦澀、皮厚肉硬，含有「難消化性麥芽糊精」，不易被小腸吸收，升糖指數較低，可被腸道細菌發酵，具有穩定血糖之作用，有助於改善腸道健康。具有抗性澱粉、提供高飽足感，但不易消化，吃多容易引起腹脹、消化不良等反應。{"\n"}
                        </Text>
                        <Image style={styles.banana} source={require('../assets/images/banana_3.png')} />
                        <Text style={styles.header} />
                        <Text style={styles.header}> • 四分之三至全黃香蕉{"\n"}</Text>
                        <Text style={styles.text}>
                            味道香濃、口感軟滑，含有豐富維他命B2、B6及C，能促進新陳代謝，具養顏美白效果。此階段香蕉中含有豐富的鉀和鎂，能消除疲勞，減少運動時抽筋的機會。助消化、安眠、抗憂鬱。{"\n"}
                        </Text>
                        <Image style={styles.banana} source={require('../assets/images/banana_4.png')} />
                        <Text style={styles.header} />
                        <Text style={styles.header}> • 帶有啡點之全熟香蕉{"\n"}</Text>
                        <Text style={styles.text}>
                            口感軟爛，適合牙口不好者食用，含有大量多酚，能夠延緩衰老，研究顯示啡點越多，免疫活性越高，當中的磷脂質能有助抑制胃潰瘍，幫助消化。{"\n"}
                        </Text>
                    </View>
                    <Text style={styles.border} />
                    <Image style={styles.center} source={require('../assets/images/香蕉色卡.jpeg')} />
                    <Text style={styles.border} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
>>>>>>> 24e30893f7c2790f93e2213b846a9a3887121e2e
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FAE5A4',
        alignItems: 'center',
    },
    border: {
        flex: 1,
        fontSize: 5,
        backgroundColor: '#000',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width:420,
        height:27,
    },
    middle:{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
    },
    banana:{
        flex: 1,
        borderRadius: 50,
        borderColor:'#272727',
        borderWidth:2,
        width: "70%",
        height: 180,
        marginLeft: -17,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#4D3604",
        marginLeft: -100,
    },
    text: {
        fontSize: 18,
        color: "#7E6107",
        marginLeft: 30,
        marginRight: 50,
    },
})