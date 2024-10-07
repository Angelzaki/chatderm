import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SuccessScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Redirigir al Login después de 2 segundos
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/usuarioregistrado.jpeg')} // Asegúrate de tener la imagen en la carpeta 'assets'
        style={styles.logo}
      />
      <Text style={styles.text}>Ya está registrado !!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SuccessScreen;