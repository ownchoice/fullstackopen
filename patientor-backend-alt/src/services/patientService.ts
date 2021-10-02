import { v4 as uuid } from "uuid";
import patients from "../../data/patients";
import { Patient, NonSensitivePatient } from "../types";

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn: _ssn, ...rest }) => rest);
};

const findById = (id: string): NonSensitivePatient | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

const addPatient = (patient: Omit<Patient, "id">) => {
  const id: string = uuid();
  const newPatient = { id, ...patient };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  findById,
  addPatient,
};
