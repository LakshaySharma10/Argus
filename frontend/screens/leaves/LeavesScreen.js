import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import logo from '../../assets/images/argusLogo.png';
import person from '../../assets/images/person.svg';

export default function LeavesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Image source={person} style={styles.profileImage} />
      </View>
      <Text style={styles.title}>Leaves</Text>
      <TextInput style={styles.input} placeholder="Name" value="Sophia Patel" />
      <View style={styles.leavesContainer}>
        <TextInput style={styles.leaveInput} placeholder="Total Leaves" value="10" />
        <TextInput style={styles.leaveInput} placeholder="Casual Leaves" value="10" />
        <TextInput style={styles.leaveInput} placeholder="Emergency Leaves" value="10" />
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 40,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    color: '#00ccff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    padding: 10,
    color: '#fff',
    marginBottom: 10,
    borderColor: '#00ccff',
    borderWidth: 1,
  },
  leavesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  leaveInput: {
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    padding: 10,
    color: '#fff',
    width: '30%',
    borderColor: '#00ccff',
    borderWidth: 1,
  },
  addButton: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
