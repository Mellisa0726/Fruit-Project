import React, { useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, SafeAreaView, StyleSheet, Dimensions, Animated, TouchableOpacity, Button, Text, View, Image, ImageBackground } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import Unorderedlist from 'react-native-unordered-list';

import { api } from '../api';
import Notification from './Notification';
import { Context } from '../contexts/Context';

const { width } = Dimensions.get('window');

function GoToBanana({ screenName, isModalVisible, changeModalState }: any) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(screenName, {isModalVisible: isModalVisible, changeModalState: changeModalState})} style={styles.knowledgeButton}>
      <ImageBackground style={styles.knowledgeButtonImage} source={require('../assets/images/banana_a.png')}>
        <Text style={styles.knowledgeButtonText}>關於香蕉</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

function GoToOrange({ screenName, isModalVisible, changeModalState }: any) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(screenName, {isModalVisible: isModalVisible, changeModalState: changeModalState})} style={styles.knowledgeButton}>
      <ImageBackground style={styles.knowledgeButtonImage} source={require('../assets/images/orange_4.png')}>
        <Text style={styles.knowledgeButtonText}>關於橘子</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

function KnowledgeScreen() {
  const { isModalVisible, changeModalState } = useContext(Context);
  const openNotification = () => {
    changeModalState();
  };

  return (
    <>
      <StatusBar />
        {/* <SafeAreaView style={styles.container_K}> */}
        {/* <View style={[styles.container_K, { paddingTop: Math.max(insets.top, 16) }]}> */}
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.first}>
              <Text style={styles.title}> 水果小知識 </Text>
              <TouchableOpacity>
                <Ionicons name="notifications-outline" size={25} style={styles.notification_K} onPress={openNotification}/>
              </TouchableOpacity>
              <Notification isModalVisible={isModalVisible} changeModalState={changeModalState}/>
            </View>
          </View>
          <View style={styles.main}>
            <GoToBanana screenName="關於香蕉" isModalVisible={isModalVisible} changeModalState={changeModalState} />
            <GoToOrange screenName="關於橘子" isModalVisible={isModalVisible} changeModalState={changeModalState} />
          </View>
        </View>
        {/* </SafeAreaView> */}
    </>
  );
}

function GoToEat({ screenName, isModalVisible, changeModalState }: any) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(screenName, {isModalVisible: isModalVisible, changeModalState: changeModalState})} style={styles.knowledgeButton}>
      <ImageBackground style={styles.knowledgeButtonImage} source={require('../assets/images/香蕉熟成階段.png')}>
        <Text style={styles.knowledgeButtonText}>香蕉熟成階段</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

function GoToRecipe({ screenName, isModalVisible, changeModalState }: any) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(screenName, {isModalVisible: isModalVisible, changeModalState: changeModalState})} style={styles.knowledgeButton}>
      <ImageBackground style={styles.knowledgeButtonImage} source={require('../assets/images/banana_b.png')}>
        <Text style={styles.knowledgeButtonText}>香蕉食譜</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

