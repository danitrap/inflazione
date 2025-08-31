import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatCurrency, formatPercentage, formatDate } from '../utils/formatters';

const HistoryItem = ({ item, onPress, onDelete }) => {
  const isPositive = item.percentualeVariazione >= 0;
  const impactColor = isPositive ? '#27ae60' : '#e74c3c';
  
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <View style={styles.header}>
        <View style={styles.amountContainer}>
          <Text style={styles.originalAmount}>
            {formatCurrency(item.importoOriginale)}
          </Text>
          <Text style={styles.arrow}>→</Text>
          <Text style={[styles.revaluatedAmount, { color: impactColor }]}>
            {formatCurrency(item.importoRivalutato)}
          </Text>
        </View>
        
        {onDelete && (
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={() => onDelete(item.id)}
          >
            <Text style={styles.deleteText}>×</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.details}>
        <Text style={styles.periodText}>
          {item.periodoInizio} → {item.periodoFine}
        </Text>
        <Text style={[styles.changeText, { color: impactColor }]}>
          {isPositive ? '+' : ''}{formatPercentage(item.percentualeVariazione, 1)}
        </Text>
      </View>
      
      <Text style={styles.timestampText}>
        {formatDate(item.timestamp)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  originalAmount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  arrow: {
    fontSize: 16,
    color: '#999',
    marginHorizontal: 8,
  },
  revaluatedAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  periodText: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  timestampText: {
    fontSize: 11,
    color: '#999',
    textAlign: 'right',
  },
});

export default HistoryItem;