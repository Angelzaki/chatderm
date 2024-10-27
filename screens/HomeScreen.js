import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={['#00d2ff', '#ff3c5e']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')} // Logo de chatderm
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>chatderm - Tu Clínica Virtual de Dermatología</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={require('../assets/choco.webp')} // Logo de chatderm
              style={styles.logo}
            />
        </TouchableOpacity>
      </View>

      {/* Contenido Principal */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Bienvenido a chatderm</Text>
        <Text style={styles.subtitle}>Especialistas en el cuidado de tu piel</Text>

        {/* Sección de Tipos de Dermatitis */}
        <View style={styles.cardContainer}>
          {/* Dermatitis Atópica */}
          <View style={styles.card}>
            <Image source={require('../assets/da.jpeg')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Dermatitis Atópica</Text>
            <Text style={styles.cardDescription}>
              La dermatitis atópica es un tipo de eccema que causa picazón e inflamación.
            </Text>
            <TouchableOpacity style={styles.learnMoreButton}>
              <Text style={styles.learnMoreButtonText}>Aprender más</Text>
            </TouchableOpacity>
          </View>

          {/* Dermatitis de Contacto */}
          <View style={styles.card}>
            <Image source={require('../assets/dc.jpeg')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Dermatitis de Contacto</Text>
            <Text style={styles.cardDescription}>
              La dermatitis de contacto se presenta cuando la piel entra en contacto con una sustancia irritante.
            </Text>
            <TouchableOpacity style={styles.learnMoreButton}>
              <Text style={styles.learnMoreButtonText}>Aprender más</Text>
            </TouchableOpacity>
          </View>

          {/* Dermatitis Seborreica */}
          <View style={styles.card}>
            <Image source={require('../assets/ds.jpg')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>Dermatitis Seborreica</Text>
            <Text style={styles.cardDescription}>
              La dermatitis seborreica causa piel roja y escamosa, generalmente en el cuero cabelludo.
            </Text>
            <TouchableOpacity style={styles.learnMoreButton}>
              <Text style={styles.learnMoreButtonText}>Aprender más</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botón para Ayuda con el Chatbot */}
        <TouchableOpacity style={styles.chatbotButton} onPress={() => navigation.navigate('Chat')}>
          <LinearGradient colors={['#ff3c5e', '#00d2ff']} style={styles.chatbotButton}>
            <Icon name="comments" size={24} color="#ffffff" />
            <Text style={styles.chatbotButtonText}>Habla con nuestro Especialista Virtual</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  logo: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ff3c5e',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  learnMoreButton: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#ff3c5e',
    borderRadius: 10,
  },
  learnMoreButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  chatbotButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 25,
    marginVertical: 10,
  },
  chatbotButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default HomeScreen;
