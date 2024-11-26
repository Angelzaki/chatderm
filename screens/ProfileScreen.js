import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth } from 'firebase/auth';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { launchImageLibrary } from 'react-native-image-picker';

const auth = getAuth();

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleImageChange = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.7 });
    if (!result.didCancel && result.assets) {
      const uri = result.assets[0].uri;
      setUserData({ ...userData, infoText: uri });
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, 'Usuarios', currentUser.uid);
        await updateDoc(userDocRef, { infoText: uri });
      }
    }
  };

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
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleImageChange} style={styles.profileImageContainer}>
            <Image
              source={userData?.infoText ? { uri: userData.infoText } : require('../assets/choco2.webp')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.profileName}>{userData?.Nombre || 'Usuario'}</Text>
          <Text style={styles.profileEmail}>{userData?.Email || 'Correo no disponible'}</Text>
        </View>

        {/* Role Section */}
        <View style={styles.roleContainer}>
          <View style={styles.roleCard}>
            <Icon name="id-card" size={28} color="#fff" />
            <Text style={styles.roleText}>{userData?.Rol || 'Rol no disponible'}</Text>
          </View>
        </View>

        {/* Analytics Section */}
        <View style={styles.analyticsContainer}>
          <Text style={styles.analyticsTitle}>Detalles del Perfil</Text>
          <View style={styles.analyticsCard}>
            <View style={styles.analyticsItem}>
              <Icon name="envelope" size={24} color="#ff6b81" />
              <Text style={styles.analyticsLabel}>Email:</Text>
              <Text style={styles.analyticsValue}>{userData?.Email}</Text>
            </View>
            <View style={styles.analyticsItem}>
              <Icon name="user" size={24} color="#ff6b81" />
              <Text style={styles.analyticsLabel}>Nombre:</Text>
              <Text style={styles.analyticsValue}>{userData?.Nombre}</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            auth.signOut().then(() => {
              navigation.replace('Login');
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
    backgroundColor: '#f7f8fa',
  },
  container: {
    flex: 1,
    alignItems: 'center',
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
    marginVertical: 20,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#ff6b81',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  roleContainer: {
    marginTop: 20,
    width: '90%',
  },
  roleCard: {
    backgroundColor: '#ff6b81',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  roleText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  analyticsContainer: {
    width: '100%',
    marginTop: 30,
  },
  analyticsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  analyticsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  analyticsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  analyticsLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
  analyticsValue: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 30,
    paddingVertical: 15,
    backgroundColor: '#ff6b81',
    borderRadius: 30,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#ff6b81',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
