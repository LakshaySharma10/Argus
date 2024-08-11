import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import logo from '../../assets/images/argusLogo.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatBot from '../chatbot/chatbot';
import { Ionicons } from '@expo/vector-icons';

const profilePictureUri = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyNjYzN3wwfDF8c2VhcmNofDJ8fHByb2ZpbGV8ZW58MHx8fHwxNjk3NjIxOTkyfDA&ixlib=rb-4.0.3&q=80&w=400';

const WorkingConditions = () => {

  const [chatVisible, setChatVisible] = useState(false);
  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  const [workingConditions, setWorkingConditions] = useState({
    temperature: 0,
    humidity: 0,
    noise: 0,
    light: 0,
    airQuality: 0,
    amenities: '',
    breaks: '',
    otherConditions: '',
  });

  const getJWT = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      return token;
    } catch (error) {
      console.error('Error retrieving JWT', error);
    }
  };

  const getWorkingConditions = async () => {
    try {
      const token = await getJWT();
      const response = await axios.get('http://localhost:8080/workingConditions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWorkingConditions(response.data[0]);
    } catch (error) {
      console.error('Failed to retrieve working conditions:', error);
    }
  }

  useEffect(() => {
    getWorkingConditions();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Image source={{ uri: profilePictureUri }} style={styles.profilePicture} />
      </View>

      <Text style={styles.sectionTitle}>Working Conditions</Text>

      <View style={styles.conditionsSection}>
      <Text style={styles.subTitle}>Environmental Metrics</Text>
        <View style={styles.conditionItem}>
          <Text style={styles.conditionLabel}>Temperature:</Text>
          <Text style={styles.conditionValue}>{workingConditions.temperature} °C</Text>
        </View>
        <View style={styles.conditionItem}>
          <Text style={styles.conditionLabel}>Humidity:</Text>
          <Text style={styles.conditionValue}>{workingConditions.humidity} %</Text>
        </View>
        <View style={styles.conditionItem}>
          <Text style={styles.conditionLabel}>Noise:</Text>
          <Text style={styles.conditionValue}>{workingConditions.noise} dB</Text>
        </View>
        <View style={styles.conditionItem}>
          <Text style={styles.conditionLabel}>Light:</Text>
          <Text style={styles.conditionValue}>{workingConditions.light} lux</Text>
        </View>
        <View style={styles.conditionItem}>
          <Text style={styles.conditionLabel}>Air Quality:</Text>
          <Text style={styles.conditionValue}>{workingConditions.airQuality} AQI</Text>
        </View>
      </View>

      <View style={styles.amenitiesSection}>
        <Text style={styles.subTitle}>Amenities</Text>
        <Text style={styles.detailsText}>{workingConditions.amenities}</Text>
      </View>

      <View style={styles.breaksSection}>
        <Text style={styles.subTitle}>Breaks</Text>
        <Text style={styles.detailsText}>{workingConditions.breaks}</Text>
      </View>

      <View style={styles.otherConditionsSection}>
        <Text style={styles.subTitle}>Other Conditions</Text>
        <Text style={styles.detailsText}>{workingConditions.otherConditions}</Text>
      </View>

      <TouchableOpacity style={styles.fab} onPress={toggleChat}>
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />
      </TouchableOpacity>

      {chatVisible && (<ChatBot visible={chatVisible} toggleChat={toggleChat} />)}
    </View>
  );
};

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
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 50,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  conditionsSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#222',
    borderRadius: 10,
  },
  conditionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  conditionLabel: {
    color: '#AAAAAA',
    fontSize: 18,
  },
  conditionValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  amenitiesSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#222',
    borderRadius: 10,
  },
  breaksSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#222',
    borderRadius: 10,
  },
  otherConditionsSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#222',
    borderRadius: 10,
  },
  subTitle: {
    color: '#EF2A39',
    fontSize: 22,
    marginBottom: 10,
  },
  detailsText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 15,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff5c5c',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default WorkingConditions;
