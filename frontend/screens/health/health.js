import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import logo from '../../assets/images/argusLogo.png';
import person from '../../assets/images/person.svg';

const Health = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.slogan}>Good health is the real wealth!!!</Text>
        <Image source={person} style={styles.profileImage} />
      </View>

      <Text style={styles.sectionTitle}>Health Section</Text>

      <View style={styles.firstAidSection}>
        <Text style={styles.subTitle}>First Aid Stock</Text>
        <View style={styles.taskList}>
          {Array.from({ length: 6 }).map((_, index) => (
            <View key={index} style={styles.taskItem}>
              <TextInput style={styles.checkbox} />
              <Text style={styles.taskText}>Empty task</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.safetyButton}>
        <Text style={styles.safetyButtonText}>Safety Incidents</Text>
      </TouchableOpacity>

      <View style={styles.emergencyContacts}>
        <Text style={styles.subTitle}>Emergency Contacts (workers)</Text>
        <TextInput style={styles.input} placeholder="User Id" keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Name" />
        <TextInput style={styles.input} placeholder="Relation" />
        <TextInput style={styles.input} placeholder="Phone" keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  slogan: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  firstAidSection: {
    marginBottom: 20,
  },
  subTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 10,
  },
  taskList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginRight: 10,
  },
  taskText: {
    color: '#FFFFFF',
  },
  safetyButton: {
    backgroundColor: '#FF4C4C',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  safetyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emergencyContacts: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#3A3A3A',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Health;