function BananaScreen({navigation, route}: any) {
  const { isModalVisible, changeModalState } = useContext(Context);
  const openNotification = () => {
    changeModalState();
  };

  return (
    <>
      <StatusBar />
        {/* <SafeAreaView style={styles.container_K}> */}
        {/* <View style={[styles.container_K, { paddingTop: Math.max(insets.top, 16) }]}> */}
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.first}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button_back}>
                  <Text style={styles.text_back}>ᐸ  返回</Text>
              </TouchableOpacity>
              <Text style={styles.title}> 關於香蕉 </Text>
              <TouchableOpacity>
                <Ionicons name="notifications-outline" size={25} style={styles.notification_K} onPress={openNotification}/>
              </TouchableOpacity>
              <Notification isModalVisible={isModalVisible} changeModalState={changeModalState}/>
            </View>
          </View>
          <View style={styles.main}>
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
            <View style={styles.first}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button_back}>
                  <Text style={styles.text_back}>ᐸ  返回</Text>
              </TouchableOpacity>
              <Text style={styles.title}>香蕉熟成階段</Text>
                <TouchableOpacity>
                  <Ionicons name="notifications-outline" size={25} style={styles.notification} onPress={openNotification}/>
                </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <View style={styles.middle}>
              <Text style={styles.header_text}>第一階段 墨綠色</Text>
              <Image style={styles.bananaImage} source={require('../assets/images/banana_1.png')} />
              <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43, marginBottom: 30 }}>
                <Text style={styles.text}>未熟，不宜食用。</Text>
              </Unorderedlist>

              <Text style={styles.header_text}>第二階段 淡青色至半青半黃</Text>
              <Image style={styles.bananaImage} source={require('../assets/images/banana_2.png')} />
              <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43 }}>
                <Text style={styles.text}>口感苦澀、皮厚肉硬。</Text>
              </Unorderedlist>
              <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43 }}>
                <Text style={styles.text}>含有「難消化性麥芽糊精」，不易被小腸吸收，升糖指數較低，可穩定血糖，有助於改善腸道健康。</Text>
              </Unorderedlist>
              <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43, marginBottom: 80 }}>
                <Text style={styles.text}>具有抗性澱粉、提供高飽足感，但不易消化，吃多容易引起腹脹、消化不良等反應。</Text>
              </Unorderedlist>
              
              <Text style={styles.header_text}>第三階段 四分之三至全黃香蕉</Text>
              <Image style={styles.bananaImage} source={require('../assets/images/banana_3.png')} />
              <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43 }}>
                <Text style={styles.text}>味道香濃、口感軟滑。</Text>
              </Unorderedlist>
              <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43 }}>
                <Text style={styles.text}>含有維他命B2、B6及C，促進新陳代謝，有養顏美白效果。</Text>
              </Unorderedlist>
              <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43, marginBottom: 80 }}>
                <Text style={styles.text}>豐富的鉀和鎂能消除疲勞，減少運動抽筋的機會，助消化、安眠、抗憂鬱。</Text>
              </Unorderedlist>
            
              <Text style={styles.header_text}>第四階段 帶有啡點之全熟香蕉</Text>
              <Image style={styles.bananaImage} source={require('../assets/images/banana_4.png')} />
              <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43 }}>
                <Text style={styles.text}>口感軟爛，適合牙口不好者食用。</Text>
              </Unorderedlist>
              <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43 }}>
                <Text style={styles.text}>含有大量多酚，能夠延緩衰老。</Text>
              </Unorderedlist>
              <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43 }}>
                <Text style={styles.text}>啡點越多，免疫活性越高，當中的磷脂質有助抑制胃潰瘍，幫助消化。</Text>
              </Unorderedlist>
              
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
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button_back}>
            <Text style={styles.text_back}>ᐸ  返回</Text>
          </TouchableOpacity>
          <View style={styles.first}>
            <Text style={styles.title}>香蕉食譜</Text>
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
                <Image style={styles.pic} source={require('../assets/images/烤香蕉片.png')} />
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

function OrangeScreen({navigation, route}: any) {
  const { isModalVisible, changeModalState } = useContext(Context);
  const openNotification = () => {
    changeModalState();
  };

  return (
    <>
      <StatusBar />
        {/* <SafeAreaView style={styles.container_K}> */}
        {/* <View style={[styles.container_K, { paddingTop: Math.max(insets.top, 16) }]}> */}
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.first}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button_back}>
                  <Text style={styles.text_back}>ᐸ  返回</Text>
              </TouchableOpacity>
              <Text style={styles.title}> 關於橘子 </Text>
              <TouchableOpacity>
                <Ionicons name="notifications-outline" size={25} style={styles.notification_K} onPress={openNotification}/>
              </TouchableOpacity>
              <Notification isModalVisible={isModalVisible} changeModalState={changeModalState}/>
            </View>
          </View>
          <View style={styles.main}>
            <GoToOrangeEat screenName="6大部位功效" isModalVisible={isModalVisible} changeModalState={changeModalState} />
            <GoToOrangeRecipe screenName="吃橘子要注意" isModalVisible={isModalVisible} changeModalState={changeModalState} />
          </View>
        </View>
        {/* </SafeAreaView> */}
    </>
  );
}

function GoToOrangeEat({ screenName, isModalVisible, changeModalState }: any) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(screenName, {isModalVisible: isModalVisible, changeModalState: changeModalState})} style={styles.knowledgeButton}>
      <ImageBackground style={styles.knowledgeButtonImage} source={require('../assets/images/orange_3.png')}>
        <Text style={styles.knowledgeButtonText}>6大部位功效</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

function GoToOrangeRecipe({ screenName, isModalVisible, changeModalState }: any) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(screenName, {isModalVisible: isModalVisible, changeModalState: changeModalState})} style={styles.knowledgeButton}>
      <ImageBackground style={styles.knowledgeButtonImage} source={require('../assets/images/orange_2.png')}>
        <Text style={styles.knowledgeButtonText}>吃橘子要注意</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

