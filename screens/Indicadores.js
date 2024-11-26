import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const IndicadoresScreen = () => {
  const [data, setData] = useState({
    atopica: 0,
    seborreica: 0,
    contacto: 0,
  });
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState({});
  const screenWidth = Dimensions.get('window').width;

  // Función para obtener datos desde Firestore
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Diagnosticos'));
      const counts = {
        atopica: 0,
        seborreica: 0,
        contacto: 0,
      };

      querySnapshot.forEach((doc) => {
        const Tipo = doc.data().Tipo;
        if (Tipo === 'Dermatitis atópica') counts.atopica += 1;
        else if (Tipo === 'Dermatitis seborreica') counts.seborreica += 1;
        else if (Tipo === 'Dermatitis por contacto') counts.contacto += 1;
      });

      setData(counts);
    } catch (error) {
      console.error('Error al obtener datos de Firestore:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff4d4f" />
      </View>
    );
  }

  // Total de diagnósticos
  const totalDiagnosticos = data.atopica + data.seborreica + data.contacto;

  // Calcular porcentajes
  const porcentajes = {
    atopica: ((data.atopica / totalDiagnosticos) * 100).toFixed(1),
    seborreica: ((data.seborreica / totalDiagnosticos) * 100).toFixed(1),
    contacto: ((data.contacto / totalDiagnosticos) * 100).toFixed(1),
  };

  // Gráfico de Proporciones
  const pieData = [
    {
      name: 'Atópica',
      population: data.atopica,
      color: '#ff6b81',
      legendFontColor: '#7f8c8d',
      legendFontSize: 15,
    },
    {
      name: 'Seborreica',
      population: data.seborreica,
      color: '#ff4757',
      legendFontColor: '#7f8c8d',
      legendFontSize: 15,
    },
    {
      name: 'Por Contacto',
      population: data.contacto,
      color: '#e84118',
      legendFontColor: '#7f8c8d',
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Modal de Detalle */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedDetail.title}</Text>
            <Text style={styles.modalDescription}>{selectedDetail.description}</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Tarjeta Resumen */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>Total Diagnósticos</Text>
        <Text style={styles.summaryValue}>{totalDiagnosticos}</Text>
      </View>

      {/* Gráfico Circular */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Proporción de Diagnósticos</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(255, 69, 58, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Gráfico de Barras */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Distribución por Tipo</Text>
        <BarChart
          data={{
            labels: ['Atópica', 'Seborreica', 'Contacto'],
            datasets: [
              {
                data: [data.atopica, data.seborreica, data.contacto],
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#ffe6e6',
            backgroundGradientTo: '#ffe6e6',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 69, 58, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          verticalLabelRotation={0}
        />
      </View>

      {/* Resumen de Diagnósticos */}
      <View style={styles.summaryContainer}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Atópica</Text>
          <Text style={styles.cardValue}>
            {data.atopica} ({porcentajes.atopica}%)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Seborreica</Text>
          <Text style={styles.cardValue}>
            {data.seborreica} ({porcentajes.seborreica}%)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Por Contacto</Text>
          <Text style={styles.cardValue}>
            {data.contacto} ({porcentajes.contacto}%)
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff5f5', padding: 20 },
  summaryCard: {
    backgroundColor: '#ff4d4f',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryText: { fontSize: 18, color: '#fff', marginBottom: 10 },
  summaryValue: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  chartContainer: {
    backgroundColor: '#ffe6e6',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff4d4f',
    marginBottom: 10,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: '30%',
    backgroundColor: '#ff6b81',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardTitle: { fontSize: 14, color: '#fff', marginBottom: 10 },
  cardValue: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#ff4d4f' },
  modalDescription: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  modalCloseButton: { backgroundColor: '#ff4d4f', padding: 10, borderRadius: 10 },
  modalCloseText: { color: '#fff', fontWeight: 'bold' },
});

export default IndicadoresScreen;
