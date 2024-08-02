import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import logo from '../../assets/images/argusLogo.png';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image 
        style={styles.logo} 
        source={logo} 
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  logo: {
    width: 400,
    height: 200,
    marginBottom: 50,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'space-between',
    height: 100,
  },
  button: {
    backgroundColor: '#EF2A39',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
