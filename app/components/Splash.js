import React, {Component} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';



import {db, auth, fb} from '../config';

export default class Splash extends Component {
    getLocation(email) {
      Geolocation.requestAuthorization();
      Geolocation.getCurrentPosition(function(info) {
        var docRef = db.collection('users').doc(email);
        var coordObj = {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          timestamp: info.timestamp
        }
        docRef.update({
          locations: fb.firestore.FieldValue.arrayUnion(coordObj)
        })
        console.log(info);
      });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
          <View style={styles.container}>
            <Button
              title="Log Location"
              onPress={this.getLocation(auth.currentUser.email)}
            />
            <Button
              title="Host Session"
            />
            <Button
              title="Join Session"
            />
            <Button
              title="Dashboard"
              onPress={() => navigate('Dashboard', {name: 'Dashboard'})}
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
