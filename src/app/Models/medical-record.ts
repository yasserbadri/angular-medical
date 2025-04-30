// medical-record.model.ts
export interface MedicalRecord {
    id?: number;
    patientId: number;
    patient?: any; // Vous pouvez créer un modèle User séparé si nécessaire
    createdAt: Date;
    recordDetails: string;
  }