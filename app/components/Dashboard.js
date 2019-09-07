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
    state = {
        userName: '',
        email: '',
        name: ''
    }
    componentDidMount() {
        this.getUserDetails(auth.currentUser.email);
    }
    componentDidUpdate() {
        console.log('updated!');
        console.log(this.state.name);
    }
    getUserDetails(usrEmail) {
        const {navigate} = this.props.navigation;
        var docRef = db.collection('users').doc(usrEmail);
        docRef.get()
        .then(doc => {
            if(doc.exists) {
                this.setState({
                    userName: doc.data().userName,
                    name: doc.data().fullName,
                    email: doc.data().email
                });
            } else {
                console.log('no such document');
                navigate('Home', {name: Home});
            }
        }).catch(function(err) {
            console.log(err);
            navigate('Home', {name: Home});
        });
    }
    render() {
        return (
            <View style={styles.regForm}>
                <Text>successfully logged in!</Text>
                <Text>Welcome {auth.currentUser.email}!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  regForm: {
    alignSelf: 'stretch',
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
