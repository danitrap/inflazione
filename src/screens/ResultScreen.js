import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView 
} from 'react-native';
import ResultCard from '../components/ResultCard';
import { formatDate } from '../utils/formatters';

const ResultScreen = ({ route, navigation }) => {
  const { result } = route.params || {};
  
  if (!result) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Nessun risultato da visualizzare</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Torna Indietro</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButtonSmall}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonSmallText}>← Indietro</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Dettagli Calcolo</Text>
        </View>
        
        <View style={styles.content}>
          <ResultCard result={result} />
          
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Informazioni Aggiuntive</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Data calcolo:</Text>
              <Text style={styles.detailValue}>
                {formatDate(result.calcoloData)}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Indice partenza:</Text>
              <Text style={styles.detailValue}>
                {result.indiceInizio.toFixed(2)}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Indice arrivo:</Text>
              <Text style={styles.detailValue}>
                {result.indiceFine.toFixed(2)}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Fattore moltiplicativo:</Text>
              <Text style={styles.detailValue}>
                {(result.indiceFine / result.indiceInizio).toFixed(4)}
              </Text>
            </View>
          </View>
          
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationTitle}>Formula utilizzata</Text>
            <Text style={styles.formulaText}>
              Valore Rivalutato = Valore Originale × (Indice Finale / Indice Iniziale)
            </Text>
            <Text style={styles.calculationText}>
              {result.importoRivalutato.toFixed(2)}€ = {result.importoOriginale.toFixed(2)}€ × ({result.indiceFine.toFixed(1)} / {result.indiceInizio.toFixed(1)})
            </Text>
          </View>
          
          <View style={styles.actionContainer}>
            <TouchableOpacity 
              style={styles.newCalculationButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.newCalculationButtonText}>
                🧮 Nuovo Calcolo
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.historyButton}
              onPress={() => navigation.navigate('History')}
            >
              <Text style={styles.historyButtonText}>
                📜 Visualizza Cronologia
              </Text>
            </TouchableOpacity>
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonSmall: {
    marginRight: 15,
  },
  backButtonSmallText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 15,
    color: '#666',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  explanationContainer: {
    backgroundColor: '#e8f4ff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  formulaText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 8,
  },
  calculationText: {
    fontSize: 13,
    color: '#007AFF',
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  actionContainer: {
    marginTop: 20,
  },
  newCalculationButton: {
    backgroundColor: '#27ae60',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  newCalculationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  historyButton: {
    backgroundColor: '#34495e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  historyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    paddingHorizontal: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ResultScreen;