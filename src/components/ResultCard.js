import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const ResultCard = ({ result }) => {
  if (!result) return null;
  
  const isPositive = result.percentualeVariazione >= 0;
  const impactColor = isPositive ? '#27ae60' : '#e74c3c';
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Risultato Rivalutazione</Text>
      </View>
      
      <View style={styles.periodContainer}>
        <Text style={styles.periodText}>
          Da {result.periodoInizio} ad oggi ({result.periodoFine})
        </Text>
      </View>
      
      <View style={styles.amountsContainer}>
        <View style={styles.amountRow}>
          <Text style={styles.amountLabel}>Importo originale:</Text>
          <Text style={styles.originalAmount}>
            {formatCurrency(result.importoOriginale)}
          </Text>
        </View>
        
        <View style={styles.amountRow}>
          <Text style={styles.amountLabel}>Valore rivalutato:</Text>
          <Text style={[styles.revaluatedAmount, { color: impactColor }]}>
            {formatCurrency(result.importoRivalutato)}
          </Text>
        </View>
        
        <View style={styles.separator} />
        
        <View style={styles.amountRow}>
          <Text style={styles.amountLabel}>Differenza:</Text>
          <Text style={[styles.differenceAmount, { color: impactColor }]}>
            {isPositive ? '+' : ''}{formatCurrency(result.differenza)}
          </Text>
        </View>
        
        <View style={styles.amountRow}>
          <Text style={styles.amountLabel}>Variazione:</Text>
          <Text style={[styles.percentageAmount, { color: impactColor }]}>
            {isPositive ? '+' : ''}{formatPercentage(result.percentualeVariazione)}
          </Text>
        </View>
      </View>
      
      <View style={styles.explanationContainer}>
        <Text style={styles.explanationTitle}>Cosa significa?</Text>
        <Text style={styles.explanationText}>
          {isPositive 
            ? `Il tuo denaro ha perso potere d'acquisto a causa dell'inflazione. Per avere lo stesso potere d'acquisto di allora, oggi servirebbero ${formatCurrency(result.importoRivalutato)}.`
            : `Il tuo denaro ha guadagnato potere d'acquisto. Questo è raro e può indicare deflazione nel periodo considerato.`
          }
        </Text>
      </View>
      
      <View style={styles.indexContainer}>
        <Text style={styles.indexLabel}>
          Indice inflazione: {result.indiceInizio.toFixed(1)} → {result.indiceFine.toFixed(1)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  header: {
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  periodContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  periodText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  amountsContainer: {
    marginBottom: 15,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  amountLabel: {
    fontSize: 16,
    color: '#333',
  },
  originalAmount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  revaluatedAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  differenceAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  percentageAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  explanationContainer: {
    backgroundColor: '#f1f3f4',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  explanationText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  indexContainer: {
    alignItems: 'center',
  },
  indexLabel: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'monospace',
  },
});

export default ResultCard;