import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { db } from '../firebase';

const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Soy tu asistente para ayudarte con información sobre dermatitis. Puedes preguntar sobre:\n- Diagnóstico\n- Preguntas sobre Dermatitis\n- Contacto\n¿Qué tema te gustaría explorar?',
      isBot: true,
    },
  ]);
  const [selectedImage, setSelectedImage] = useState(null);
  const auth = getAuth();
  const storage = getStorage();

  // Función para manejar las respuestas del chatbot
  const handleBotResponse = (userMessage) => {
    let botResponse = '';

    if (/diagnóstico/i.test(userMessage)) {
      botResponse = 'Para un diagnóstico inicial, puedes describirme tus síntomas. Ten en cuenta que esto no sustituye una consulta médica.';
    } else if (/preguntas/i.test(userMessage)) {
      botResponse = 'Algunas preguntas frecuentes sobre dermatitis son:\n1. ¿Qué es la dermatitis?\n2. ¿Cuáles son los síntomas comunes?\n3. ¿Cuáles son los tratamientos?';
    } else if (/contacto/i.test(userMessage)) {
      botResponse = 'Puedes contactar con nuestros especialistas en dermatitis llamando al +1 234 567 8900 o enviándonos un correo a contacto@chatderm.com.';
    } else if (/síntomas|qué es la dermatitis|tratamiento/i.test(userMessage)) {
      botResponse = 'La dermatitis es una inflamación de la piel que puede causar enrojecimiento, picazón y molestias. Los tratamientos dependen del tipo y la severidad, pero suelen incluir cremas y evitar los irritantes.';
    } else {
      botResponse = 'Lo siento, no entendí tu pregunta. Intenta preguntar sobre "Diagnóstico", "Preguntas sobre Dermatitis" o "Contacto".';
    }

    return botResponse;
  };

  // Función para enviar mensaje de texto
  const handleSend = async () => {
    if (message.trim()) {
      const userMessage = { id: Date.now(), text: message, isBot: false };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Obtener respuesta del bot
      const botResponseText = handleBotResponse(message);
      const botResponse = { id: Date.now() + 1, text: botResponseText, isBot: true };
      setMessages((prevMessages) => [...prevMessages, botResponse]);

      // Guardar la interacción en Firestore
      try {
        const user = auth.currentUser; 
        if (user) {
          const logRef = collection(db, 'Usuarios', user.uid, 'Chatbot_Logs'); 
          await addDoc(logRef, {
            Pregunta: message,
            Respuesta: botResponse.text,
            FechaLog: serverTimestamp(),
          });
          console.log('Interacción guardada en Firestore');
        } else {
          Alert.alert('Error', 'No se pudo autenticar al usuario.');
        }
      } catch (error) {
        console.error('Error al guardar el mensaje en Firestore:', error);
      }

      setMessage(''); 
    }
  };

  // Función para subir la imagen a Firebase Storage y obtener su URL
  const uploadImageAsync = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `imagenes/${Date.now()}`); 
      const snapshot = await uploadBytes(storageRef, blob); 
      const downloadURL = await getDownloadURL(snapshot.ref); 
      return downloadURL;
    } catch (error) {
      console.error('Error al subir la imagen a Firebase:', error);
      Alert.alert('Error', 'Hubo un problema al subir la imagen. Verifica tu conexión o permisos de Firebase.');
      throw new Error('Error de red. No se pudo subir la imagen.');
    }
  };

  // Función para seleccionar la imagen y subirla a Firebase Storage
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

      // Subir la imagen seleccionada a Firebase Storage
      try {
        const imageURL = await uploadImageAsync(result.uri);
        Alert.alert('Subida de imagen exitosa', 'La imagen se ha subido con éxito.');

        const user = auth.currentUser;
        if (user) {
          const logRef = collection(db, 'Usuarios', user.uid, 'Chatbot_Logs');
          await addDoc(logRef, {
            ImagenURL: imageURL,
            Pregunta: 'Imagen subida para diagnóstico',
            Respuesta: 'Esperando diagnóstico...',
            FechaLog: serverTimestamp(),
          });

          setMessages((prevMessages) => [
            ...prevMessages,
            { id: Date.now(), text: 'Imagen subida para diagnóstico', isBot: false },
            { id: Date.now() + 1, text: 'Esperando diagnóstico...', isBot: true },
          ]);
        }
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        Alert.alert('Error', 'Hubo un problema al subir la imagen.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Header del Chat */}
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')} 
          style={styles.profileImage}
        />
        <Text style={styles.chatTitle}>ChatDerm</Text>
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
