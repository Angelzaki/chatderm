import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Información detallada sobre cada tipo de dermatitis
  const dermatitisInfo = {
    atopica: {
      title: 'Dermatitis Atópica',
      description:
        'Es una afección crónica que causa picazón, inflamación y sequedad en la piel. Aunque no tiene cura, puede controlarse con tratamientos tópicos, hidratación frecuente y evitando desencadenantes como el estrés o ciertos alimentos.',
      recommendation: 'Te recomendamos usar nuestro chatbot para obtener orientación personalizada.',
    },
    contacto: {
      title: 'Dermatitis de Contacto',
      description:
        'Se produce cuando la piel entra en contacto con una sustancia irritante o alergénica, como productos químicos o plantas. Los síntomas incluyen enrojecimiento, picazón y ampollas en áreas específicas de la piel.',
      recommendation: 'Consulta con nuestro chatbot para identificar posibles desencadenantes y cuidados.',
    },
    seborreica: {
      title: 'Dermatitis Seborreica',
      description:
        'Es una afección cutánea común que provoca enrojecimiento y descamación, especialmente en áreas con alta producción de sebo como el cuero cabelludo, cejas y lados de la nariz. Su manejo incluye champús medicados y cremas tópicas.',
      recommendation: 'Utiliza el chatbot para aprender más sobre su tratamiento y prevención.',
    },
  };

  const handleLearnMore = (type) => {
    setSelectedType(dermatitisInfo[type]);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['red', 'red']} style={styles.header}>
        <Image
          source={require('../assets/logo2.png')} // Logo de chatderm
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>Tu Clínica Virtual de Dermatología</Text>
      </LinearGradient>

      {/* Contenido Principal */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>¡Bienvenido a chatderm!</Text>
        <Text style={styles.subtitle}>Cuidamos de tu piel con especialistas virtuales.</Text>

        {/* Tarjetas de Tipos de Dermatitis */}
        <View style={styles.cardContainer}>
          {/* Dermatitis Atópica */}
          <View style={styles.card}>
            <Image source={require('../assets/da2.jpeg')} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Dermatitis Atópica</Text>
              <Text style={styles.cardDescription}>
                Un tipo de eccema que causa picazón e inflamación. Aprende a controlarla.
              </Text>
              <TouchableOpacity
                style={styles.learnMoreButton}
                onPress={() => handleLearnMore('atopica')}
              >
                <Text style={styles.learnMoreButtonText}>Descubre más</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Dermatitis de Contacto */}
          <View style={styles.card}>
            <Image source={require('../assets/dc2.jpeg')} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Dermatitis de Contacto</Text>
              <Text style={styles.cardDescription}>
                Ocurre cuando la piel entra en contacto con sustancias irritantes.
              </Text>
              <TouchableOpacity
                style={styles.learnMoreButton}
                onPress={() => handleLearnMore('contacto')}
              >
                <Text style={styles.learnMoreButtonText}>Descubre más</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Dermatitis Seborreica */}
          <View style={styles.card}>
            <Image source={require('../assets/ds2.jpg')} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Dermatitis Seborreica</Text>
              <Text style={styles.cardDescription}>
                Afecta comúnmente el cuero cabelludo con piel roja y escamosa.
              </Text>
              <TouchableOpacity
                style={styles.learnMoreButton}
                onPress={() => handleLearnMore('seborreica')}
              >
                <Text style={styles.learnMoreButtonText}>Descubre más</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal para Detalles */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedType?.title}</Text>
            <Text style={styles.modalDescription}>{selectedType?.description}</Text>
            <Text style={styles.modalRecommendation}>{selectedType?.recommendation}</Text>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    elevation: 5,
    marginBottom: 20,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'red',
  },
  cardDescription: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 15,
  },
  learnMoreButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  learnMoreButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalRecommendation: {
    fontSize: 14,
    color: '#333333',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeModalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  closeModalButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default HomeScreen;
