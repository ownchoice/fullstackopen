import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_DIAGNOSIS";
      payload: Diagnosis;
    };

export const setPatientList = (payload: Patient[]): Action => ({
  type: "SET_PATIENT_LIST",
  payload,
});

export const addPatient = (payload: Patient): Action => ({
  type: "ADD_PATIENT",
  payload,
});

export const setDiagnosisList = (payload: Diagnosis[]): Action => ({
  type: "SET_DIAGNOSIS_LIST",
  payload,
});

export const addDiagnosis = (payload: Diagnosis): Action => ({
  type: "ADD_DIAGNOSIS",
  payload,
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          // ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          // ...state.diagnoses,
        },
      };
    case "ADD_DIAGNOSIS":
      return {
        ...state,
        diagnoses: {
          ...state.diagnoses,
          [action.payload.code]: action.payload,
        },
      };
    default:
      return state;
  }
};
