export type TMedicalHistory = {
  medicalHistoryId: string;
  doctorId: string;
  patientId: string;
  diagonosisId: string[];
  medications: string[];
  releasedOn?: string;
  bill?: number;
  doctorComments: string;
  patientComments: string;
};
