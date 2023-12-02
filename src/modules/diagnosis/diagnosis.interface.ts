export type TDiagnosis = {
  diagnosisId: string;
  patientId: string;
  doctorId: string;
  labStaffId: string;
  adminId: string;
  diagnosisName: string;
  diagnosisDetails: string[];
  costs: number;
  isPaid: boolean;
  testTime: string;
  reportTime: string;
};
