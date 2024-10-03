import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/profile-image.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Sunset</Text>
      </View>

      {/* Información del Usuario */}
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Icon name="envelope" size={20} color="#ff3c5e" />
          <Text style={styles.infoText}>sunset@example.com</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="phone" size={20} color="#ff3c5e" />
          <Text style={styles.infoText}>+1 123 456 7890</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="map-marker" size={20} color="#ff3c5e" />
          <Text style={styles.infoText}>New York, USA</Text>
        </View>
      </View>

      {/* Botón para Editar Perfil */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Editar Perfil</Text>
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
});

export default ProfileScreen;

