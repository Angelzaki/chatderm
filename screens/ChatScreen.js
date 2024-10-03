import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      {/* Header del Chat */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#ff3c5e" />
        </TouchableOpacity>
        <Image
          source={require('../assets/profile-image.png')} // Imagen del chatbot o perfil del bot
          style={styles.profileImage}
        />
        <Text style={styles.chatTitle}>Chatbot</Text>
      </View>

      {/* Contenedor de Mensajes */}
      <View style={styles.messagesContainer}>
        {/* Aquí se mostrarían los mensajes del usuario y del bot */}
        <Text style={styles.botMessage}>¡Hola! Soy tu asistente para ayudarte con información sobre dermatitis. ¿En qué puedo ayudarte hoy?</Text>
      </View>

      {/* Barra de Entrada de Mensaje */}
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={styles.input}
          placeholder="Mensaje..."
          placeholderTextColor="#aaaaaa"
        />
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="camera" size={24} color="#ff3c5e" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="microphone" size={24} color="#ff3c5e" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    borderColor: '#ff3c5e',
    borderWidth: 2,
  },
  chatTitle: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  messagesContainer: {
    flex: 1,
    padding: 20,
  },
  botMessage: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    color: '#333',
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default ChatScreen;
