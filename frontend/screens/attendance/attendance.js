import React, {useState, useEffect} from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import logo from '../../assets/images/argusLogo.png';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatBot from '../chatbot/chatbot';
import { Ionicons } from '@expo/vector-icons';

const AttendanceScreen = () => {
  const navigation = useNavigation();

  const [chatVisible, setChatVisible] = useState(false);
  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  const [user, setUser] = useState({
    _id: '',
    username: '',
    email: '',
    
  });

  const [attendance, setAttendance] = useState({
    monthlyAttendance: {},
    totalDaysPresent: 0,
    totalWorkingDays: 0,
  });

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
      const response = await axios.get("http://localhost:8080/auth/profile", {
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

  const getAttendanceSummary = async () => {
    try {
      const token = await getJWT();
      const response = await axios.get(`http://localhost:8080/attendance/summary/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAttendance(response.data);
  }
  catch (error) {
    console.log("Failed to retrieve attendance summary:", error);
  }
};

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if(user._id){
      getAttendanceSummary();
    }
  }, [user]);

  const profilePictureUri = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyNjYzN3wwfDF8c2VhcmNofDJ8fHByb2ZpbGV8ZW58MHx8fHwxNjk3NjIxOTkyfDA&ixlib=rb-4.0.3&q=80&w=400';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Image source={{ uri: profilePictureUri }} style={styles.profilePicture} />
      </View>
      <Text style={styles.title}>Attendance</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Employee ID:</Text>
        <TextInput
          style={styles.input}
          placeholder='EMP123'
          placeholderTextColor="#fff"
          editable={false}
        />
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder={user.username}
          placeholderTextColor="#fff"
          editable={false}
        />
        <Text style={styles.label}>Present:</Text>
        <TextInput
          style={styles.input}
          placeholder={`${attendance.totalDaysPresent} (days)`}
          placeholderTextColor="#fff"
          editable={false}
        />
        <Text style={styles.label}>Absent:</Text>
        <TextInput
          style={styles.input}
          placeholder={`${attendance.totalWorkingDays} (days)`}
          placeholderTextColor="#fff"
          editable={false}
        />
        <Text style={styles.label}>Attendance Rate:</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: `${(attendance.totalDaysPresent/attendance.totalWorkingDays)*100}%` }]} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Leaves')}
        >
          <Text style={styles.buttonText}>Request Leaves</Text>
        </TouchableOpacity>
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
    backgroundColor: '#1c1c1c',
    padding: 20,
    height: '100%',
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#444',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: '#fff',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#444',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00ff00',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#444',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
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

export default AttendanceScreen;
