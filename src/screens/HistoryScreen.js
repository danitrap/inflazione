import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Alert,
  StyleSheet,
  SafeAreaView,
  RefreshControl 
} from 'react-native';
import HistoryItem from '../components/HistoryItem';
import StorageService from '../services/storageService';
import { useFocusEffect } from '@react-navigation/native';

const HistoryScreen = ({ navigation }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const loadHistory = async () => {
    try {
      const historyData = await StorageService.getHistory();
      setHistory(historyData);
    } catch (error) {
      console.error('Errore nel caricare la cronologia:', error);
      Alert.alert('Errore', 'Impossibile caricare la cronologia');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  // Ricarica la cronologia quando la schermata viene focalizzata
  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );
  
  const handleRefresh = () => {
    setRefreshing(true);
    loadHistory();
  };
  
  const handleItemPress = (item) => {
    navigation.navigate('Result', { result: item });
  };
  
  const handleDeleteItem = (itemId) => {
    Alert.alert(
      'Elimina Calcolo',
      'Sei sicuro di voler eliminare questo calcolo dalla cronologia?',
      [
        { text: 'Annulla', style: 'cancel' },
        { 
          text: 'Elimina', 
          style: 'destructive',
          onPress: () => deleteItem(itemId)
        }
      ]
    );
  };
  
  const deleteItem = async (itemId) => {
    try {
      const updatedHistory = await StorageService.deleteCalculation(itemId);
      setHistory(updatedHistory);
    } catch (error) {
      console.error('Errore nell\'eliminare il calcolo:', error);
      Alert.alert('Errore', 'Impossibile eliminare il calcolo');
    }
  };
  
  const handleClearHistory = () => {
    if (history.length === 0) return;
    
    Alert.alert(
      'Cancella Cronologia',
      'Sei sicuro di voler eliminare tutta la cronologia? Questa azione non può essere annullata.',
      [
        { text: 'Annulla', style: 'cancel' },
        { 
          text: 'Elimina Tutto', 
          style: 'destructive',
          onPress: clearAllHistory
        }
      ]
    );
  };
  
  const clearAllHistory = async () => {
    try {
      await StorageService.clearHistory();
      setHistory([]);
    } catch (error) {
      console.error('Errore nel pulire la cronologia:', error);
      Alert.alert('Errore', 'Impossibile cancellare la cronologia');
    }
  };
  
  const renderHistoryItem = ({ item }) => (
    <HistoryItem 
      item={item} 
      onPress={handleItemPress}
      onDelete={handleDeleteItem}
    />
  );
  
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📊</Text>
      <Text style={styles.emptyTitle}>Nessun calcolo salvato</Text>
      <Text style={styles.emptyText}>
        I tuoi calcoli di rivalutazione appariranno qui. 
        Inizia creando il tuo primo calcolo!
      </Text>
      <TouchableOpacity 
        style={styles.newCalculationButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.newCalculationButtonText}>
          🧮 Nuovo Calcolo
        </Text>
      </TouchableOpacity>
    </View>
  );
  
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Caricamento cronologia...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Indietro</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Cronologia Calcoli</Text>
        {history.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClearHistory}
          >
            <Text style={styles.clearButtonText}>🗑️</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {history.length > 0 && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {history.length} calcol{history.length === 1 ? 'o' : 'i'} salvat{history.length === 1 ? 'o' : 'i'}
          </Text>
        </View>
      )}
      
      <FlatList
        data={history}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={[
          styles.listContainer,
          history.length === 0 && styles.listContainerEmpty
        ]}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={handleRefresh}
            tintColor="#007AFF"
          />
        }
        showsVerticalScrollIndicator={false}
      />
      
      {history.length > 0 && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={styles.bottomButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.bottomButtonText}>
              ➕ Nuovo Calcolo
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  clearButton: {
    padding: 5,
  },
  clearButtonText: {
    fontSize: 18,
  },
  statsContainer: {
    backgroundColor: '#fff',
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statsText: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    padding: 16,
  },
  listContainerEmpty: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  newCalculationButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    paddingHorizontal: 24,
  },
  newCalculationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomContainer: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  bottomButton: {
    backgroundColor: '#27ae60',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  bottomButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});

export default HistoryScreen;