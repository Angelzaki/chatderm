import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

// Importar pantallas existentes
import LoginScreen from './screens/LoginScreen'; // Login
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import SuccessScreen from './screens/SuccessScreen';
import IndicadoresScreen from './screens/Indicadores';

// Pantalla de carga inicial
const SplashScreen = () => (
  <View style={styles.screenContainer}>
    <Image source={require('./assets/splash.png')} style={styles.splashImage} />
  </View>
);

// Navegación por pestañas (Home, Chat, Profile)
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Chat') {
            iconName = focused ? 'robot' : 'robot-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Indicadores') {
            iconName = focused ? 'chart-bar' : 'chart-bar';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          }
          else if (route.name === 'Profile') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } 
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: {
          backgroundColor: '#f8f9fa',
          borderTopWidth: 0,
          elevation: 5,
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false, // Ocultar header superior
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Inicio' }} />
      <Tab.Screen name="Chat" component={ChatScreen} options={{ tabBarLabel: 'Chatbot' }} />
      <Tab.Screen name="Indicadores" component={IndicadoresScreen} options={{ tabBarLabel: 'Indicadores' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Perfil' }} />
    </Tab.Navigator>
  );
};

// Navegación principal (Login, Registro, Tabs)
const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

        {/* Registro */}
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrarse' }} />
        
        {/* Navegación por pestañas */}
        <Stack.Screen name="Home" component={MyTabs} options={{ headerShown: false }} />

        {/* Pantalla de éxito opcional */}
        <Stack.Screen name="Success" component={SuccessScreen} options={{ title: 'Éxito' }} />
      </Stack.Navigator>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <MaterialCommunityIcons name="robot" size={60} color="#ff4b2b" />
          <Text style={styles.modalTitle}>¡Bienvenidos a DermaBot!</Text>
          <Text style={styles.modalText}>Estamos encantados de tenerte aquí. Esperamos que disfrutes de nuestra aplicación.</Text>
          <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
            <Text style={styles.modalButtonText}>Comenzar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666666',
  },
  modalButton: {
    backgroundColor: '#ff4b2b',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});