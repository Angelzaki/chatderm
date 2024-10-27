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
        <View style={styles.header}>
          <TouchableOpacity onPress={handleImageChange} style={styles.profileImageContainer}>
            <Image
              source={userData?.infoText ? { uri: userData.infoText } : require('../assets/choco.webp')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.profileName}>{userData?.Nombre || 'Usuario'}</Text>
          <Text style={styles.profileEmail}>{userData?.Email || 'Correo no disponible'}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Icon name="id-card" size={20} color="#ff3c5e" />
            <Text style={styles.infoText}>{userData?.Rol || 'Rol no disponible'}</Text>
          </View>
        </View>

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
    backgroundColor: '#f2f2f7',
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
    marginVertical: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#ff3c5e',
  },
  changeImageOverlay: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  changeImageText: {
    color: '#fff',
    fontSize: 12,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
  },
  profileEmail: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#444',
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#ff3c5e',
    borderRadius: 25,
    alignItems: 'center',
    width: '80%',
    elevation: 5,
    shadowColor: '#ff3c5e',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
