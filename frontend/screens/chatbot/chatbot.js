// ChatBot.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated, Easing, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function ChatBot({ visible, toggleChat }) {
  const [animation] = useState(new Animated.Value(0));
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    Animated.timing(animation, {
      toValue: visible ? 1 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

    if (visible && messages.length === 0) {
      startChat();
    }
  }, [visible]);

  const startChat = async () => {
    try {
      const response = await axios.get('http://localhost:8080/chatbot/start');
      setMessages([{ sender: 'bot', text: response.data.message }]);
    } catch (error) {
      console.error('Error starting chat', error);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: inputMessage }];
    setMessages(newMessages);
    setInputMessage('');

    try {
      const response = await axios.post('http://localhost:8080/chatbot/chat', {
        message: inputMessage,
      });
      setMessages([...newMessages, { sender: 'bot', text: response.data.response }]);
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  const chatSize = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['60px', '375px'],
  });

  return (
    <Animated.View style={[styles.chatContainer, { width: chatSize, height: chatSize }]}>
      <View style={styles.chatHeader}>
        <Text style={styles.chatTitle}>Chat with Argus</Text>
        <TouchableOpacity onPress={toggleChat}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.chatBody}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.sender === 'user' ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.chatFooter}>
        <TextInput
          style={styles.chatInput}
          placeholder="Type a message..."
          value={inputMessage}
          onChangeText={setInputMessage}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    position: 'absolute',
    bottom: 30,
    right: 17,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#ff5c5c',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  chatTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  chatBody: {
    height: '70%',
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  chatFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  chatInput: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#ff5c5c',
    borderRadius: 20,
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#ff5c5c',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#333',
  },
});
