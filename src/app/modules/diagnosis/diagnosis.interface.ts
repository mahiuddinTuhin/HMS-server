export type TDiagnosis = {
  diagnosisId: string;
  labStaffId: string;
  patientId: string;
  diagnosisName: string;
  diagnosisDetails: string;
  costs: number;
  doctorId: string;
  isPaid: boolean;
  testTime: string;
  reportTime: string;
};
