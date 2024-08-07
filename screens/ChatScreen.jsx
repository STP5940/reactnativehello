import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';

export default function ChatScreen({ route, navigation }) {
  const { name, profilePic, online } = route.params;
  const [inputMessage, setInputMessage] = useState('');
  const [expandedMessageId, setExpandedMessageId] = useState(null);

 // Mockup messages
 const messages = [
    { id: '1', text: 'Hello!', timestamp: '08-07 12:30', isSender: false },
    { id: '2', text: 'Hi there, how are you?', timestamp: '08-07 12:31', isSender: true },
    { id: '3', text: 'I’m good, thanks for asking!', timestamp: '08-07 12:32', isSender: false },
    { id: '4', text: 'What’s up?', timestamp: '08-07 12:33', isSender: true },
    { id: '5', text: 'Hello!', timestamp: '08-07 12:30', isSender: false },
    { id: '6', text: 'Hi there, how are you?', timestamp: '08-07 12:31', isSender: true },
    { id: '7', text: 'I’m good, thanks for asking!', timestamp: '08-07 12:32', isSender: false },
    { id: '8', text: 'What’s up?', timestamp: '08-07 12:33', isSender: true },
    { id: '9', text: 'Hello!', timestamp: '08-07 12:30', isSender: false },
    { id: '10', text: 'Hi there, how are you?', timestamp: '08-07 12:31', isSender: true },
    { id: '11', text: 'I’m good, thanks for asking!', timestamp: '08-07 12:32', isSender: false },
    { id: '12', text: 'What’s up?', timestamp: '08-07 12:33', isSender: true },
    { id: '13', text: 'Hello!', timestamp: '08-07 12:30', isSender: false },
    { id: '14', text: 'Hi there, how are you?', timestamp: '08-07 12:31', isSender: true },
  ];

  useEffect(() => {
    // Set the navigation header title and customize header
    navigation.setOptions({
      title: name,
      headerRight: () => (
        <View style={styles.headerProfileContainer}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/12225/12225846.png' }} style={styles.headerProfilePic} />
        </View>
      ),
    });
  }, [name, profilePic, online, navigation]);

  const handleSend = () => {
    // Handle the send message logic here
    console.log('Message sent:', inputMessage);
    setInputMessage('');
  };

  const toggleTimestamp = (id) => {
    setExpandedMessageId(expandedMessageId === id ? null : id);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <View style={{ position: 'relative' }}>
            <Image source={{ uri: profilePic }} style={styles.profilePic} />
            {online && <View style={[styles.statusIndicator, { backgroundColor: 'green' }]} />}
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>
      <ScrollView style={styles.messageContainer} contentContainerStyle={styles.messageList}>
        {messages.map((msg) => (
          <View key={msg.id} style={[styles.messageWrapper, msg.isSender ? styles.senderWrapper : styles.receiverWrapper]}>
            {!msg.isSender && 
            <View style={styles.messageHeader}>
                <Image source={{ uri: profilePic }} style={styles.receiverProfilePic} />
                <Text style={styles.nameInmessage}>{name}</Text>
            </View>
            }
            <TouchableOpacity onPress={() => toggleTimestamp(msg.id)}>
              <View style={[styles.messageBubble, msg.isSender ? styles.senderBubble : styles.receiverBubble]}>
                <Text style={[styles.messageText, msg.isSender ? styles.senderText : styles.receiverText]}>
                  {msg.text}
                </Text>
              </View>
            </TouchableOpacity>
            {expandedMessageId === msg.id && (
              <Text style={[styles.timestamp, msg.isSender ? styles.senderTimestamp : styles.receiverTimestamp]}>
                {msg.timestamp}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="พิมพ์ข้อความ..."
          placeholderTextColor="#888" // Gray placeholder text
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>ส่ง</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerProfileContainer: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: 'rgb(232, 59, 45)', // Pink background
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginEnd: 10,
  },
  headerProfilePic: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(247, 206, 206)',
    borderRadius: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  messageContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageWrapper: {
    marginVertical: 5,
    alignItems: 'flex-start', // Align items based on sender or receiver
  },
  senderWrapper: {
    alignItems: 'flex-end', // Align sender messages to right
  },
  receiverWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start', // Align receiver messages to left
  },
  messageHeader: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Center items vertically
  },
  nameInmessage: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 5,
  },
  receiverProfilePic: {
    width: 18,
    height: 18,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 5,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
    flexShrink: 1, // Allow bubble to shrink if needed
  },
  senderBubble: {
    backgroundColor: 'rgb(247, 58, 120)', // Pink background for sender
  },
  receiverBubble: {
    backgroundColor: 'white', // White background for receiver
  },
  messageText: {
    fontSize: 16,
    flexWrap: 'wrap', // Allow text to wrap to next line
  },
  senderText: {
    color: 'white', // White text for sender
  },
  receiverText: {
    color: 'gray', // Gray text for receiver
  },
  timestamp: {
    fontSize: 10,
    color: 'gray', // Gray text for timestamp
    marginTop: 2,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#e9e9e9', // White background for text input
    borderColor: '#e9e9e9',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginRight: 10,
    color: '#000',
  },
  sendButton: {
    backgroundColor: 'rgb(0, 156, 255)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  statusIndicator: {
    width: 15,
    height: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    position: 'absolute',
    bottom: 0,
    right: 8,
  },
});
