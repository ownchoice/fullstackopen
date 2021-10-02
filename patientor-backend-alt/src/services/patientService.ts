import patients from "../../data/patients";
import { NonSensitivePatient } from "../types";

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn: _ssn, ...rest }) => rest);
};

export default {
  getPatients,
};
