import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {NavigationActions} from 'react-navigation';

import {db, auth} from '../config';
import Home from './Home';
import Dashboard from './Dashboard';
import Splash from './Splash';

export default class SignForm extends Component {
    state = {
        password: '', email: ''
    }
    onChangeText = (key, val) => {
    this.setState({ [key]: val })
    }
    login = () => {
        const {navigate} = this.props.navigation;
        console.log('here!');
        var email = this.state.email;
        var password = this.state.password;
        auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            console.log('success signing in!');
            navigate('Splash', {name: Splash})
        }).catch(function(error) {
            if(error) {
                var errorCode = error.code;
                console.log(errorCode);
                navigate('Home', {name: Home})
            }
        })
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.regForm}>
                <Text style={styles.header}>Login</Text>
                <TextInput 
                autoCapitalize="none"
                style={styles.textInput} 
                placeholder="email"
                placeholderTextColor='gray'
                underlineColorAndroid={'transparent'}
                onChangeText={val => this.onChangeText('email', val)}
                />
                <TextInput 
                autoCapitalize="none"
                style={styles.textInput} 
                placeholder="password"
                placeholderTextColor='gray'
                secureTextEntry
                underlineColorAndroid={'transparent'}
                onChangeText={val => this.onChangeText('password', val)}
                />
                <TouchableOpacity style={styles.button} onPress={this.login}>
                    <Text style={styles.btntext}>login</Text>
                </TouchableOpacity>

                <Text style={styles.noacct}>Don't have an account?</Text>
                <Button
                title="Signup"
                onPress={() => navigate('Signup', {name: 'Signup'})}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  regForm: {
    alignSelf: 'stretch',
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: 60,
    paddingRight: 60,
  },
  noacct: {
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 15
  },
  header: {
      fontSize: 34,
      color: '#000',
      borderBottomColor: '#199187',
      marginBottom: 20,
      borderBottomWidth: 1,
  },
  textInput: {
      alignSelf: 'stretch',
      height: 40,
      marginBottom: 30,
      color: '#000',
      borderBottomColor: '#000',
      borderBottomWidth: 1,
  },
  button: {
      alignSelf: 'stretch',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#59cbbd',
  },
  btntext: {
      color: '#fff',
      fontWeight: 'bold',
  }
});
