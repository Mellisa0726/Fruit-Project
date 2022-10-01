import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect, useRef } from 'react'
import { ScrollView, ActivityIndicator, StyleSheet, TextInput, Text, View, ColorSchemeName, Button, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { Ionicons } from '@expo/vector-icons';
import { api } from '../api'
import { useNavigation, NavigationContainer, CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Unorderedlist from 'react-native-unordered-list';

import Agenda from '../screens/AgendaScreen';
import { render } from 'react-dom';


let camera: Camera
function CameraScreen() {
  const [startCamera, setStartCamera] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState<any>(null)
  const [type, setType] = useState(CameraType.back)

  const navigation = useNavigation();

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    // console.log(status)
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('權限遭拒')
    }
  }
  const __takePicture = async () => {
    const options = { base64: true };
    const photo: any = await camera.takePictureAsync(options)
    //console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }
  const __savePhoto = () => {
    const screenName: any = 'Select';
    return (
      navigation.navigate(screenName, {capturedImage: capturedImage})
      );
  }
  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }

  __startCamera()

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: '100%'
        }}
      >
        {previewVisible && capturedImage ? (
          <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
        ) : (
          <Camera
            type={type}
            style={{ flex: 1 }}
            ref={(r) => {
              camera = r!
            }}
          >
            <View
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  left: '5%',
                  top: '5%',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setType(type === CameraType.back ? CameraType.front : CameraType.back);
                  }}>
                  <Text style={styles.text}>切換鏡頭</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  padding: 20,
                  justifyContent: 'space-between'
                }}
              >
                <View
                  style={{
                    alignSelf: 'center',
                    flex: 1,
                    alignItems: 'center'
                  }}
                >
                  <TouchableOpacity
                    onPress={__takePicture}
                    style={{
                      width: 70,
                      height: 70,
                      bottom: 0,
                      borderRadius: 50,
                      backgroundColor: '#fff'
                    }}
                  />
                </View>
              </View>
            </View>
          </Camera>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text style={{ color: '#fff', fontSize: 20}}>
                重拍
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,
                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text style={{color: '#fff',fontSize: 20}}>
                送出
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

function SelectScreen({navigation, route}: any) {
  const [croppedImg, setCroppedImg] = useState<any>([])
  const [loading, setLoading] = useState<any>(true)
  const { capturedImage } = route.params
  // console.log(capturedImage)
  const encodedImg: Object = {'uri': 'data:image/png;base64,' + capturedImage.base64}

  useEffect(() => getBoundingBox(), [])
  
  function getBoundingBox(){
    api.getBoundingBox(encodedImg) // phone
    // api.getBoundingBox(capturedImage) // web
    .then(res => {
      if (res['counts'] > 0){
        setCroppedImg(res['object'])
        setLoading(false)
      }
      else window.alert('No banana.')
    })
    .catch(err => window.alert(err))
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button_back}>
          <View>
            <Text style={styles.text_back}>ᐸ  返回</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.first}>
          <Text style={styles.title}>選擇香蕉</Text>
            <TouchableOpacity>
                <Ionicons name="notifications-outline" size={25} style={styles.notification} />
            </TouchableOpacity>
        </View>
      </View>
      <View style={styles.main}>
        {loading ? 
        <ActivityIndicator size="large" color="#7E6107" /> : 
        <>
          <Text style={styles.description}>
            點擊下方任一照片即可查看香蕉目前的成熟階段{"\n"}
            並選擇是否要加入您的日曆頁面中
          </Text>
          <View style={styles.main}>
            <ScrollView>
                {croppedImg.map((img: any, index: any) => {
                  const src: any = 'data:image/png;base64,' + img.img
                  return (
                    <TouchableOpacity key={index} style={styles.bananaButton} onPress={() => navigation.navigate('Result', {img: croppedImg[index].img})}>
                      <ImageBackground source={{ uri: src }} style={styles.bananaImage} />
                    </TouchableOpacity>
                  )
                })}
            </ScrollView>
          </View>
        </>
        }
      </View>
    </View>
  );
}

