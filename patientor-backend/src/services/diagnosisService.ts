import diagnosisData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnosis: Array<Diagnosis> = diagnosisData as Array<Diagnosis>;

const getEntries = (): Array<Diagnosis> => {
  return diagnosis;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};