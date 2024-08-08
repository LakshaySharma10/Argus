import React, {useState, useEffect} from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AttendanceScreen = () => {
  const navigation = useNavigation();
  const employee = {
    id: 'EMP123',
    name: 'Sophia Patel',
    present: 4,
    absent: 4,
    attendanceRate: 50,
    profileImage: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGVsZWdhbnR8ZW58MHx8fHwxNjE2OTc1MjE2&ixlib=rb-1.2.1&q=80&w=1080',
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

  const getAttendanceSummary = async () => {
    try {
      const token = await getJWT();
      const response = await axios.get(`http://192.168.1.11:8080/attendance/summary/${user._id}`, {
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: employee.profileImage }}
          style={styles.profileImage}
        />
        <Text style={styles.title}>Attendance</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Employee ID:</Text>
        <TextInput
          style={styles.input}
          placeholder={employee.id}
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
          onPress={() => navigation.navigate('leaves')}
        >
          <Text style={styles.buttonText}>Request Leaves</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 25,
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
});

export default AttendanceScreen;
