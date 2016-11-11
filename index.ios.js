/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
' use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

import Hello from './JS/HelloWorld'
import SearchPage from './JS/SearchPage'
export default class ByHouseAPP extends Component {
  render() {
    return (
        <NavigatorIOS
            initialRoute={{
              title: 'My Initial Scene',
              component: SearchPage,
            }}
            style={{flex: 1}}
        />
    );
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

AppRegistry.registerComponent('ByHouseAPP', () => ByHouseAPP);
