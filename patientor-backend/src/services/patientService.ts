import { v4 as uuid } from 'uuid';
import patientData from '../../data/patients.json';
import { NonSensitivePatient, Patient, NewPatient } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth, }) => ({ id, name, occupation, gender, dateOfBirth, }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(d => d.id === id);
  return patient;
};

const addPatient = ( patient: NewPatient
): Patient => {

  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addPatient,
  getNonSensitivePatientEntries,
  findById
};
