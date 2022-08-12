import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';

export default class EatScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.border}/>
                    <Image style={styles.center} source={require('../assets/images/香蕉色卡.jpeg')} />
                    <Text style={styles.border}/>
                    <Image style={styles.banana} source={require('../assets/images/banana_1.png')} />
                    <Text style={styles.header}/>
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
                    <Text style={styles.border} />
                    <Image style={styles.center} source={require('../assets/images/香蕉色卡.jpeg')} />
                    <Text style={styles.border} />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    border: {
        flex: 1,
        fontSize: 5,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width:420,
        height:27
    },
    banana:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 300,
        height: 200,
        //marginVertical:'center',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#4D3604",
    },
    text: {
        fontSize: 18,
        color: "#7E6107",
    },
})