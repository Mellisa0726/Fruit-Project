import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect, useRef } from 'react'
import { ScrollView, ActivityIndicator, StyleSheet, TextInput, Text, View, ColorSchemeName, Button, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { Ionicons } from '@expo/vector-icons';
import { api } from '../api'
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Canvas, { Image as CanvasImage } from 'react-native-canvas'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Agenda from '../screens/AgendaScreen';


let camera: Camera
function CameraScreen() {
  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState<any>(null)
  const [type, setType] = useState(CameraType.back)

  const navigation = useNavigation();

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    console.log(status)
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
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
                    <Text style={styles.text}> 切換鏡頭 </Text>
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
  // const [encodedImg, setEncodedImg] = React.useState<any>(null)
  const [croppedImg, setCroppedImg] = React.useState<any>([])
  const [output, setOutput] = React.useState<any>(null)
  const [loading, setLoading] = React.useState<any>(true)
  const ref = useRef<any>(null)
  const { capturedImage } = route.params
  console.log(capturedImage)
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
    <>
      <StatusBar />
        {/* <SafeAreaView style={styles.container}> */}
        {/* <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}> */}
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.myButton}>
              <View>
                <Text style={styles.text_back}> ᐸ  返回 </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.first}>
              <Text style={styles.title}> 選擇香蕉 </Text>
                <TouchableOpacity>
                   <Ionicons name="notifications-outline" size={25} style={styles.notification} />
                </TouchableOpacity>
            </View>
          </View>
          <View style={styles.main_s}>
            {loading ? 
            <ActivityIndicator size="large" color="#7E6107" /> : 
            <ScrollView>
              <View style={styles.main}>
                <Text style={styles.description}>
                  點擊下方任一照片即可查看香蕉目前的成熟階段
                </Text>
                <Text style={styles.description}>
                  並選擇是否要加入您的日曆頁面中
                </Text>
                {croppedImg.map((img: any, index: any) => {
                  const src: any = 'data:image/png;base64,' + img.img
                  return (
                    <TouchableOpacity key={index} style={styles.Button_E} onPress={() => navigation.navigate('Result', {img: croppedImg[index].img})}>
                      <ImageBackground source={{ uri: src }} style={styles.banana_K} />
                    </TouchableOpacity>
                  )
                })}
              </View>
            </ScrollView>}
          </View>
        </View>
      {/* </SafeAreaView> */}
    </>
  );
}

function ResultScreen({ navigation, route }: any) {
  const { img } = route.params
  const [result, setResult] = useState({ knowledge: { condition: '', info: '', kid: -1}, imageURL: ''});
  const [loading, setLoading] = useState(true)
  // window.alert(JSON.stringify(res))

  useEffect(() => classify(), [])

  function classify(){
    const data: Object = {'uri': 'data:image/png;base64,' + img}
    api.classify(data)
    .then(res => {
      setResult(res);
      setLoading(false);
    })
    .catch(err => window.alert(err))
  }

  return (
    <>
      <StatusBar />
      {/* <SafeAreaView style={styles.container}> */}
      {/* <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}> */}
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.myButton}>
            <View>
              <Text style={styles.text_back}> ᐸ  返回 </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.first}>
            <Text style={styles.title}> 分類結果 </Text>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={25} style={styles.notification} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.main_r}>
        {loading ? 
          <ActivityIndicator size="large" color="#7E6107" /> : 
          <View style={styles.main}>
              <Text style={styles.header_text}>{result.knowledge.condition}</Text>
              <Image style={styles.banana} source={{ uri: result.imageURL }} />
              <Text style={styles.text2}>
                {result.knowledge.info + "\n"}
              </Text>
            <Text style={styles.text_calender}>
              是否加入日曆頁面
            </Text>
            <View style={styles.button_calender}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="close-circle" size={50} style={styles.button} />
              </TouchableOpacity>
              <Text>           </Text>
              <TouchableOpacity onPress={() => navigation.navigate('EditInfo', {imageURL: result.imageURL, kid: result.knowledge.kid})}>
                <Ionicons name="checkmark-circle" size={50} style={styles.button} />
              </TouchableOpacity>
            </View>
          </View>}
        </View>
      </View>
      {/* </SafeAreaView> */}
    </>
  );
}

function EditInfoScreen({ navigation, route }: any) {
  const { imageURL, kid } = route.params;
  const date = new Date();
  const formatDate = date.getFullYear() + " / " + (date.getMonth() + 1) + " / " + date.getDate();

  const [name, setName] = useState('Banana 01');
  const [source, setSource] = useState('全聯');

  const nameInputChange = (val: any) => {
    setName(val);
  }

  const shopInputChange = (val: any) => {
    setSource(val);
  }

  function postCalendar(){
    // window.alert(String(imageURL + name + source + kid))
    api.postCalendar(imageURL, name, source, kid) 
    .then(res => {
      if(res.success){
        window.alert('成功加入日曆！')
        // navigation.navigate('Agenda')
      }
      else window.alert('有地方出錯了⋯⋯')
    })
    .catch(err => window.alert(err))
  }

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="never"
      scrollEnabled={false}
    >
      <StatusBar />
      {/* <SafeAreaView style={styles.container}> */}
      {/* <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}> */}
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.myButton}>
            <View>
              <Text style={styles.text_back}> ᐸ  返回 </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.first}>
            <Text style={styles.title}> 儲存資訊 </Text>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={25} style={styles.notification} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.main_e}>
          <Image style={{ width: '70%', height: '35%', borderRadius: 20 }} source={{ uri: imageURL }} />
          <View style={{ width: '70%', marginTop: 30 }}>
          <View style={styles.Edit_name}>
            <Text style={styles.Edit_name}> 名稱：</Text>
            <TextInput
              style={styles.TextInput}
              placeholder="Banana 01"
              placeholderTextColor="#BBBBBB"
              onChangeText={(val) => nameInputChange(val)}
            />
          </View>

          <View style={styles.Edit_name}>
            <Text style={styles.Edit_name}> 日期：{formatDate}</Text>
          </View>
          
          <View style={styles.Edit_name}>
            <Text style={styles.Edit_name}> 購買地：</Text>
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
      {/* </SafeAreaView> */}
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
    height: 210,
    width: 420,
    backgroundColor: '#FAE5A4',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    marginLeft: -4,
  },
  myButton: {
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
    paddingLeft: 147.5,
  },
  main_b: {
    flex: 1,
    width: 420,
    height: 538,
    backgroundColor: '#fff',
  },
  main_s: {
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  main_r: {
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  main_e: {
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
    width: 420,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 50,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  description: {
    fontSize: 19,
    color: '#7E6107',
    fontWeight: 'bold',
    alignItems: 'center',
    marginTop: 10,
  },
  Button_E: {
    marginTop: 60,
    height: 220,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  banana_K: {
    width: 280,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    resizeMode: 'contain',
  },
  header_text: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    color: "#4D3604",
    textAlign: 'center',
    margin: 10
  },
  text2: {
    fontSize: 18,
    color: "#7E6107",
    marginLeft: 50,
    marginRight: 50,
  },
  banana: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
    width: "75%",
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_calender:{
    flexDirection: 'row',
    // marginHorizontal: 30,
    alignItems: 'center'
  },
  text_calender:{
    fontSize: 20,
    fontWeight: 'bold',
    color: "#4D3604",
  },
  button:{
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
