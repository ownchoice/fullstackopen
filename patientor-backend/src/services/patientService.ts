import patientData from '../../data/patients.json';
import { NonSensitivePatient, Patient } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth, }) => ({ id, name, occupation, gender, dateOfBirth, }));
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  getNonSensitivePatientEntries
};