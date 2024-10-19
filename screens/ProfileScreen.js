import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Firestore configurado

const auth = getAuth();

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null); // Estado para almacenar los datos del usuario
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const uid = currentUser.uid;
          const userDocRef = doc(db, 'Usuarios', uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            Alert.alert('Error', 'No se encontraron datos del usuario.');
          }
        } else {
          Alert.alert('Error', 'No se pudo autenticar al usuario.');
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        Alert.alert('Error', 'Hubo un problema al obtener los datos del usuario.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff3c5e" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Encabezado del perfil */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image
              source={userData?.profileImage || require('../assets/profile-image.png')} // Imagen de perfil o predeterminada
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{userData?.Nombre || 'Usuario'}</Text>
            <Text style={styles.profileEmail}>{userData?.Email || 'Correo no disponible'}</Text>
          </View>
        </View>

        {/* Información adicional del usuario */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Icon name="id-card" size={20} color="#ff3c5e" />
            <Text style={styles.infoText}>{userData?.Rol || 'Rol no disponible'}</Text>
          </View>
        </View>

        {/* Botón para Cerrar Sesión */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            auth.signOut().then(() => {
              navigation.replace('Login'); // Redirigir a la pantalla de Login
            });
          }}
        >
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    width: '100%',
    height: 250,
    position: 'relative',
    marginBottom: 30,
  },
  headerBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)', // Oscurecer la imagen de fondo
  },
  profileSection: {
    position: 'absolute',
    bottom: -50,
    left: '50%',
    transform: [{ translateX: -50 }],
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#ff3c5e',
    borderWidth: 3,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileEmail: {
    fontSize: 16,
    color: '#cccccc',
    marginTop: 5,
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#ff3c5e',
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;