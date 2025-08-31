// Formatta un numero come valuta Euro
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Formatta una percentuale
export const formatPercentage = (percentage, decimals = 2) => {
  return `${percentage.toFixed(decimals)}%`;
};

// Formatta una data
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Formatta i nomi dei mesi
export const getMonthName = (monthNumber) => {
  const months = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];
  return months[monthNumber - 1];
};

// Valida un importo monetario
export const validateAmount = (amount) => {
  const numAmount = parseFloat(amount);
  return !isNaN(numAmount) && numAmount > 0 && numAmount <= 1000000;
};

// Pulisci input numerico
export const cleanNumericInput = (input) => {
  return input.replace(/[^0-9.,]/g, '').replace(',', '.');
};

export default {
  formatCurrency,
  formatPercentage,
  formatDate,
  getMonthName,
  validateAmount,
  cleanNumericInput
};