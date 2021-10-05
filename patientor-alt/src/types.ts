export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;
export type BaseEntryWithoutId = UnionOmit<BaseEntry, "id">;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}

export type HealthCheckRatingStrings = keyof typeof HealthCheckRating;

export type EntryType = "HealthCheck" | "OccupationalHealthcare" | "Hospital";

// not sure about this
export const EntryTypes: Array<string> = [
  "HealthCheck",
  "OccupationalHealthcare",
  "Hospital",
];

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

// export type NewPatient = Omit<Patient, "id">;
export type NewPatient = UnionOmit<Patient, "id">;

// export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
export type NonSensitivePatient = UnionOmit<Patient, "ssn" | "entries">;

// export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// https://www.regular-expressions.info/dates.html
export const isValidDate = (date: string): boolean =>
  /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(date);
