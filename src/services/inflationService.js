import inflationData from '../data/inflazione.json';

export class InflationService {
  static data = inflationData;
  
  // Ottieni tutti i periodi disponibili
  static getAllPeriods() {
    return this.data.map(item => ({
      id: item.id,
      descrizione: item.descrizione,
      anno: item.anno,
      mese: item.mese,
      indice: item.indice_dal
    })).sort((a, b) => {
      if (a.anno !== b.anno) return a.anno - b.anno;
      return a.mese - b.mese;
    });
  }
  
  // Ottieni l'ultimo periodo disponibile (per rivalutazione)
  static getLatestPeriod() {
    return this.data.reduce((latest, current) => {
      if (current.anno > latest.anno || 
          (current.anno === latest.anno && current.mese > latest.mese)) {
        return current;
      }
      return latest;
    });
  }
  
  // Trova un periodo specifico
  static findPeriod(anno, mese) {
    return this.data.find(item => item.anno === anno && item.mese === mese);
  }
  
  // Calcola la rivalutazione monetaria
  static calculateRevaluation(importoOriginale, annoInizio, meseInizio) {
    console.log('InflationService: Cercando periodo:', { annoInizio, meseInizio });
    console.log('InflationService: Dati disponibili:', this.data.length, 'periodi');
    
    const periodoInizio = this.findPeriod(annoInizio, meseInizio);
    const ultimoPeriodo = this.getLatestPeriod();
    
    console.log('InflationService: Periodo trovato:', periodoInizio);
    console.log('InflationService: Ultimo periodo:', ultimoPeriodo);
    
    if (!periodoInizio) {
      throw new Error(`Periodo non trovato: ${meseInizio}/${annoInizio}`);
    }
    
    // Formula: Valore Rivalutato = Valore Originale × (Indice Al / Indice Dal)
    const indiceInizio = periodoInizio.indice_dal;
    const indiceFine = ultimoPeriodo.indice_al;
    
    const importoRivalutato = importoOriginale * (indiceFine / indiceInizio);
    const differenza = importoRivalutato - importoOriginale;
    const percentualeVariazione = ((importoRivalutato - importoOriginale) / importoOriginale) * 100;
    
    return {
      importoOriginale,
      importoRivalutato,
      differenza,
      percentualeVariazione,
      periodoInizio: periodoInizio.descrizione,
      periodoFine: ultimoPeriodo.descrizione,
      indiceInizio,
      indiceFine,
      calcoloData: new Date().toISOString()
    };
  }
  
  // Ottieni statistiche periodo
  static getPeriodStats(anno, mese) {
    const periodo = this.findPeriod(anno, mese);
    if (!periodo) return null;
    
    return {
      periodo: periodo.descrizione,
      inflazioneAnnua: periodo.inflazione_annua,
      inflazioneMensile: periodo.inflazione_mensile,
      inflazioneMedia: periodo.inflazione_media,
      indice: periodo.indice_dal
    };
  }
}

export default InflationService;