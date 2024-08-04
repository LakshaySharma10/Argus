import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import logo from '../../assets/images/argusLogo.png';
import home from '../../assets/images/home.svg';
import chat from '../../assets/images/chat.svg';
import plus from '../../assets/images/plus.svg';
import heart from '../../assets/images/heart.svg';
import qrCode from '../../assets/images/qrCode.png';
import person from '../../assets/images/person.svg';

export default function CheckIn() {
  const [name, setName] = useState('');
  const [time, setTime] = useState({ hours: 0, minutes: 0, amPm: 'AM' });

  const handleNameChange = (text) => setName(text);

  const handleTimeChange = (field, value) => {
    setTime((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleAmPm = () => {
    setTime((prev) => ({
      ...prev,
      amPm: prev.amPm === 'AM' ? 'PM' : 'AM'
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.argusLogo} />
        <Image source={person} style={styles.profileIcon} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Effortless Check-In  And Check-Out</Text>
        <Image source={qrCode} style={styles.qrCode} />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your name"
            placeholderTextColor="#888"
            onChangeText={handleNameChange}
            value={name}
          />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.inputLabel}>Current Time</Text>
          <View style={styles.timeInput}>
            <TextInput
              style={styles.timeTextInput}
              keyboardType="numeric"
              maxLength={2}
              value={time.hours.toString()}
              onChangeText={(text) => handleTimeChange('hours', parseInt(text))}
            />
            <Text style={styles.timeSeparator}>:</Text>
            <TextInput
              style={styles.timeTextInput}
              keyboardType="numeric"
              maxLength={2}
              value={time.minutes.toString()}
              onChangeText={(text) => handleTimeChange('minutes', parseInt(text))}
            />
            <TouchableOpacity
              style={styles.timeButton}
              onPress={toggleAmPm}
            >
              <Text style={styles.timeButtonText}>{time.amPm}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Check Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={home} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={person} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={plus} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={chat} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={heart} style={styles.footerIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#1e1e1e',
  },
  argusLogo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#1e1e1e',
  },
  title: {
    fontSize: 35,
    fontFamily: 'Montserrat SemiBold 600',
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
    paddingLeft:75,
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
    paddingLeft: 106,
    
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
    padding: 10,
    borderRadius: 5,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#EF2A39',
  },
  footerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EF2A39',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
});
