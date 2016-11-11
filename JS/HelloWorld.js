/**
 * Created by TJY on 16/11/10.
 */
'use strict'
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,

} from 'react-native';
export default class extends Component{
    render(){
        return(

            <Text style={styles.text}>Hello world</Text>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    text:{
        color: 'black',
        backgroundColor: 'white',
        fontSize: 30,
        margin: 80,
        alignItems: 'center',

    }
});