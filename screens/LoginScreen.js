import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      {/* Acceda a su cuenta */}
      <Text style={styles.title}>Acceda a su cuenta</Text>

      {/* Campos de Entrada */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#cccccc"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#cccccc"
        secureTextEntry
      />

      {/* Botón Iniciar Sesión */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Home')} // Navegar a HomeScreen
      >
        <LinearGradient
          colors={['#00d2ff', '#ff3c5e']}
          style={styles.button}>
          <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
        </LinearGradient>
      </TouchableOpacity>
      {/* Olvidaste la contraseña */}
      <Text style={styles.forgotPassword}>¿Olvidaste la contraseña?</Text>

      {/* Registrarme con */}
      <Text style={styles.registerWith}>Registrarme con</Text>

      {/* Iconos de Redes Sociales */}
      <View style={styles.socialIconsContainer}>
        <Icon name="facebook" size={40} color="#3b5998" style={styles.socialIcon} />
        <Icon name="google" size={40} color="#DB4437" style={styles.socialIcon} />
        <Icon name="apple" size={40} color="#000000" style={styles.socialIcon} />
      </View>

      {/* ¿Aún no tienes cuenta? */}
      <Text style={styles.footerText}>
        ¿Aún no tienes cuenta?{' '}
        <Text
          style={styles.footerLink}
          onPress={() => navigation.navigate('Register')}
        >
          Ingresa aquí
        </Text>
      </Text>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
  buttonContainer: {
    width: '100%',
    borderRadius: 25,
    marginVertical: 15,
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
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 20,
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
  },
});

export default LoginScreen;