function OrangeEatScreen({navigation, route}: any) {
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
            <View style={styles.first}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button_back}>
                  <Text style={styles.text_back}>ᐸ  返回</Text>
              </TouchableOpacity>
              <Text style={styles.title}>6大部位功效</Text>
                <TouchableOpacity>
                  <Ionicons name="notifications-outline" size={25} style={styles.notification} onPress={openNotification}/>
                </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <View style={styles.middle}>
              <Unorderedlist bulletUnicode={0x2726} color='#4D3604' style={{ fontSize: 20, lineHeight: 54 }}>
                <Text style={styles.header_text_o}>果肉：潤肺、抗癌</Text>
              </Unorderedlist>
              <Image style={styles.bananaImage} source={require('../assets/images/果肉.png')} />
              <Text style={styles.text}>橘子果肉性味甘酸、入肺、胃經；具有健脾開胃、理氣通絡、止渴潤肺的功效，含豐富維生素C。在鮮橘肉中含有抗癌物質「諾米靈」，能分解癌化學物質，抑制並阻斷癌細胞的生長，同時使人體內除毒酶的活性成倍提高。</Text>

              <Unorderedlist bulletUnicode={0x2726} color='#4D3604' style={{ fontSize: 20, lineHeight: 54 }}>
                <Text style={styles.header_text_o}>晒乾橘皮：化痰</Text>
              </Unorderedlist>
              <Image style={styles.bananaImage} source={require('../assets/images/橘皮.png')} />
              <Text style={styles.text}>橘皮晒乾後在中醫又叫「陳皮」（因入藥年分越久藥效越好，因此叫陳皮）。陳皮常用於治療胃痛、久咳、疝氣、食積、嘔吐等症。陳皮除了具有理氣健脾、燥濕化痰、治風邪等藥用，還可以拿來泡熱水澡，溫身美肌。</Text>
              
              <Unorderedlist bulletUnicode={0x2726} color='#4D3604' style={{ fontSize: 20, lineHeight: 54 }}>
                <Text style={styles.header_text_o}>橘絡：治痰滯、降膽固醇</Text>
              </Unorderedlist>
              <Image style={styles.bananaImage} source={require('../assets/images/橘子橘絡.png')} />
              <Text style={styles.text}>橘絡即橘瓤上面的白色網狀絲絡又名橘絲，性味甘、平、苦，有通絡化痰、順氣活血之功效，常用於治療痰滯的胸痛和咳嗽等症。含有豐富維生素P，能防治高血壓，內側薄皮含有膳食纖維及果膠，老人多食用可促進通便，並降低膽固醇。</Text>
              
              <Unorderedlist bulletUnicode={0x2726} color='#4D3604' style={{ fontSize: 20, lineHeight: 54 }}>
                <Text style={styles.header_text_o}>橘葉精油：治神經官能症</Text>
              </Unorderedlist>
              <Image style={styles.bananaImage} source={require('../assets/images/橘子橘葉.png')} />
              <Text style={styles.text}>橘葉，性味辛、苦、平，歸肝經，具有疏肝理氣、散結消腫、去毒之功效，為治肝膽脅痛、乳房結塊的要藥。</Text>
              
              <Unorderedlist bulletUnicode={0x2726} color='#4D3604' style={{ fontSize: 20, lineHeight: 54 }}>
                <Text style={styles.header_text_o}>橘紅：祛痰治咳</Text>
              </Unorderedlist>
              <Image style={styles.bananaImage} source={require('../assets/images/橘紅.png')} />
              <Text style={styles.text}>橘紅又名「壇紅」，採集時取鮮果皮刮掉白色的內層，晾乾、晒乾單留表皮稱為「橘紅」，性味辛、苦、溫，歸肺、脾、胃經。具有理氣寬胸、祛寒痰、濕痰、食積嘔惡等功效，但橘紅不適用於陰虛燥咳和氣虛咳嗽之人。</Text>
              
              <Unorderedlist bulletUnicode={0x2726} color='#4D3604' style={{ fontSize: 20, lineHeight: 54 }}>
                <Text style={styles.header_text_o}>橘核：治療睾丸腫痛</Text>
              </Unorderedlist>
              <Image style={styles.bananaImage} source={require('../assets/images/橘子果核.png')} />
              <Text style={styles.text}>橘核，性味苦、平，無毒，歸肝經。有理氣散結止痛的作用，臨床常用來治療睾丸腫痛、乳腺炎性腫痛、疝氣痛等症。</Text>
            </View>
          </ScrollView>
          <Notification isModalVisible={isModalVisible} changeModalState={changeModalState}/>
        </View>
        {/* </SafeAreaView> */}
    </>
  );
}

