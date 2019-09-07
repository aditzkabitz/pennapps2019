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

export default class Home extends Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
          <View style={styles.container}>
            <Button
              title="Signup"
              onPress={() => navigate('Signup', {name: 'Signup'})}
            />
            <Button
              title="Login"
              onPress={() => navigate('Login', {name: 'Login'})}
            />
          </View>
        )
      }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: 60,
    paddingRight: 60,
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
