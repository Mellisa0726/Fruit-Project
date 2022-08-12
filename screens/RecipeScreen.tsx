import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class RecipeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.pages}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: "#fff",
    },
    pages: {
        height: 500,
        width: 320,
        backgroundColor: 'green'
    },
})