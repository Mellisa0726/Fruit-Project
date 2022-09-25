import React, { useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, SafeAreaView, StyleSheet, Dimensions, Animated, TouchableOpacity, Button, Text, View, Image, ImageBackground } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RNAnimatedScrollIndicators from '../node_modules/react-native-animated-scroll-indicators';
import { api } from '../api';
import Notification from './Notification';
import { Context } from '../contexts/Context';

// interface Props {
//   isModalVisible: boolean;
//   setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
// }

const { width } = Dimensions.get('window');
function GoToEat({ screenName, isModalVisible, changeModalState }: any) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(screenName, {isModalVisible: isModalVisible, changeModalState: changeModalState})} style={styles.Button_E}>
      <View>
        <ImageBackground style={styles.banana_K} source={require('../assets/images/香蕉熟成階段.png')}>
          <Text style={styles.text_K}> 香蕉熟成階段 </Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
} 
function GoToRecipe({ screenName, isModalVisible, changeModalState }: any) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(screenName, {isModalVisible: isModalVisible, changeModalState: changeModalState})} style={styles.Button_R}>
      <View>
        <ImageBackground style={styles.banana_K} source={require('../assets/images/廚房用具.png')}>
          <Text style={styles.text_K}> 香蕉食譜 </Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

function KnowledgeScreen() {
  // const insets = useSafeAreaInsets();
  const { isModalVisible, changeModalState } = useContext(Context);
  // const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
  const openNotification = () => {
    changeModalState(true);
  };

  return (
    <>
      <StatusBar />
        {/* <SafeAreaView style={styles.container_K}> */}
        {/* <View style={[styles.container_K, { paddingTop: Math.max(insets.top, 16) }]}> */}
        <View style={styles.container_K}>
          <View style={styles.header_K}>
            <View style={styles.first_K}>
              <Text style={styles.title_K}> 關於香蕉 </Text>
              <TouchableOpacity>
                <Ionicons name="notifications-outline" size={25} style={styles.notification_K} onPress={openNotification}/>
              </TouchableOpacity>
              <Notification isModalVisible={isModalVisible} changeModalState={changeModalState}/>
            </View>
          </View>
          <View style={styles.main_K}>
            <GoToEat screenName="香蕉熟成階段" isModalVisible={isModalVisible} changeModalState={changeModalState} />
            <GoToRecipe screenName="香蕉食譜" isModalVisible={isModalVisible} changeModalState={changeModalState} />
          </View>
        </View>
        {/* </SafeAreaView> */}
    </>
  );
}

function EatScreen({navigation, route}: any) {
  // const insets = useSafeAreaInsets();
  //const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
  const { isModalVisible, changeModalState } = route.params
  const openNotification = () => {
    changeModalState(!isModalVisible);
  };

  return (
    <>
      <StatusBar />
        {/* <SafeAreaView style={styles.container}> */}
        {/* <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}> */}
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button_back}>
              <View>
                <Text style={styles.text_back}> ᐸ  返回 </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.first}>
              <Text style={styles.title}> 香蕉熟成階段 </Text>
                <TouchableOpacity>
                  <Ionicons name="notifications-outline" size={25} style={styles.notification} onPress={openNotification}/>
                </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <View>
              <View style={styles.middle}>
                <Text style={styles.header_text} />
                <Text style={styles.header_text}>  第一階段   墨綠色{"\n"}</Text>
                <Image style={styles.banana} source={require('../assets/images/banana_1.png')} />
                <Text style={styles.header_text} />
                <Text style={styles.text}>
                  未熟，不宜食用{"\n"}
                </Text>

                <Text style={styles.header_text}>  第二階段   淡青色至半青半黃{"\n"}</Text>
                <Image style={styles.banana} source={require('../assets/images/banana_2.png')} />
                <Text style={styles.header_text} />
                <Text style={styles.text}>
                  口感苦澀、皮厚肉硬，含有「難消化性麥芽糊精」，不易被小腸吸收，升糖指數較低，可被腸道細菌發酵，具有穩定血糖之作用，有助於改善腸道健康。具有抗性澱粉、提供高飽足感，但不易消化，吃多容易引起腹脹、消化不良等反應。{"\n"}
                </Text>

                <Text style={styles.header_text}>  第三階段   四分之三至全黃香蕉{"\n"}</Text>
                <Image style={styles.banana} source={require('../assets/images/banana_3.png')} />
                <Text style={styles.header_text} />
                <Text style={styles.text}>
                  味道香濃、口感軟滑，含有豐富維他命B2、B6及C，能促進新陳代謝，具養顏美白效果。此階段香蕉中含有豐富的鉀和鎂，能消除疲勞，減少運動時抽筋的機會。助消化、安眠、抗憂鬱。{"\n"}
                </Text>

                <Text style={styles.header_text}>  第四階段   帶有啡點之全熟香蕉{"\n"}</Text>
                <Image style={styles.banana} source={require('../assets/images/banana_4.png')} />
                <Text style={styles.header_text} />
                <Text style={styles.text}>
                  口感軟爛，適合牙口不好者食用，含有大量多酚，能夠延緩衰老，研究顯示啡點越多，免疫活性越高，當中的磷脂質能有助抑制胃潰瘍，幫助消化。{"\n"}
                </Text>
              </View>
            </View>
          </ScrollView>
          <Notification isModalVisible={isModalVisible} changeModalState={changeModalState}/>
        </View>
        {/* </SafeAreaView> */}
    </>
  );
}

