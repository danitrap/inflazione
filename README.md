# 📊 Rivalutazione Monetaria - App React Native

Un'applicazione mobile per calcolare la rivalutazione del denaro in base all'inflazione italiana dal 1999 ad oggi.

## 🚀 Funzionalità

- **Calcolo Rivalutazione**: Inserisci un importo e una data per vedere quanto vale oggi
- **Dati Ufficiali**: Utilizza i dati ISTAT dell'inflazione italiana (1999-2024)
- **Cronologia**: Salva e rivedi i tuoi calcoli precedenti
- **Interfaccia Intuitiva**: Design moderno e facile da usare
- **Spiegazioni Dettagliate**: Comprendi l'impatto dell'inflazione sul tuo denaro

## 📱 Come funziona

1. **Inserisci l'importo** originale (es. €1000)
2. **Seleziona il periodo** di partenza (es. Gennaio 2010)
3. **Visualizza il risultato**: quanto vale oggi quell'importo
4. **Salva nella cronologia** per riferimenti futuri

### Esempio
€1000 di Gennaio 2010 valgono circa €1300 oggi (Luglio 2024) - un aumento del ~30% dovuto all'inflazione.

## 🛠 Struttura del Progetto

```
inflazione-app/
├── App.js                 # Entry point e navigazione
├── src/
│   ├── components/        # Componenti riutilizzabili
│   │   ├── AmountInput.js    # Input valore monetario
│   │   ├── DatePicker.js     # Selezione periodo
│   │   ├── ResultCard.js     # Visualizzazione risultati
│   │   └── HistoryItem.js    # Item cronologia
│   ├── screens/           # Schermate dell'app
│   │   ├── HomeScreen.js     # Schermata principale
│   │   ├── ResultScreen.js   # Risultati dettagliati
│   │   └── HistoryScreen.js  # Cronologia calcoli
│   ├── services/          # Logica business
│   │   ├── inflationService.js  # Calcoli inflazione
│   │   └── storageService.js    # AsyncStorage
│   ├── data/
│   │   └── inflazione.json   # Dati inflazione 1999-2024
│   └── utils/
│       └── formatters.js     # Helper formattazione
└── db/
    └── inflazione.csv        # Dati originali ISTAT
```

## 🔧 Installazione e Avvio

### Prerequisiti
- Node.js (≥18)
- Expo CLI
- Simulator iOS/Android o dispositivo fisico

### Setup
```bash
# Installa dipendenze
npm install

# Avvia l'app in development
npx expo start

# Per dispositivi fisici con tunnel
npx expo start --tunnel
```

### Dipendenze Principali
- **React Native + Expo**: Framework mobile
- **React Navigation**: Navigazione tra schermate
- **AsyncStorage**: Persistenza dati locale
- **DateTimePicker**: Selezione date

## 📊 Dati Inflazione

L'app utilizza dati ufficiali ISTAT:
- **Periodo**: Gennaio 1999 - Luglio 2024
- **Frequenza**: Mensile
- **Indici**: Prezzi al consumo per l'intera collettività
- **Formula**: `Valore Rivalutato = Valore × (Indice Finale / Indice Iniziale)`

## 💡 Esempi di Utilizzo

### Scenario 1: Acquisto Casa
- **Importo**: €200.000 (2005)
- **Risultato**: ~€260.000 oggi
- **Significato**: Il potere d'acquisto si è ridotto del 30%

### Scenario 2: Stipendio
- **Importo**: €1.500/mese (2010)
- **Risultato**: ~€1.950/mese oggi
- **Significato**: Serve il 30% in più per lo stesso tenore di vita

## 🔄 Aggiornamento Dati

Per aggiornare i dati inflazione:
1. Sostituire `db/inflazione.csv` con dati aggiornati
2. Eseguire lo script di conversione (già incluso nell'app)
3. I nuovi dati saranno automaticamente disponibili

## 📝 Note Tecniche

- **Persistenza**: Cronologia salvata localmente con AsyncStorage
- **Performance**: Dati embedded nell'app per velocità
- **Compatibilità**: iOS e Android
- **Offline**: Funziona senza connessione internet

## 🎯 Prossimi Sviluppi

- [ ] Grafici interattivi dell'inflazione
- [ ] Export risultati in PDF/Excel
- [ ] Widget per schermata home
- [ ] Notifiche aggiornamento dati
- [ ] Supporto altre valute europee

---

Sviluppata con ❤️ usando i dati ufficiali ISTAT dell'inflazione italiana.
