import { v4 as uuid } from "uuid";
import patients from "../../data/patients";
import { NewPatient, NonSensitivePatient } from "../types";

const getPatients = (): NonSensitivePatient[] => {
  // console.log(patients);
  return patients.map(({ ssn: _ssn, ...rest }) => rest);
};

const findById = (id: string): NonSensitivePatient | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

const addPatient = (patient: NewPatient) => {
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
