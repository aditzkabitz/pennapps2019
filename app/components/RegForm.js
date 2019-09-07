import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {db, auth} from '../config';

import Dashboard from './Dashboard';
import Home from './Home';

export default class RegForm extends Component {
    state = {
        username: '', password: '', email: '', name: ''
    }
    onChangeText = (key, val) => {
    this.setState({ [key]: val })
    }
    signup = () => {
        const {navigate} = this.props.navigation;
        const newUser = {
            email: this.state.email,
            password: this.state.password,
            userName: this.state.username,
            fullName: this.state.name
        };
        db.doc(`/users/${newUser.userName}`).get()
        .then(doc => {
            if(doc.exists) {
                console.log('user already exists');
            } else {
                return auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
            }
        })
        .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then(idToken => {
            token = idToken;
            const userCredentials = {
                userName: newUser.userName,
                fullName: newUser.fullName,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId,
                locations: {}
            };
            return db.doc(`/users/${newUser.email}`).set(userCredentials);
        })
        .then(() => {
            console.log("success!");
            navigate('Dashboard', {name: Dashboard})
        })
        .catch(err => {
            console.log(err);
            if(err.code === "auth/email-already-in-use") {
                console.log('email already in use');
            } else {
                console.log('unknown error');
            }
            navigate('Home', {name: Home});
        });
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.regForm}>
                <Text style={styles.header}>Register</Text>
                <TextInput 
                autoCapitalize="none"
                style={styles.textInput} 
                placeholder="your name"
                placeholderTextColor='gray'
                underlineColorAndroid={'transparent'}
                onChangeText={val => this.onChangeText('name', val)}
                />
                <TextInput 
                autoCapitalize="none"
                style={styles.textInput} 
                placeholder="username"
                placeholderTextColor='gray'
                underlineColorAndroid={'transparent'}
                onChangeText={val => this.onChangeText('username', val)}
                />
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
                <TouchableOpacity style={styles.button} onPress={this.signup}>
                    <Text style={styles.btntext}>signup</Text>
                </TouchableOpacity>
                <Text style={styles.noacct}>Already have an account?</Text>
                <Button
                title="Login"
                onPress={() => navigate('Login', {name: 'Login'})}
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
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: 60,
    paddingRight: 60,
  }
});
