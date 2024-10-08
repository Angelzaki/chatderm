import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Soy tu asistente para ayudarte con información sobre dermatitis. ¿En qué puedo ayudarte hoy?',
      isBot: true,
    },
  ]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { id: Date.now(), text: message, isBot: false }]);
      setMessage('');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      Alert.alert('Imagen seleccionada', '¡Tu imagen ha sido seleccionada con éxito!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header del Chat */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Image
          source={require('../assets/profile-image.png')} // Imagen del chatbot o perfil del bot
          style={styles.profileImage}
        />
        <Text style={styles.chatTitle}>Asistente Virtual</Text>
      </View>

      {/* Contenedor de Mensajes */}
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[styles.messageBubble, msg.isBot ? styles.botBubble : styles.userBubble]}
          >
            <Text style={[styles.messageText, msg.isBot ? styles.botText : styles.userText]}>
              {msg.text}
            </Text>
          </View>
        ))}
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        )}
      </ScrollView>

      {/* Barra de Entrada de Mensaje */}
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={styles.input}
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#aaaaaa"
        />
        <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
          <Icon name="paperclip" size={24} color="#ff3c5e" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleSend}>
          <Icon name="send" size={24} color="#ff3c5e" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ff3c5e',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    borderColor: '#ffffff',
    borderWidth: 2,
  },
  chatTitle: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  messageBubble: {
    padding: 15,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '80%',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#ff3c5e',
  },
  messageText: {
    fontSize: 16,
  },
  botText: {
    color: '#333',
  },
  userText: {
    color: '#fff',
  },
  selectedImage: {
    width: 150,
    height: 150,
    alignSelf: 'flex-end',
    marginTop: 10,
    borderRadius: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    backgroundColor: '#ffffff',
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