function RecipeScreen({navigation, route}: any) {
  const scrollX = new Animated.Value(0);
  const [data, setData] = useState([]);
  const { isModalVisible, changeModalState } = route.params
  const openNotification = () => {
    changeModalState(!isModalVisible);
  };

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    api.getRecipe('banana')
      .then(res => {
        // console.log(res);
        setData(res);
      });
  };

  // const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar />
      {/* <SafeAreaView style={styles.container_R}> */}
      {/* <View style={[styles.container_R, { paddingTop: Math.max(insets.top, 16) }]}> */}
      <View style={styles.container_R}>
        <View style={styles.header_R}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.myButton_R}>
            <View>
              <Text style={styles.text_back_R}> ᐸ  返回 </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.first}>
            <Text style={styles.title}> 香蕉食譜 </Text>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={25} style={styles.notification_R} onPress={openNotification}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.main_R}>
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
              <View style={styles.container_R}>
                <Image style={styles.pic1} source={require('../assets/images/烤香蕉片.png')} />
              </View>
            </ScrollView>
            <ScrollView>
              <View style={styles.container_R}>
                <Image style={styles.pic2} source={require('../assets/images/香蕉鬆餅.png')} />
              </View>
            </ScrollView>
            <ScrollView>
              <View style={styles.container_R}>
                <Image style={styles.pic3} source={require('../assets/images/香蕉蛋糕.png')} />
              </View>
            </ScrollView>
            <ScrollView>
              <View style={styles.container_R}>
                <Image style={styles.pic4} source={require('../assets/images/香蕉奶昔.png')} />
              </View>
            </ScrollView>
            <ScrollView>
              <View style={styles.container_R}>
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
        <Notification isModalVisible={isModalVisible} changeModalState={changeModalState}/>
      </View>
      {/* </SafeAreaView> */}
    </>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Knowledge">
        <Stack.Screen name="Knowledge" component={KnowledgeScreen}options={{ headerShown: false }} />
        <Stack.Screen name="香蕉熟成階段" component={EatScreen} options={{  headerShown: false }} />
        <Stack.Screen name="香蕉食譜" component={RecipeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 

const styles = StyleSheet.create({
  container_K: {
    flex: 1, //佔據所有空間
    backgroundColor: '#fff',
  },
  header_K: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  first_K: {
    height: 210,
    width: 420,
    backgroundColor: '#FAE5A4',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    paddingTop: 160,
    flexDirection: 'row',
  },
  title_K: {
    fontSize: 25,
    color: "#7E6107",
    fontWeight: 'bold',
    paddingLeft: 60,
  },
  notification_K: {
    color: "#7E6107",
    fontWeight: 'bold',
    paddingTop: 3,
    paddingLeft: 147.5,
  },
  main_K: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  }, 
  Button_E: {
    marginTop: 70,
    height: 180,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  Button_R: {
    height: 10,
    width: '50%',
    paddingBottom: 150,
    marginTop: 60,
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  banana_K: {
    borderRadius: 20,
    width: 216,
    height: 202,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text_K: {
    fontSize: 27,
    color: "#fff",
    fontWeight: 'bold',
  },

  // EatScreen
  container: {
    flex: 1, //佔據所有空間
    backgroundColor: '#fff',
  },
  header: {
    height: 210,
    width: 420,
    backgroundColor: '#FAE5A4',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    marginLeft: -4,
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
    paddingLeft: 94.5,
  },
  button_back: {
    height: 50,
    width: 200,
    marginTop: 30,
    justifyContent: 'center',
    marginLeft: -30,
  },
  text_back: {
    fontSize: 18,
    color: "#7E6107",
    marginLeft: 70,
    marginTop: 25,
  },
  middle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#4D3604",
    marginLeft: -120,
  },
  text: {
    fontSize: 18,
    color: "#7E6107",
    marginLeft: 50,
    marginRight: 50,
  },
  banana: {
    flex: 1,
    borderRadius: 20,
    width: "75%",
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // RecipeScreen
  container_R: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    width,
  },
  header_R: {
    height: 210,
    width: 420,
    backgroundColor: '#FAE5A4',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  myButton_R: {
    height: 50,
    width: 200,
    marginTop: 30,
    justifyContent: 'center',
    marginLeft: -30,
  },
  text_back_R: {
    fontSize: 18,
    color: "#7E6107",
    marginLeft: 70,
    marginTop: 25,
  },
  notification_R: {
    color: "#7E6107",
    fontWeight: 'bold',
    paddingTop: 3,
    paddingLeft: 147.5,
  },
  main_R: {
    flex: 2.275,
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