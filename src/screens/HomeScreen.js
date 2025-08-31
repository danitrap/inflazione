import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Alert, 
  StyleSheet,
  SafeAreaView 
} from 'react-native';
import AmountInput from '../components/AmountInput';
import DatePicker from '../components/DatePicker';
import ResultCard from '../components/ResultCard';
import InflationService from '../services/inflationService';
import StorageService from '../services/storageService';

const HomeScreen = ({ navigation }) => {
  const [amount, setAmount] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2010);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  
  const handleDateChange = (year, month) => {
    console.log('DateChange chiamato:', { year, month });
    // Solo resetta se è realmente cambiato
    if (selectedYear !== year || selectedMonth !== month) {
      setSelectedYear(year);
      setSelectedMonth(month);
      if (result) {
        console.log('Resettando result per cambio data reale');
        setResult(null);
      }
    }
  };
  
  const handleAmountChange = (newAmount) => {
    console.log('AmountChange chiamato:', newAmount);
    // Solo resetta se è realmente cambiato
    if (amount !== newAmount) {
      setAmount(newAmount);
      if (result) {
        console.log('Resettando result per cambio amount reale');
        setResult(null);
      }
    }
  };
  
  const calculateRevaluation = async () => {
    if (!amount || amount <= 0) {
      Alert.alert('Errore', 'Inserisci un importo valido');
      return;
    }
    
    setIsCalculating(true);
    
    try {
      console.log('Calcolo con:', { amount, selectedYear, selectedMonth });
      
      const calculation = InflationService.calculateRevaluation(
        amount, 
        selectedYear, 
        selectedMonth
      );
      
      console.log('Risultato calcolo:', calculation);
      
      setResult(calculation);
      console.log('State result aggiornato');
      
      // Salva il calcolo nella cronologia
      await StorageService.saveCalculation(calculation);
      
    } catch (error) {
      console.error('Errore nel calcolo:', error);
      Alert.alert(
        'Errore', 
        `Errore: ${error.message}\nAmount: ${amount}\nData: ${selectedMonth}/${selectedYear}`
      );
    } finally {
      setIsCalculating(false);
    }
  };
  
  const canCalculate = amount && amount > 0 && !isCalculating;
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Rivalutazione Monetaria</Text>
          <Text style={styles.subtitle}>
            Scopri quanto vale oggi il tuo denaro di ieri
          </Text>
        </View>
        
        <View style={styles.formContainer}>
          <AmountInput 
            onAmountChange={handleAmountChange}
            initialValue=""
          />
          
          <DatePicker 
            onDateChange={handleDateChange}
          />
          
          <TouchableOpacity 
            style={[
              styles.calculateButton,
              !canCalculate && styles.calculateButtonDisabled
            ]}
            onPress={calculateRevaluation}
            disabled={!canCalculate}
          >
            <Text style={[
              styles.calculateButtonText,
              !canCalculate && styles.calculateButtonTextDisabled
            ]}>
              {isCalculating ? 'Calcolando...' : 'Calcola Rivalutazione'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {result && <ResultCard result={result} />}
        
        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={styles.navigationButton}
            onPress={() => navigation.navigate('History')}
          >
            <Text style={styles.navigationButtonText}>
              📜 Visualizza Cronologia
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Come funziona?</Text>
          <Text style={styles.infoText}>
            Questa app utilizza i dati ufficiali dell'inflazione italiana dal 1999 ad oggi. 
            Inserendo un importo e selezionando una data di partenza, calcola quanto 
            varrebbe oggi quello stesso importo considerando l'inflazione.
          </Text>
          <Text style={styles.infoText}>
            I calcoli sono basati sugli indici dei prezzi al consumo ISTAT.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#e3f2fd',
    textAlign: 'center',
  },
  formContainer: {
    padding: 20,
  },
  calculateButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  calculateButtonDisabled: {
    backgroundColor: '#ccc',
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  calculateButtonTextDisabled: {
    color: '#999',
  },
  navigationContainer: {
    padding: 20,
    paddingTop: 0,
  },
  navigationButton: {
    backgroundColor: '#34495e',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  navigationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
});

export default HomeScreen;