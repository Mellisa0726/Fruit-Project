import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Button,
    Text,
    View,
    Image,
} from 'react-native';
import Navigation from 'C:/Users/melli/Project/navigation';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useColorScheme from 'C:/Users/melli/Project/hooks/useColorScheme';

export default function Login() {
    const colorScheme = useColorScheme();
    function navigate(){
    }

    return(
        <View style={styles.mainView}>
            <Text style={styles.text}> Login</Text>
            <Button
                title="Log in"
                onPress={navigate}/>
            <Navigation colorScheme={colorScheme} />
        </View>
    )
}
const styles = StyleSheet.create({
    mainView: {
        marginTop:40,
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontSize:50,
    }
});