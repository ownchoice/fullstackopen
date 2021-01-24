export type Gender = 'male' | 'female' | 'other';
export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export interface Diagnose {
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
