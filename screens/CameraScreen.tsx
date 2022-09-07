import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { ScrollView, SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { Ionicons } from '@expo/vector-icons';
import { api } from '../api'
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Canvas from 'react-native-canvas'

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
                    <Text style={styles.text}> Flip </Text>
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
//<canvas id="canvas" width="1000px" height="500px"></canvas>
const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
  // console.log('sdsfds', JSON.stringify(photo))
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
                Re-take
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
                save photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

function SelectScreen({navigation, route}: any) {
  const [boundingBox, setBoundingBox] = React.useState<any>(null)
  const ref = useRef<any>(null)
  const { capturedImage } = route.params
  // console.log(capturedImage)
  const encodedImg: Object = {'uri': 'data:image/png;base64,' + capturedImage.base64}

  useEffect(() => getBoundingBox(), [])
  
  function getBoundingBox(){
    api.getBoundingBox(encodedImg)
    .then(res => {
      setBoundingBox(res)
      // console.log(res)
      if (res['counts'] > 0) {
        for (let i in res['object']) {
          const object: any = res['object'][i]
          // console.log(object['x'])
          cropImg({x: object['x'], y: object['y'], w: object['w'], h: object['h']})
        }
      }
      else window.alert('No banana.')
    })
    .catch(err => console.log(err))
  }

  function cropImg({ x, y, w, h }: any) {
    console.log('>>>x', x);
    let canvas: any = ref.current;
    canvas.width = 400;
    canvas.height = 700;
    // console.log(capturedImage)

    const ctx = canvas.getContext('2d');

    let img: any = React.createElement(
      "img",
      { src: 'data:image/png;base64,' + capturedImage.base64 },
      null
    );

    img.onload = function () {
      ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
    }
  }

  return (
    <>
      <StatusBar />
        <ScrollView>
          <SafeAreaView style={styles.container}>
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
            <View style={styles.main}>
              <Canvas ref={ref} style={{ zIndex: 99 }} />
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
      <Stack.Navigator initialRouteName="CameraScreen">
        <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Select" component={SelectScreen} options={{ headerShown: false }} />
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
    paddingLeft: 150,
  },
  main: {
    flex: 1,
    width: 420,
    height: 539,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
