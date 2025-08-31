import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getMonthName } from '../utils/formatters';
import InflationService from '../services/inflationService';

const DatePicker = ({ onDateChange, initialDate = null }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date(2010, 0, 1));
  const [showPicker, setShowPicker] = useState(false);
  const [availablePeriods] = useState(InflationService.getAllPeriods());
  const [lastReportedPeriod, setLastReportedPeriod] = useState(null);
  
  useEffect(() => {
    // Trova il periodo più vicino alla data selezionata
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    
    const exactPeriod = availablePeriods.find(p => p.anno === year && p.mese === month);
    if (exactPeriod) {
      // Solo se è diverso dall'ultimo periodo riportato
      const periodKey = `${year}-${month}`;
      if (lastReportedPeriod !== periodKey) {
        setLastReportedPeriod(periodKey);
        onDateChange(year, month);
      }
    } else {
      // Trova il periodo più vicino disponibile
      const closestPeriod = availablePeriods.reduce((closest, current) => {
        const currentDiff = Math.abs((current.anno - year) * 12 + (current.mese - month));
        const closestDiff = Math.abs((closest.anno - year) * 12 + (closest.mese - month));
        return currentDiff < closestDiff ? current : closest;
      });
      
      if (closestPeriod) {
        const periodKey = `${closestPeriod.anno}-${closestPeriod.mese}`;
        if (lastReportedPeriod !== periodKey) {
          setSelectedDate(new Date(closestPeriod.anno, closestPeriod.mese - 1, 1));
          setLastReportedPeriod(periodKey);
          onDateChange(closestPeriod.anno, closestPeriod.mese);
        }
      }
    }
  }, [selectedDate, availablePeriods]);
  
  const handleDateChange = (event, date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (date && event.type !== 'dismissed') {
      setSelectedDate(date);
    }
  };
  
  const formatSelectedDate = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    return `${getMonthName(month)} ${year}`;
  };
  
  const getDateRange = () => {
    if (availablePeriods.length === 0) return '';
    const first = availablePeriods[0];
    const last = availablePeriods[availablePeriods.length - 1];
    return `${getMonthName(first.mese)} ${first.anno} - ${getMonthName(last.mese)} ${last.anno}`;
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Periodo di partenza</Text>
      <TouchableOpacity 
        style={styles.dateButton} 
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.dateText}>{formatSelectedDate()}</Text>
      </TouchableOpacity>
      <Text style={styles.rangeText}>
        Disponibile: {getDateRange()}
      </Text>
      
      {showPicker && (
        <>
          {Platform.OS === 'ios' && (
            <View style={styles.pickerHeader}>
              <TouchableOpacity 
                style={styles.doneButton}
                onPress={() => setShowPicker(false)}
              >
                <Text style={styles.doneButtonText}>Fatto</Text>
              </TouchableOpacity>
            </View>
          )}
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            minimumDate={new Date(1999, 0, 1)}
            maximumDate={new Date(2024, 6, 31)}
            themeVariant="light"
            textColor="#000000"
          />
        </>
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
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  rangeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  doneButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  doneButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default DatePicker;