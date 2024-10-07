import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleRegister = async () => {
    if (!isChecked) {
      Alert.alert('Términos y condiciones', 'Debes aceptar los términos y condiciones para registrarte');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: nombre,
        surname: apellido,
        email: email,
      });

      Alert.alert('Registro exitoso', 'Usuario agregado');

      navigation.replace('Success'); // Navegar a SuccessScreen después de registro exitoso
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Título de Registro */}
      <Text style={styles.title}>REGÍSTRATE</Text>

      {/* Campos de Entrada */}
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#cccccc"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Apellidos:</Text>
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        placeholderTextColor="#cccccc"
        value={apellido}
        onChangeText={setApellido}
      />

      <Text style={styles.label}>Correo electrónico:</Text>
      <TextInput
        style={styles.input}
        placeholder="example@gmail.com"
        placeholderTextColor="#cccccc"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#cccccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Acepta términos y condiciones */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
          {isChecked && <Icon name="check" size={20} color="#00d2ff" />}
        </TouchableOpacity>
        <Text style={styles.termsText}>Acepta términos y condiciones</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.privacyPolicy}>Política de privacidad</Text>
      </TouchableOpacity>

      {/* Botón Crear Cuenta */}
      <TouchableOpacity style={styles.buttonContainer} onPress={handleRegister}>
        <LinearGradient colors={['#00d2ff', '#ff3c5e']} style={styles.button}>
          <Text style={styles.buttonText}>CREAR CUENTA</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
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
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  termsText: {
    fontSize: 14,
    color: '#666666',
  },
  privacyPolicy: {
    fontSize: 14,
    color: '#0000ff',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 25,
    marginTop: 20,
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
});

export default RegisterScreen;