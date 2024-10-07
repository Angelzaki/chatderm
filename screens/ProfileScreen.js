import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../firebase'; // Importar Firebase configurado
import { getDoc, doc } from 'firebase/firestore';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Obtener el usuario actual
        const currentUser = auth.currentUser;
        if (currentUser) {
          // Obtener los datos del usuario desde Firestore
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/profile-image.png')} // Imagen por defecto, cambiar según los datos
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{userData ? userData.name : 'Usuario'}</Text>
      </View>

      {/* Información del Usuario */}
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Icon name="envelope" size={20} color="#ff3c5e" />
          <Text style={styles.infoText}>{userData ? userData.email : 'Correo no disponible'}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="phone" size={20} color="#ff3c5e" />
          <Text style={styles.infoText}>{userData?.phone || '+ No registrado'}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="map-marker" size={20} color="#ff3c5e" />
          <Text style={styles.infoText}>{userData?.location || 'Ubicación no registrada'}</Text>
        </View>
      </View>

      {/* Botón para Editar Perfil */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Editar Perfil</Text>
      </TouchableOpacity>

      {/* Botón para Cerrar Sesión */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          auth.signOut().then(() => {
            navigation.replace('Login'); // Redirige a la pantalla de Login
          });
        }}
      >
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
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
    color: '#333',
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
  editButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff3c5e',
    borderRadius: 20,
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#333',
    borderRadius: 20,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;