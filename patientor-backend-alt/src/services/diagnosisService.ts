import diagnoses from "../../data/diagnoses";
import { Diagnosis } from "../types";

// import diagnosesData from "../../data/diagnoses.json";
// const diagnoses: Array<Diagnosis> = diagnosesData as Array<Diagnosis>;

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

// const getNonSensitiveDiagnoses = (): NonSensitiveDiagnosis[] => {
//   return diagnoses.map(({ id, date, weather, visibility }) => ({
//     id,
//     date,
//     weather,
//     visibility,
//   }));
// };

// const addDiagnosis = () => {
//   return [];
// };

export default {
  getDiagnoses,
  // getNonSensitiveDiagnoses,
  // addDiagnosis,
};
