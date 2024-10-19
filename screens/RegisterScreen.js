import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../firebase'; // Asegúrate de importar auth y db correctamente
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [edad, setEdad] = useState('');
  const [rol, setRol] = useState('Paciente'); // Por defecto, el rol es "Paciente"
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
      // Crear usuario con Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, 'Usuarios',user.uid), {
        Nombre: nombre,
        Email: email,
        Edad: parseInt(edad), // Convertir la edad a número
        Rol: rol, // "Paciente" o "Medico"
        ContraseñaHash: password, // Guardar la contraseña hash (por motivos de ejemplo)
        FechaRegistro: new Date(), // Guarda también la fecha de creación
      });

      Alert.alert('Registro exitoso', 'Usuario registrado exitosamente');
      navigation.replace('Login'); // Redirigir a la pantalla de login después del registro
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
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

      <Text style={styles.label}>Edad:</Text>
      <TextInput
        style={styles.input}
        placeholder="Edad"
        placeholderTextColor="#cccccc"
        keyboardType="numeric" // Solo números
        value={edad}
        onChangeText={setEdad}
      />

      {/* Selector de rol */}
      <Text style={styles.label}>Rol:</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          onPress={() => setRol('Paciente')}
          style={[
            styles.roleButton,
            rol === 'Paciente' ? styles.roleButtonSelected : styles.roleButtonUnselected
          ]}
        >
          <Text style={styles.roleText}>Paciente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setRol('Medico')}
          style={[
            styles.roleButton,
            rol === 'Medico' ? styles.roleButtonSelected : styles.roleButtonUnselected
          ]}
        >
          <Text style={styles.roleText}>Medico</Text>
        </TouchableOpacity>
      </View>

      {/* Aceptar términos */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
          {isChecked && <Icon name="check" size={20} color="#00d2ff" />}
        </TouchableOpacity>
        <Text style={styles.termsText}>Acepta términos y condiciones</Text>
      </View>

      {/* Botón de registro */}
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
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  roleButtonSelected: {
    backgroundColor: '#00d2ff',
  },
  roleButtonUnselected: {
    backgroundColor: '#cccccc',
  },
  roleText: {
    fontSize: 16,
    color: '#ffffff',
  },
});

export default RegisterScreen;