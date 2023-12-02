export type TLaboratory = {
  labId: string;
  labName: string;
  equipments: string[];
  allStaffId: string[];
  testsOffered: string[];
  contactInfo: string[];
  diagnosisHistory: diagnosisId[];
};

export type diagnosisId = string;
