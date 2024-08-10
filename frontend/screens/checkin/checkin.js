import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import logo from '../../assets/images/argusLogo.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CheckIn() {

  const [user, setUser] = useState({
    _id: '',
    username: '',
    email: '',
  });

  const [qrURL, setQRURL] = useState('');

  const getJWT = async () => {
    try { 
      const token = await AsyncStorage.getItem('jwtToken');
      return token;
    } catch (error) {
      console.error('Error retrieving JWT', error);
    }
  };

  const getUser = async () => {
    try {
      const token = await getJWT();
      const response = await axios.get("http://192.168.1.11:8080/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    }
    catch (error) {
      console.log("Failed to retrieve user:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const [currentTime, setCurrentTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    amPm: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const amPm = hours >= 12 ? 'PM' : 'AM';
      setCurrentTime({
        hours: hours % 12 || 12,
        minutes: minutes < 10 ? `0${minutes}` : minutes,
        seconds: seconds < 10 ? `0${seconds}` : seconds,
        amPm,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getQRCode = async () => {
    try {
      const token = await getJWT();
      const response = await axios.post("http://192.168.1.11:8080/qr/generate", {
        userId: user._id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.qrCodeData);
      setQRURL(response.data.qrCodeData);
      console.log(qrURL)
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  }

  useEffect(() => {
    if(user.email){
      getQRCode();
    }
  }, [user.email]);

  const profilePictureUri = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyNjYzN3wwfDF8c2VhcmNofDJ8fHByb2ZpbGV8ZW58MHx8fHwxNjk3NjIxOTkyfDA&ixlib=rb-4.0.3&q=80&w=400';


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Image source={{ uri: profilePictureUri }} style={styles.profilePicture} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Effortless Check-In And Check-Out</Text>
        <Image source={{ uri: qrURL }} style={styles.qrCode} />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput style={styles.textInput} value={user.username} editable={false} />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.inputLabel}>Current Time</Text>
          <View style={styles.timeInput}>
            <TextInput
              style={styles.timeTextInput}
              maxLength={2}
              value={currentTime?.hours?.toString()}
              editable={false}
            />
            <Text style={styles.timeSeparator}>:</Text>
            <TextInput
              style={styles.timeTextInput}
              maxLength={2}
              value={currentTime?.minutes?.toString()}
              onChangeText={(text) => handleTimeChange('minutes', parseInt(text))}
            />
            <TouchableOpacity
              style={styles.timeButton}
            >
              <Text style={styles.timeButtonText}>{currentTime?.amPm}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Check Out</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 50,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#111',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  qrCode: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderRadius: 5,
    color: '#fff',
    width: 220,
  },
  timeContainer: {
    width: '100%',
    marginBottom: 15,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  timeInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeTextInput: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    width: 50,
    borderRadius: 5,
    color: '#fff',
    textAlign: 'center',
  },
  timeSeparator: {
    fontSize: 20,
    color: '#fff',
    marginHorizontal: 5,
  },
  timeButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  timeButtonText: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#ff0000',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '35%',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
