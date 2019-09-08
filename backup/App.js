import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import RegForm from './app/components/RegForm';
import SignForm from './app/components/SignForm';
import Home from './app/components/Home';
import Dashboard from './app/components/Dashboard';
import Splash from './app/components/Splash';

import {db} from './app/config';

const appName = 'Home';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        title: appName,
      })
    },
    Signup: {
      screen: RegForm,
      navigationOptions: () => ({
        title: 'Signup'
      })
    },
    Login: {
      screen: SignForm,
      navigationOptions: () => ({
        title: 'Login'
      })
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: () => ({
        title: 'Dashboard'
      })
    },
    Splash: {
      screen: Splash,
      navigationOptions: ({
        title: 'Splash'
      })
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: 60,
    paddingRight: 60,
  },
  btn: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 100,
  }
});
