import { v4 as uuid } from "uuid";
import patients from "../../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../types";

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn: _ssn, entries: _entries, ...rest }) => rest);
};

const getPatientsSensitive = (): Patient[] => {
  return patients;
};

const findById = (id: string): NonSensitivePatient | undefined => {
  const patient = patients.find((d) => d.id === id);
  if (patient) {
    const { ssn: _ssn, entries: _entries, ...patientPublic } = patient;
    return patientPublic;
  } else {
    return undefined;
  }
};

const findByIdSensitive = (id: string): Patient | undefined => {
  const patient = patients.find((d) => d.id === id);
  return patient;
};

const addPatient = (patient: NewPatient) => {
  const id: string = uuid();
  const newPatient = { id, ...patient };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsSensitive,
  findById,
  findByIdSensitive,
  addPatient,
};
