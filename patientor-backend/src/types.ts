export type Gender = 'male' | 'female' | 'other';
export interface Diagnosis {
  code: string,
  name: string,
  latin?: string,
}

// export enum Gender {
//   Male = 'male',
//   Female = 'female',
//   Other = 'other'
// }

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;
