import { Document, Types } from "mongoose";

type TTest = {
  testName: string;
  testDetails: string;
  associatedServices: string[]; // List of associated medical services
  machineDetails: {
    machineName: string;
    machineModel: string;
    manufacturer: string;
    yearOfManufacture: number;
  };
  benefits: string[]; // List of benefits from this test
  patientCount?: number; // Number of patients who have taken this test
  responsibleDoctor?: Types.ObjectId; // Refers to Doctor document
  cost: number; // Cost of the test
  isDeleted?: boolean;
} & Document;

export default TTest;
