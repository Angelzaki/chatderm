import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../firebase'; // Importa Firebase
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Soy tu asistente para ayudarte con información sobre dermatitis. Puedes elegir entre las siguientes opciones:',
      isBot: true,
      options: [
        { text: 'Diagnóstico', action: 'diagnóstico' },
        { text: 'Preguntas sobre Dermatitis', action: 'preguntas' },
        { text: 'Contacto', action: 'contacto' },
      ],
    },
  ]);
  const [selectedImage, setSelectedImage] = useState(null);
  const inactivityTimer = useRef(null);

  // Reiniciar temporizador de inactividad
  const resetInactivityTimer = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now(),
          text: 'Parece que te quedaste dormido jajaja. Aquí están las opciones nuevamente:',
          isBot: true,
          options: [
            { text: 'Diagnóstico', action: 'diagnóstico' },
            { text: 'Preguntas sobre Dermatitis', action: 'preguntas' },
            { text: 'Contacto', action: 'contacto' },
          ],
        },
      ]);
    }, 60000); // 60 segundos de inactividad
  };

  // Guardar diagnóstico en Firebase
  const saveDiagnosisToFirebase = async (diagnosis) => {
    try {
      await addDoc(collection(db, 'Diagnosticos'), {
        Tipo: diagnosis,
        Fecha: serverTimestamp(),
        UsuarioID: null, // Puedes agregar el ID del usuario autenticado si es necesario
      });
      console.log('Diagnóstico guardado en Firebase:', diagnosis);
    } catch (error) {
      console.error('Error al guardar el diagnóstico en Firebase:', error);
    }
  };

  // Manejar opciones del bot
  const handleBotOption = (action) => {
    resetInactivityTimer();
    switch (action) {
      case 'diagnóstico':
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), text: 'Por favor, inserta una imagen para realizar el diagnóstico.', isBot: true },
        ]);
        break;
      case 'preguntas':
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), text: '¿Cuál es tu pregunta sobre dermatitis?', isBot: true },
        ]);
        break;
      case 'contacto':
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), text: 'Puedes contactar al Centro de Salud al número +51 925518365.', isBot: true },
        ]);
        break;
      default:
        break;
    }
  };

  // Subir imagen al servidor y obtener diagnóstico
  const uploadImageToServer = async (uri) => {
    try {
      const formData = new FormData();
      formData.append('photo', {
        uri,
        name: `photo.jpg`,
        type: `image/jpeg`,
      });

      const response = await fetch('http://192.168.100.6:3000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error('Error en el servidor al procesar la imagen');
      }

      const data = await response.json();
      const diagnosis = data.diagnosis; // Diagnóstico recibido del servidor

      // Guardar diagnóstico en Firebase
      await saveDiagnosisToFirebase(diagnosis);

      return diagnosis; // Retorna el diagnóstico para mostrarlo en el chat
    } catch (error) {
      console.error('Error al subir la imagen al servidor:', error);
      Alert.alert('Error', 'No se pudo procesar la imagen en el servidor.');
      throw error;
    }
  };

  // Seleccionar imagen
  const pickImage = async () => {
    resetInactivityTimer();
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permisos necesarios', 'Se requieren permisos para acceder a la galería.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const uri = result.assets[0].uri;
        setSelectedImage(uri);

        // Subir imagen al servidor y obtener diagnóstico
        const diagnosis = await uploadImageToServer(uri);

        // Mostrar el diagnóstico en el chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), text: `Diagnóstico: ${diagnosis}`, isBot: true },
        ]);
      }
    } catch (error) {
      console.error('Error al seleccionar o subir la imagen:', error);
      Alert.alert('Error', 'No se pudo subir la imagen.');
    }
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => clearTimeout(inactivityTimer.current); // Limpiar temporizador al desmontar
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo2.png')} style={styles.profileImage} />
        <Text style={styles.chatTitle}>ChatDerm</Text>
      </View>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={msg.isBot ? styles.botBubble : styles.userBubble}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
            {msg.options && (
              <View style={styles.optionsContainer}>
                {msg.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.optionButton}
                    onPress={() => handleBotOption(option.action)}
                  >
                    <Text style={styles.optionText}>{option.text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.userImage} />
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={(text) => {
            resetInactivityTimer();
            setMessage(text);
          }}
          style={styles.input}
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#aaaaaa"
        />
        <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
          <Icon name="paperclip" size={24} color="#ff3c5e" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="send" size={24} color="#ff3c5e" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'red',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  profileImage: { width: 50, height: 50, borderRadius: 25 },
  chatTitle: { marginLeft: 15, fontSize: 22, fontWeight: 'bold', color: '#ffffff' },
  messagesContainer: { flex: 1, paddingHorizontal: 20, marginTop: 10 },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8eaf6',
    padding: 15,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '80%',
  },
  messageText: { fontSize: 16, color: '#333' },
  optionsContainer: { marginTop: 10 },
  optionButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 5,
  },
  optionText: { color: '#ffffff', fontSize: 16, textAlign: 'center' },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
    alignSelf: 'flex-end',
    marginTop: 10,
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
  iconButton: { marginLeft: 10 },
});

export default ChatScreen;
