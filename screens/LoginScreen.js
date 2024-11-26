import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import appFirebase from '../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth(appFirebase);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setModalVisible(true); // Mostrar la ventana emergente
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('Home'); // Navegar a HomeScreen si el inicio de sesión es exitoso
      }, 2000); // Ocultar la ventana emergente después de 2 segundos
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo2.png')} style={styles.logo} />

      <Text style={styles.title}>Acceda a su cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#cccccc"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#cccccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <LinearGradient colors={['#ff4b2b', '#ff416c']} style={styles.button}>
          <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.forgotPassword}>¿Olvidaste la contraseña?</Text>

      <Text style={styles.registerWith}>Registrarme con</Text>

      <View style={styles.socialIconsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="facebook" size={40} color="#3b5998" style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="google" size={40} color="#DB4437" style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="apple" size={40} color="#000000" style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        ¿Aún no tienes cuenta?{' '}
        <Text style={styles.footerLink} onPress={() => navigation.navigate('Register')}>
          Ingresa aquí
        </Text>
      </Text>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Icon name="check-circle" size={60} color="#4CAF50" />
          <Text style={styles.modalText}>¡Bienvenido de nuevo!</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333333',
    marginBottom: 15,
    elevation: 3,
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 25,
    marginVertical: 15,
    elevation: 3,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  registerWith: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333333',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    padding: 10,
    elevation: 3,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
  },
  footerLink: {
    color: '#000000',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    borderColor: '#000000',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333333',
  },
});

export default LoginScreen;