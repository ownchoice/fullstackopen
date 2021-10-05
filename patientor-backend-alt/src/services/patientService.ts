import { v4 as uuid } from "uuid";
import importedPatients from "../../data/patients";
import {
  NewPatient,
  NonSensitivePatient,
  Patient,
  EntryWithoutId,
} from "../types";

let patients = importedPatients;

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

const addPatientEntry = (
  patientId: string,
  entry: EntryWithoutId
): Patient | undefined => {
  const entryId: string = uuid();
  const patient = patients.find((d) => d.id === patientId);
  if (patient) {
    patients = patients.map((patient) => {
      if (patient.id === patientId) {
        return {
          ...patient,
          entries: patient.entries.concat({ id: entryId, ...entry }),
        };
      } else {
        return patient;
      }
    });

    // returns ssn, sensible information
    return patients.find((d) => d.id === patientId);
  } else {
    return undefined;
  }
};

export default {
  getPatients,
  getPatientsSensitive,
  findById,
  findByIdSensitive,
  addPatient,
  addPatientEntry,
};
