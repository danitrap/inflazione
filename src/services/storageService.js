import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = '@inflazione_history';
const MAX_HISTORY_ITEMS = 50;

export class StorageService {
  // Salva un calcolo nella cronologia
  static async saveCalculation(calculation) {
    try {
      const existingHistory = await this.getHistory();
      
      const newCalculation = {
        ...calculation,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
      
      const updatedHistory = [newCalculation, ...existingHistory]
        .slice(0, MAX_HISTORY_ITEMS);
      
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
      return newCalculation;
    } catch (error) {
      console.error('Errore nel salvare il calcolo:', error);
      throw error;
    }
  }
  
  // Ottieni la cronologia dei calcoli
  static async getHistory() {
    try {
      const historyJson = await AsyncStorage.getItem(HISTORY_KEY);
      return historyJson ? JSON.parse(historyJson) : [];
    } catch (error) {
      console.error('Errore nel recuperare la cronologia:', error);
      return [];
    }
  }
  
  // Elimina un calcolo dalla cronologia
  static async deleteCalculation(calculationId) {
    try {
      const history = await this.getHistory();
      const updatedHistory = history.filter(calc => calc.id !== calculationId);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
      return updatedHistory;
    } catch (error) {
      console.error('Errore nell\'eliminare il calcolo:', error);
      throw error;
    }
  }
  
  // Pulisci tutta la cronologia
  static async clearHistory() {
    try {
      await AsyncStorage.removeItem(HISTORY_KEY);
    } catch (error) {
      console.error('Errore nel pulire la cronologia:', error);
      throw error;
    }
  }
}

export default StorageService;