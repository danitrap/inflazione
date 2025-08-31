import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { validateAmount, cleanNumericInput } from '../utils/formatters';

const AmountInput = ({ onAmountChange, initialValue = '' }) => {
  const [amount, setAmount] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);
  
  useEffect(() => {
    const cleanedAmount = cleanNumericInput(amount);
    const numericAmount = parseFloat(cleanedAmount);
    const valid = validateAmount(cleanedAmount);
    
    setIsValid(valid);
    onAmountChange(valid ? numericAmount : null);
  }, [amount, onAmountChange]);
  
  const handleAmountChange = (text) => {
    const cleaned = cleanNumericInput(text);
    setAmount(cleaned);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Importo (€)</Text>
      <TextInput
        style={[
          styles.input,
          !isValid && styles.inputError
        ]}
        value={amount}
        onChangeText={handleAmountChange}
        placeholder="Inserisci l'importo da rivalutare"
        keyboardType="decimal-pad"
        returnKeyType="done"
      />
      {!isValid && amount !== '' && (
        <Text style={styles.errorText}>
          Inserisci un importo valido (1€ - 1.000.000€)
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ff6b6b',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
    marginTop: 5,
  },
});

export default AmountInput;