function ResultScreen({ navigation, route }: any) {
  const { img } = route.params
  const [result, setResult] = useState({ knowledge: { condition: '', info: '', kid: -1}, imageURL: ''});
  const [loading, setLoading] = useState(true)

  useEffect(() => {if (result.knowledge.kid === -1) classify()}, [])

  function classify(){
    const data: Object = {'uri': 'data:image/png;base64,' + img}
    api.classify(data)
    .then(res => {
      setResult(res);
      setLoading(false);
    })
    .catch(err => Alert.alert(err))
  }

  function renderInfo(kid: Number) {
    if (kid === 1) return (
      <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43 }}>
        <Text style={styles.infoText}>未熟，不宜食用</Text>
      </Unorderedlist>
    )
    else if (kid === 2) return (
      <>
        <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43 }}>
          <Text style={styles.infoText}>口感苦澀、皮厚肉硬</Text>
        </Unorderedlist>
        <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43 }}>
          <Text style={styles.infoText}>含有「難消化性麥芽糊精」，不易被小腸吸收，升糖指數較低，可穩定血糖，有助於改善腸道健康</Text>
        </Unorderedlist>
        <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43 }}>
          <Text style={styles.infoText}>具有抗性澱粉、提供高飽足感，但不易消化，吃多容易引起腹脹、消化不良等反應</Text>
        </Unorderedlist>
      </>
    )
    else if (kid === 3) return (
      <>
        <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43 }}>
          <Text style={styles.infoText}>味道香濃、口感軟滑</Text>
        </Unorderedlist>
        <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43 }}>
          <Text style={styles.infoText}>含有維他命B2、B6及C，促進新陳代謝，養顏美白效果</Text>
        </Unorderedlist>
        <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43 }}>
          <Text style={styles.infoText}>豐富的鉀和鎂能消除疲勞，減少運動抽筋的機會。助消化、安眠、抗憂鬱</Text>
        </Unorderedlist>
      </>
    )
    else if (kid === 4) return (
      <>
        <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43 }}>
          <Text style={styles.infoText}>口感軟爛，適合牙口不好者食用</Text>
        </Unorderedlist>
        <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43 }}>
          <Text style={styles.infoText}>含有大量多酚，能夠延緩衰老</Text>
        </Unorderedlist>
        <Unorderedlist bulletUnicode={0x2726} color='#7E6107' style={{ fontSize: 18, lineHeight: 43 }}>
          <Text style={styles.infoText}>啡點越多，免疫活性越高，當中的磷脂質有助抑制胃潰瘍，幫助消化</Text>
        </Unorderedlist>
      </>
    )
    else return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button_back}>
            <Text style={styles.text_back}>ᐸ  返回</Text>
        </TouchableOpacity>
        <View style={styles.first}>
          <Text style={styles.title}>分類結果</Text>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={25} style={styles.notification} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.main}>
      {loading ? 
        <ActivityIndicator size="large" color="#7E6107" /> : 
        <View style={styles.main}>
            <Text style={styles.header_text}>{result.knowledge.condition}</Text>
            <Image style={styles.banana} source={{ uri: result.imageURL }} />
            <View style={styles.info}>
              {renderInfo(result.knowledge.kid)}
            </View>
          <Text style={styles.text_calender}>
            是否加入日曆頁面
          </Text>
          <View style={styles.button_calender}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close-circle" size={50} style={styles.button} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EditInfo', {imageURL: result.imageURL, kid: result.knowledge.kid})}>
              <Ionicons name="checkmark-circle" size={50} style={styles.button} />
            </TouchableOpacity>
          </View>
        </View>}
      </View>
    </View>
  );
}

function EditInfoScreen({ navigation, route }: any) {
  const { imageURL, kid } = route.params;
  const date = new Date();
  const formatDate = date.getFullYear() + " / " + (date.getMonth() + 1) + " / " + date.getDate();

  const [name, setName] = useState('Banana 01');
  const [source, setSource] = useState('全聯');
  const navigation_toCalendar = useNavigation();

  const nameInputChange = (val: any) => {
    setName(val);
  }

  const shopInputChange = (val: any) => {
    setSource(val);
  }

  function postCalendar(){
    api.postCalendar(imageURL, name, source, kid) 
    .then(res => {
      if(res.success){
        Alert.alert('成功加入日曆！')
        // navigation_toCalendar.dispatch(
        //   CommonActions.reset({
        //     index: 1,
        //     routes: [
        //       { name: 'Root' },
        //       { name: 'Calendar' },
        //     ],
        //   })
        // );
      }
      else Alert.alert('有地方出錯了⋯⋯')
    })
    .catch(err => Alert.alert(err))
  }

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="never"
      scrollEnabled={false}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button_back}>
            <View>
              <Text style={styles.text_back}>ᐸ  返回</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.first}>
            <Text style={styles.title}>儲存資訊</Text>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={25} style={styles.notification} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.main}>
          <Image style={{ width: '70%', height: '35%', borderRadius: 20 }} source={{ uri: imageURL }} />
          <View style={{ width: '70%', marginTop: 30 }}>
          <View style={styles.Edit_name}>
            <Text style={styles.Edit_name}>名稱：</Text>
            <TextInput
              style={styles.TextInput}
              placeholder="Banana 01"
              placeholderTextColor="#BBBBBB"
              onChangeText={(val) => nameInputChange(val)}
            />
          </View>
          <View style={styles.Edit_name}>
            <Text style={styles.Edit_name}>日期：{formatDate}</Text>
          </View>
          <View style={styles.Edit_name}>
            <Text style={styles.Edit_name}>購買地：</Text>
            <TextInput
              style={styles.TextInput}
              placeholder="全聯"
              placeholderTextColor="#BBBBBB"
              onChangeText={(val) => shopInputChange(val)}
            />
          </View>
          </View>
          <TouchableOpacity style={styles.button_calender}>
            <Ionicons name="checkmark-circle" size={50} style={styles.button} onPress={() => postCalendar()}/>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="CameraScreen">
        <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Select" component={SelectScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditInfo" component={EditInfoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Agenda" component={Agenda} options={{ headerShown: false }} />
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
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
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
  notification: {
    color: "#7E6107",
    fontWeight: 'bold',
    paddingTop: 3,
    paddingLeft: 147.5,
  },
  main_b: {
    flex: 1,
    width: 420,
    height: 538,
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: 'white',
    marginTop: 20
  },
  infoText: {
    fontSize: 18,
    color: "#7E6107",
    marginVertical: 10,
  },
  description: {
    fontSize: 15,
    color: '#000',
    marginVertical: 20,
  },
  bananaButton: {
    marginBottom: 20,
    height: 220,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  bananaImage: {
    width: 280,
    height: 220,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header_text: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: "#4D3604",
  },
  banana: {
    margin: 10,
    borderRadius: 20,
    width: "65%",
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    width: '80%'
  },
  button_calender: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text_calender: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#4D3604",
  },
  button: {
    color: "#7E6107",
    paddingTop: 10,
    fontWeight: 'bold',
  },
  TextInput: {
    flex: 1,
    fontSize: 20,
    paddingLeft: 5,
    borderBottomColor: '#000', 
    borderBottomWidth: 1,
  },
  Edit_name:{
    flexDirection: 'row',
    fontSize: 20,
  },
});
