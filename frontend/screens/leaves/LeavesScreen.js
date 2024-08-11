import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/images/argusLogo.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatBot from '../chatbot/chatbot';
import { Ionicons } from '@expo/vector-icons';


const MainLeavesScreen = () => {
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

  useEffect(() => {
    getUser();
  }, []);

  const getLeaves = async () => {
    try {
      const token = await getJWT();
      const response = await axios.get(`http://localhost:8080/leave/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setLeaves(response.data);
  } catch (error) {
    console.error('Error retrieving leaves', error);
  }
};

useEffect(() => {
  if (user._id) {
    getLeaves();
  }
}, [user]);

  const [leaves, setLeaves] = useState([
    {leaveType: 'Sick', startDate: '2021-10-01', endDate: '2021-10-02', status: 'Pending'},
  ]);

  const profilePictureUri = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyNjYzN3wwfDF8c2VhcmNofDJ8fHByb2ZpbGV8ZW58MHx8fHwxNjk3NjIxOTkyfDA&ixlib=rb-4.0.3&q=80&w=400';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Image source={{ uri: profilePictureUri }} style={styles.profilePicture} />
      </View>
      <Text style={styles.title}>Leaves</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Leave {'\n'}Type</Text>
          <Text style={styles.tableHeaderText}>Start {'\n'}Date</Text>
          <Text style={styles.tableHeaderText}>End {'\n'}Date</Text>
          <Text style={styles.tableHeaderText}>   Status</Text>
        </View>

        {leaves.map((leave, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableRowText}>{leave.leaveType}</Text>
            <Text style={styles.tableRowText}>
              {new Date(leave.startDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </Text>
            <Text style={styles.tableRowText}>
              {new Date(leave.endDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </Text>
            <Text style={[styles.tableRowText, styles.statusText]}>{leave.status}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => navigation.navigate('LeavesScreen')} 
      >
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.fab} onPress={toggleChat}>
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />
      </TouchableOpacity>

      {chatVisible && (<ChatBot visible={chatVisible} toggleChat={toggleChat} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: 400,
    marginTop: 35,
    alignSelf: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
  tableHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFABAB',
    width: '25%',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  tableRowText: {
    fontSize: 16,
    color: '#fff',
    width: '20%',
  },
  statusText: {
    textAlign: 'center',
    width: '25%',
  },
  applyButton: {
    backgroundColor: '#ff3b30',
    borderRadius: 10,
    alignItems: 'center',
    padding: 15,
  },
  applyButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
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
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
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

export default MainLeavesScreen;