function OrangeRecipeScreen({navigation, route}: any) {
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
            <View style={styles.first}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button_back}>
                  <Text style={styles.text_back}>ᐸ  返回</Text>
              </TouchableOpacity>
              <Text style={styles.title}>吃橘子要注意</Text>
                <TouchableOpacity>
                  <Ionicons name="notifications-outline" size={25} style={styles.notification} onPress={openNotification}/>
                </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <View style={styles.middle}>
              <Unorderedlist bulletUnicode={0x2726} color='#4D3604' style={{ fontSize: 20, lineHeight: 54 }}>
                <Text style={styles.header_text_o}>吃多易上火</Text>
              </Unorderedlist>
              <Text style={styles.text}>橘子性溫，吃多易誘發口腔炎、牙周炎。</Text>

              <Unorderedlist bulletUnicode={0x2726} color='#4D3604' style={{ fontSize: 20, lineHeight: 54 }}>
                <Text style={styles.header_text_o}>橘子不宜與牛奶同食</Text>
              </Unorderedlist>
              <Text style={styles.text}>牛奶中的蛋白質易與橘子中的果酸和維生素C發生反應，凝固成塊，不僅影響消化吸收，還會引起腹脹、腹痛、腹瀉等症狀。食用兩者應前後間隔至少1小時。</Text>
              
              <Unorderedlist bulletUnicode={0x2726} color='#4D3604' style={{ fontSize: 20, lineHeight: 54 }}>
                <Text style={styles.header_text_o}>寒咳熱咳有差別</Text>
              </Unorderedlist>
              <Text style={styles.text}>寒咳（喉嚨癢、痰色白、痰稀水）期間不宜吃橘子，熱咳（咳嗽時，伴有痰的產生，嘴巴乾燥，略帶火氣）最宜吃橘子。</Text>
              
              <Unorderedlist bulletUnicode={0x2726} color='#4D3604' style={{ fontSize: 20, lineHeight: 54 }}>
                <Text style={styles.header_text_o}>皮膚變黃</Text>
              </Unorderedlist>
              <Text style={styles.text}>柑橘的顏色主要來源於類胡蘿蔔素，最大的特點是其會在人體的脂肪儲存沉積。短時間內大量吃柑橘，類胡蘿蔔素會迅速在體內富集，把原本偏白的脂肪染成金黃色，皮膚自然看起來就會變黃。</Text>
            </View>
          </ScrollView>
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
        <Stack.Screen name="關於香蕉" component={BananaScreen}options={{ headerShown: false }} />
        <Stack.Screen name="香蕉熟成階段" component={EatScreen} options={{  headerShown: false }} />
        <Stack.Screen name="香蕉食譜" component={RecipeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="關於橘子" component={OrangeScreen}options={{ headerShown: false }} />
        <Stack.Screen name="6大部位功效" component={OrangeEatScreen}options={{ headerShown: false }} />
        <Stack.Screen name="吃橘子要注意" component={OrangeRecipeScreen}options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1, //佔據所有空間
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  first: {
    height: 210,
    width: '100%',
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
  notification_K: {
    color: "#7E6107",
    fontWeight: 'bold',
    paddingTop: 3,
    paddingLeft: 147.5,
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  }, 
  knowledgeButton: {
    // marginTop: 70,
    height: 180,
    width: '50%',
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  knowledgeButtonImage: {
    width: 216,
    height: 202,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  knowledgeButtonText: {
    fontSize: 27,
    color: "#fff",
    fontWeight: 'bold',
  },
  notification: {
    color: "#7E6107",
    fontWeight: 'bold',
    paddingTop: 3,
    paddingLeft: 94.5,
  },
  button_back: {
    position: 'absolute',
    top: 60,
    left: 60,
    zIndex: 1,
  },
  text_back: {
    fontSize: 18,
    color: "#7E6107",
  },
  middle: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 55,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  header_text: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: "#4D3604",
  },
  text: {
    fontSize: 18,
    color: "#7E6107",
    marginVertical: 10,
  },
  header_text_o: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: "#4D3604",
  },
  bananaImage: {
    flex: 1,
    borderRadius: 20,
    width: "100%",
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
    height: '100%'
  },
  notification_R: {
    color: "#7E6107",
    fontWeight: 'bold',
    paddingTop: 3,
    paddingLeft: 147.5,
  },
  main_R: {
    flex: 30,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  pic: {
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